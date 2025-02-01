from pydantic import BaseModel
from typing import List

class QuizCreate(BaseModel):
    title: str

class QuizResponse(BaseModel):
    id: int
    title: str

    class Config:
        from_attributes = True
