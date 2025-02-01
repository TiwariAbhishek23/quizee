from sqlalchemy import Column, ForeignKey, Integer, String
from sqlalchemy.orm import relationship
from baseClass import Base

class Score(Base):
    __tablename__ = "scores"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"))
    quiz_id = Column(Integer, ForeignKey("quiz.id"))
    score = Column(Integer, default=0)

    user = relationship("User")
    quiz = relationship("Quiz")