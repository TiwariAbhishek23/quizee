from fastapi import APIRouter, Depends, HTTPException, status, UploadFile, File, Form
import os
import shutil
from datetime import timedelta
from services.question_generator import generate_quiz_questions, generate_questions_from_pdf

from fastapi.encoders import jsonable_encoder
from fastapi.responses import JSONResponse

login_router = APIRouter()
UPLOAD_DIR = "uploads"
os.makedirs(UPLOAD_DIR, exist_ok=True)

@login_router.get("/generate-quiz")
def generate_quiz_questions(topic: str, num_questions: int = 5):
    try:
        questions = generate_quiz_questions(topic, num_questions)
        return {"questions": questions}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@login_router.post("upload-pdf")
def generate_questions_from_pdf(file: UploadFile = File(...), num_questions: int = 5):
    try:
        file_path = f"{UPLOAD_DIR}/{file.filename}"
        with open(file_path, "wb") as buffer:
            shutil.copyfileobj(file.file, buffer)

        questions = generate_questions_from_pdf(file_path, num_questions)
        os.remove(file_path)

        return {"questions": questions}

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

