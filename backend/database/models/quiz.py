from sqlalchemy import Column, Date, Integer, String, Enum
from sqlalchemy.orm import relationship
from database.baseClass import Base

class Quiz(Base):
    __tablename__ = "quiz"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String(100), nullable=False)
    creator_id = Column(Integer, nullable=False)
    created_date = Column(Date)

    questions = relationship("Question", back_populates="quiz")
    players = relationship("User", back_populates="played_quizzes")
    creator = relationship("User", back_populates="created_quizzes")