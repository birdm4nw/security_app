import cv2
from ultralytics import YOLO

from pymongo.mongo_client import MongoClient
import base64
import gridfs

import numpy as np
from io import BytesIO
from PIL import Image

import time
import os
from datetime import datetime

import pdb
from dotenv import load_dotenv

from telegram import Bot
import asyncio

# telegram external class
from telegram_bot import send_message, send_photo, chat_id 

# Telegram access
CHAT_ID=chat_id

# Load DB Creds file
load_dotenv()

# DB Variables
MONGO_URI = os.getenv('MONGO_URI')
client = MongoClient(MONGO_URI)
database = client['db-name'] 
collection = database['collection-name']

# YOLOv8 model loading
model_detect = YOLO('yolo-Weights/yolov8n.pt')
model_pose = YOLO('yolov8n-pose.pt')

# Camera variables
web_camera = 0 
tapo_camera = 'rtsp://username:password@ip-camera/stream1'

# Live camera tracking
cap = cv2.VideoCapture(web_camera) 

# Reports dir
alert_captions_dir = './alert-captions/'
time_interval = 5
last_save_time = time.time() 

fs = gridfs.GridFS(database)


async def main():
    try:
        client.admin.command('ping')
        print("\n[+] Connection established successfuly!")
    except Exception as e:
        print(e)
    
    global last_save_time
    # Loop through the video frames
    while cap.isOpened():
        # Read a frame from the video
        success, frame = cap.read()

        if success:
            # Tracking with YOLOv8
            results = model_pose.track(frame, persist=True)
        
            
            annotated_frame = results[0].plot()

            # Live AV detection video
            # cv2.imshow("YOLOv8 Tracking", annotated_frame)

            # if detection, this happens
            if detect_person(results):
                if(time.time() - last_save_time >= time_interval):
                    saved_caption = save_frame(frame, annotated_frame)

                    text = "🎥 People motion detected by camera tapo_c200!"
                    await send_message(text=text, chat_id=CHAT_ID) # message
                    await send_photo(photo=open(caption_av, 'rb'), chat_id=CHAT_ID) # caption (W_Boxes)

                    caption_to_gridfs(caption_av)
                    saved_caption
                    last_save_time = time.time()

            if cv2.waitKey(1) & 0xFF == ord("q"):

                break
        else:
            break




# Detection evaluation
def detect_person(results):
    global evalConf

    for result in results:
        if 0 in result.boxes.cls:
            evalConf = result[0].boxes.conf[0].item()
            if evalConf > 0.70:
                return True
    return False


# Saving detected and annotated_frame
def save_frame(frame, annotated_frame):
    global caption
    global caption_av

    current_count = len(os.listdir(alert_captions_dir)) // 2 + 1

    caption = alert_captions_dir + f"person_{current_count}.jpg"
    caption_av = alert_captions_dir + f"av_person_{current_count}.jpg"

    cv2.imwrite(caption, frame) 
    cv2.imwrite(caption_av, annotated_frame)


# Captured caption to gridfs
def caption_to_gridfs(caption_av):
    intEvalConf = int(evalConf * 100)
    currentTime = datetime.now()

    with open(caption_av, "rb") as caption_file:
        encoded_string = base64.b64encode(caption_file.read())

    fileId = fs.put(encoded_string, filename=caption_av) # Contents base64 caption
    data = {
        "filename":caption_av,
        "fileId":fileId,
        "capturedAt":currentTime,
        "evalConf":intEvalConf
        }
    collection.insert_one(data)


def gridfs_to_PIL_caption():
    # Build PIL Image
    file = fs.find_one({"filename":caption}) # looking for filename on db
    time.sleep(2)
    bytedata = file.read()

    imgIO = BytesIO(base64.b64decode(bytedata))
    caption_PIL = Image.open(imgIO)
    print(type(caption_PIL)) 
    caption_PIL.show()
    try:
        caption_PIL.save('hello.jpg')
        print("\n[+] Picture retrieved successfuly from gridfs!")
    except Exception as e:
        print("[!] There was a problem converting gridfs caption to PIL format!")


if __name__ == '__main__':
    asyncio.run(main())
    cap.release()
    cv2.destroyAllWindows()
