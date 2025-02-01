from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from database.repo.question import generate_quiz_questions
from database.schema.quiz import QuizCreate, QuizResponse
from database.schema.question import QuestionCreate
from database.sessions import get_db
from database.models.quiz import Quiz
from database.models.question import Question

quiz_router = APIRouter()

@quiz_router.post("/", response_model=QuizResponse)
def create_quiz(quiz: QuizCreate, db: Session = Depends(get_db)):
    """Create a new quiz."""
    new_quiz = Quiz(title=quiz.title)
    db.add(new_quiz)
    db.commit()
    db.refresh(new_quiz)
    return new_quiz

@quiz_router.get("/{quiz_code}/generate-questions/")
def generate_questions(quiz_code: str, topic: str, num_questions: int = 5, db: Session = Depends(get_db)):
    """Generate quiz questions using AI."""
    try:
        questions = generate_quiz_questions(topic, num_questions)
        question_list = []
        for q in questions['questions']:
            question_list.append([
                q["question"],
                q["options"],
                q["answer"]
            ])
        print(question_list)
        return question_list
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
