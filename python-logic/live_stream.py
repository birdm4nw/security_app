import cv2
import asyncio
import websockets
import numpy as np
from flask import Flask, Response
from ultralytics import YOLO

app = Flask(__name__)

web_camera = 0 
tapo_camera = 'rtsp://username:password@ip-camera/stream1'

cap = cv2.VideoCapture(web_camera)  
# YOLOv8 model loading
model_detect = YOLO('yolo-Weights/yolov8n.pt')
model_pose = YOLO('yolov8n-pose.pt')

async def handle_client(websocket, path):
    while cap.isOpened():
        success, frame = cap.read()

        if success:
            # Tracking con YOLOv8
            results = model_pose.track(frame, persist=True)
            annotated_frame = results[0].plot()

            # annotated frame to bytes
            ret, encoded_frame = cv2.imencode('.jpg', annotated_frame)
            if ret:
                await websocket.send(encoded_frame.tobytes())


async def start_server():
    server = await websockets.serve(handle_client, "localhost", 8765)

    await server.wait_closed()


@app.route('/')
def index():
    return "Security AV Application!"


if __name__ == '__main__':
    asyncio.get_event_loop().run_until_complete(start_server())
    app.run(debug=True, host='0.0.0.0', port=5001)




