# Security IoT Application Based on Artificial Vision

<table>
  <tr>
    <td><img src="documentation/results_dashboard.png" alt="Results Dashboard"></td>
    <td><img src="documentation/results_home.png" alt="Results Home"></td>
  </tr>
  <tr>
    <td align="center">Results Dashboard</td>
    <td align="center">Results Home</td>
  </tr>
</table>
The following project aims to provide a security solution based on the implementation of IoT technologies and the use of an artificial vision model for real-time detection of the flow of people in a given space through a security camera that works under the RTSP protocol and an infrared motion sensor. The approach of this solution involves the integration of technologies that will allow the user to interact with a real-time monitoring system through a web application with three main modules, the first one related to the real-time video of the camera processed with artificial intelligence, the second one corresponds to records associated with the same camera and the third one with events from the infrared sensor. In addition, the application will have real-time alert notifications via telegram.  
## Hardware
![Alt text](documentation/camera.jpeg
)
![Alt text](documentation/circuit.jpeg
)
- IP Camera Tapo C200
- Laptop camera (for testing)
- HW-201 (motion sensor)
- ESP8266 (transfer motion sensor data via HTTP protocol)
## Software
### Programming languages and technologies
- Python (Ultralytics model use, telegram bot configuration, motion sensor data capture)
- JavaScript (Frontend, events fetch)
- Tailwind CSS, Material UI (Frontend)
- Java [Spring Boot] (Backend - User validation, events fetch from db)
- C++ (ESP8266 and HW-201 logic)
- Bash (Automation of Python scrips execution)
- Ultralytics pre-trained models
## Workflow
### Login Page
![Alt text](documentation/results_login.png
)
### Live Detection Page
![Alt text](documentation/results_livedet.png
)
### Camera Events Page
![Alt text](documentation/results_cam-events.png
)
### PIR Events
![Alt text](documentation/results_PIR_events.png
)
### Help section
![Alt text](documentation/results_help.png
)
