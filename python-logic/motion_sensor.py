import asyncio
import requests
from datetime import datetime

# telegram external class
from telegram_bot import send_message, chat_id 

# Telegram access
CHAT_ID = chat_id

previous_objects = []

async def capture_events(endpoint_url):
    global previous_objects
    
    while True:
        try:
            response = requests.get(endpoint_url)
            
            if response.status_code == 200:
                data = response.json()
                
                for obj in data:
                    obj_time = datetime.strptime(obj["time"], "%Y-%m-%d %H:%M:%S")
                    current_time = datetime.now()
                    
                    if (current_time - obj_time).total_seconds() < 10:
                        if obj not in previous_objects:
                            text = "🚨 Motion detected by infrared sensor!"
                            await send_message(text=text, chat_id=CHAT_ID)
                            previous_objects.append(obj)
                
        except Exception as e:
            print("Error al capturar objetos:", e)
        
        await asyncio.sleep(5)  

async def main():
    endpoint_url = "http://ip-motionSensor:8081/motion-sensor"
    await capture_events(endpoint_url)

async def run_main():
    await main()

asyncio.run(run_main())
