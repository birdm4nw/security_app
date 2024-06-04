# Security IoT Application Based on Artificial Vision

## Overview

The following project aims to provide a security solution based on the implementation of IoT technologies and the use of an artificial vision model for real-time detection of the flow of people in a given space through a security camera that works under the RTSP protocol and an infrared motion sensor. The approach of this solution involves the integration of technologies that will allow the user to interact with a real-time monitoring system through a web application with three main modules:

1. **Real-time Video:** Displaying camera feed processed with artificial intelligence.
2. **Camera Events:** Records associated with the camera.
3. **PIR Events:** Events from the infrared sensor.

In addition, the application will have real-time alert notifications via Telegram.

## Hardware

![IP Camera Tapo C200](documentation/camera.jpeg)
![Circuit](documentation/circuit.jpeg)

- IP Camera Tapo C200
- Laptop camera (for testing)
- HW-201 (motion sensor)
- ESP8266 (transfer motion sensor data via HTTP protocol)

## Software

### Programming Languages and Technologies

- Python (Ultralytics model use, Telegram bot configuration, motion sensor data capture)
- JavaScript (Frontend, events fetch)
- Tailwind CSS, Material UI (Frontend)
- Java [Spring Boot] (Backend - User validation, events fetch from DB)
- C++ (ESP8266 and HW-201 logic)
- Bash (Automation of Python scripts execution)
- Ultralytics pre-trained models

## Workflow

### Login Page

![Login Page](documentation/results_login.png)

### Live Detection Page

![Live Detection Page](documentation/results_livedet.png)

### Camera Events Page

![Camera Events Page](documentation/results_cam-events.png)

### PIR Events

![PIR Events](documentation/results_PIR_events.png)

### Help Section

![Help Section](documentation/results_help.png)

