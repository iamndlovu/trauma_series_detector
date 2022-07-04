from fastapi import FastAPI, File, UploadFile
from fastapi.middleware.cors import CORSMiddleware
import uvicorn
import numpy as np
from io import BytesIO
from PIL import Image
import tensorflow as tf

app = FastAPI()

origins = [
    "http://localhost",
    "http://localhost:3000",
]
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

CHEST_MODEL = tf.keras.models.load_model(
    "./trauma_series_chest_model_v1.0.0.h5")
CSPINE_MODEL = tf.keras.models.load_model(
    "./trauma_series_cspine_model_v1.0.0.h5")
PELVIS_MODEL = tf.keras.models.load_model(
    "./trauma_series_pelvis_and_hip_model_v1.0.0.h5")

CHEST_CLASSES = ["Chest: ", "Chest: Flail",
                 "Chest: Haemothorax", "Chest: No Life Threatening Abnormalities Detected", "Chest: Pneumothorax"]

CSPINE_CLASSES = ["C-Spine: Fractured",
                  "C-Spine: No Life Threatening Abnormalities Detected", "C-Spine: Subluxation"]

PELVIS_CLASSES = ["Pelvis: ",
                  "Pelvis: Hip Dislocation", "Pelvis: Fractured",
                  "Pelvis: No Life Threatening Injuries Detected"]


def read_file_as_image(data) -> np.ndarray:
    image = np.array(Image.open(BytesIO(data)))
    return image


@app.post("/predict/chest")
async def chest_predict(
    file: UploadFile = File(...)
):
    image = read_file_as_image(await file.read())
    img_batch = np.expand_dims(image, 0)
    img_batch = tf.image.resize(
        img_batch,
        [256, 256],
        # method=bilinear,
        preserve_aspect_ratio=False,
        antialias=False,
    )

    predictions = CHEST_MODEL.predict(img_batch)
    print(predictions)
    predicted_class = CHEST_CLASSES[np.argmax(predictions[0])]
    confidence = np.max(predictions[0])
    return {
        'class': predicted_class,
        'confidence': float(confidence)
    }


@app.post("/predict/cspine")
async def cspine_predict(
    file: UploadFile = File(...)
):
    image = read_file_as_image(await file.read())
    img_batch = np.expand_dims(image, 0)
    img_batch = tf.image.resize(
        img_batch,
        [256, 256],
        # method=bilinear,
        preserve_aspect_ratio=False,
        antialias=False,
    )

    predictions = CSPINE_MODEL.predict(img_batch)
    print(predictions)
    predicted_class = CSPINE_CLASSES[np.argmax(predictions[0])]
    confidence = np.max(predictions[0])
    return {
        'class': predicted_class,
        'confidence': float(confidence)
    }


@app.post("/predict/pelvis")
async def pelvis_predict(
    file: UploadFile = File(...)
):
    image = read_file_as_image(await file.read())
    img_batch = np.expand_dims(image, 0)
    img_batch = tf.image.resize(
        img_batch,
        [256, 256],
        # method=bilinear,
        preserve_aspect_ratio=False,
        antialias=False,
    )

    predictions = PELVIS_MODEL.predict(img_batch)
    print(predictions)
    predicted_class = PELVIS_CLASSES[np.argmax(predictions[0])]
    confidence = np.max(predictions[0])
    return {
        'class': predicted_class,
        'confidence': float(confidence)
    }

if __name__ == "__main__":
    uvicorn.run(app, host='localhost', port=8000)
