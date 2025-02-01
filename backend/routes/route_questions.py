from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from database.schema.question import QuestionCreate, QuestionResponse
from database.sessions import get_db
from database.models.question import Question

question_router = APIRouter()

@question_router.post("/", response_model=QuestionResponse)
def add_question(question: QuestionCreate, db: Session = Depends(get_db)):
    """Add a manual question to a quiz."""
    new_question = Question(
        quiz_id=question.quiz_id,
        text=question.text, 
        options=question.options, 
        correct_answer=question.correct_answer,
        time_limit=question.time_limit
    )
    db.add(new_question)
    db.commit()
    db.refresh(new_question)
    return new_question

@question_router.get("/{quiz_id}/")
def get_questions(quiz_id: int, db: Session = Depends(get_db)):
    """Retrieve all questions for a specific quiz."""
    questions = db.query(Question).filter(Question.quiz_id == quiz_id).all()
    if not questions:
        raise HTTPException(status_code=404, detail="No questions found for this quiz")
    return questions
