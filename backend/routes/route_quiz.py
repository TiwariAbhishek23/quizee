from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from database.repo.question import generate_quiz_questions
from database.schema.quiz import QuizCreate, QuizResponse
from database.schema.question import QuestionCreate
from database.sessions import get_db
from database.models.quiz import Quiz
from database.models.question import Question
from collections import deque

quiz_router = APIRouter()
valid_qiz_codes = deque(maxlen=10)

@quiz_router.get("/verify/{quiz_code}/")
def verify_quiz_code(quiz_code: str):
    """Verify if a quiz code is valid."""
    if quiz_code in valid_qiz_codes:
        return {"message": "Valid quiz code"}
    else:
        raise HTTPException(status_code=404, detail="Invalid quiz code")

@quiz_router.get("/{quiz_code}/generate-questions/")
def generate_questions(quiz_code: str, topic: str, num_questions: int = 5, db: Session = Depends(get_db)):
    """Generate quiz questions using AI."""
    if quiz_code not in valid_qiz_codes:
        valid_qiz_codes.append(quiz_code)
    try:
        questions = generate_quiz_questions(topic, num_questions)
        question_list = []
        for q in questions['questions']:
            question_list.append([
                q["question"],
                q["options"],
                q["answer"]
            ])
        return question_list
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
