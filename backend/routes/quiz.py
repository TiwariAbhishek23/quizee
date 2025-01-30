from fastapi import APIRouter, Depends, HTTPException, status, UploadFile, File, Form
import os
from services.question_generator import generate_quiz_questions, generate_questions_from_pdf

from fastapi.encoders import jsonable_encoder
from fastapi.responses import JSONResponse

quiz_router = APIRouter()
UPLOAD_DIR = "uploads"
os.makedirs(UPLOAD_DIR, exist_ok=True)

@quiz_router.get("/generate-quiz")
def generate_questions_from_topic(topic: str, num_questions: int = 5):
    try:
        questions = generate_quiz_questions(topic, num_questions)
        return questions
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

# @quiz_router.post("/upload-pdf")
# def generate_questions_from_pdf(file: UploadFile, num_questions: int = 5):
#     try:
#         file_path = f"{UPLOAD_DIR}/{file.filename}"
#         with open(file_path, "wb") as buffer:
#             shutil.copyfileobj(file.file, buffer)

#         questions = generate_questions_from_pdf(file_path, num_questions)
#         os.remove(file_path)

#         return {"questions": questions}

#     except Exception as e:
#         raise HTTPException(status_code=500, detail=str(e))

