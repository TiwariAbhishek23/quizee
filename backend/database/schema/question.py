from pydantic import BaseModel
from typing import List

class QuestionCreate(BaseModel):
    quiz_id: int
    text: str
    options: List[str]
    correct_answer: str
    time_limit: int

class QuestionResponse(BaseModel):
    id: int
    quiz_id: int
    text: str
    options: List[str]
    correct_answer: str
    time_limit: int

    class Config:
        from_attributes = True
