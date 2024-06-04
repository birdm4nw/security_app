#include <ESP8266WiFi.h>
#include <WiFiClientSecure.h>
#include <PubSubClient.h>
#include <ArduinoJson.h>
#include <ESP8266WebServer.h>
#include "secrets.h"

const int DISTANCE_SENSOR_PIN = D1;
const char WIFI_SSID[] = "";
const char WIFI_PASSWORD[] = "";
const char THINGNAME[] = "ESP8266";
const char MQTT_HOST[] = "aws-IoT endP";
const char AWS_IOT_PUBLISH_TOPIC[] = "esp8266/pub";
const char AWS_IOT_SUBSCRIBE_TOPIC[] = "esp8266/sub";
const long interval = 2000;
const int8_t TIME_ZONE = -5;

unsigned long lastMillis = 0;
unsigned long messageCounter = 0;

WiFiClientSecure net;
BearSSL::X509List cert(cacert);
BearSSL::X509List client_crt(client_cert);
BearSSL::PrivateKey key(privkey);
PubSubClient client(net);

ESP8266WebServer server(8081);

// Event structure
struct Event {
  unsigned long id;
  bool detected_motion;
  String time;
  Event* next;
};

Event* eventListHead = nullptr;

void handleRoot() {
  // CORS Access
  server.sendHeader("Access-Control-Allow-Origin", "*");
  server.sendHeader("Access-Control-Allow-Methods", "GET, OPTIONS");
  server.sendHeader("Content-Type", "application/json");
  // JSON Object
  DynamicJsonDocument doc(1024);
  JsonArray array = doc.to<JsonArray>();

  Event* currentEvent = eventListHead;
  while (currentEvent != nullptr) {
    JsonObject eventJson = array.createNestedObject();
    eventJson["id"] = currentEvent->id;
    eventJson["detected_motion"] = currentEvent->detected_motion;
    eventJson["time"] = currentEvent->time;
    currentEvent = currentEvent->next;
  }

  String response;
  serializeJson(doc, response);

  server.send(200, "application/json", response);
}

void handleNotFound() {
  server.send(404, "text/plain", "404: Not Found");
}

void NTPConnect() {
  Serial.print("Setting time using SNTP");
  configTime(TIME_ZONE * 3600, 0, "pool.ntp.org", "time.nist.gov");
  time_t now = time(nullptr);
  while (now < 1510592825) {
    delay(500);
    Serial.print(".");
    now = time(nullptr);
  }
  Serial.println("done!");
}

void messageReceived(char *topic, byte *payload, unsigned int length) {
  Serial.print("Received [");
  Serial.print(topic);
  Serial.print("]: ");
  for (int i = 0; i < length; i++) {
    Serial.print((char)payload[i]);
  }
  Serial.println();
}

void connectAWS() {
  delay(3000);
  WiFi.mode(WIFI_STA);
  WiFi.begin(WIFI_SSID, WIFI_PASSWORD);

  Serial.println(String("Attempting to connect to SSID: ") + String(WIFI_SSID));

  while (WiFi.status() != WL_CONNECTED) {
    Serial.print(".");
    delay(1000);
  }

  Serial.println();
  Serial.println("WiFi connected");
  Serial.println("IP address: ");
  Serial.println(WiFi.localIP());

  NTPConnect();

  net.setTrustAnchors(&cert);
  net.setClientRSACert(&client_crt, &key);

  client.setServer(MQTT_HOST, 8883);
  client.setCallback(messageReceived);

  Serial.println("Connecting to AWS IoT");

  while (!client.connected()) {
    Serial.print(".");
    if (client.connect(THINGNAME)) {
      Serial.println("connected");
      client.subscribe(AWS_IOT_SUBSCRIBE_TOPIC);
    } else {
      Serial.print("failed, rc=");
      Serial.print(client.state());
      Serial.println(" try again in 5 seconds");
      delay(5000);
    }
  }
}

String getFormattedTime() {
  time_t now = time(nullptr);
  struct tm* p_tm = localtime(&now);

  char buffer[20];
  snprintf(buffer, sizeof(buffer), "%04d-%02d-%02d %02d:%02d:%02d",
           p_tm->tm_year + 1900, p_tm->tm_mon + 1, p_tm->tm_mday,
           p_tm->tm_hour, p_tm->tm_min, p_tm->tm_sec);
  return String(buffer);
}

void addEvent(bool detected_motion) {
  Event* newEvent = new Event;
  newEvent->id = messageCounter++;
  newEvent->detected_motion = detected_motion;
  newEvent->time = getFormattedTime();
  newEvent->next = nullptr;

  if (eventListHead == nullptr) {
    eventListHead = newEvent;
  } else {
    Event* currentEvent = eventListHead;
    while (currentEvent->next != nullptr) {
      currentEvent = currentEvent->next;
    }
    currentEvent->next = newEvent;
  }
}

void publishMessage(float distance) {
  if (distance == 0) {
    addEvent(true);

    // Json object creation
    StaticJsonDocument<200> doc;
    doc["id"] = messageCounter - 1;
    doc["detected_motion"] = true;
    doc["time"] = getFormattedTime();

    // Serialize to string
    String response;
    serializeJson(doc, response);

    const char* responseChar = response.c_str();

    Serial.print("Published: ");
    Serial.println(response);
  }
}

void setup() {
  Serial.begin(115200);
  pinMode(DISTANCE_SENSOR_PIN, INPUT);
  connectAWS();

  // CORS
  server.on("/motion-sensor", HTTP_GET, handleRoot); 
  server.onNotFound(handleNotFound);

  server.begin();
}

void loop() {
  float distance = analogRead(DISTANCE_SENSOR_PIN);
  publishMessage(distance);

  server.handleClient();

  if (!client.connected()) {
    connectAWS();
  }
  client.loop();

  delay(interval);
}



