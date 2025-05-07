from sqlalchemy import Column, Integer, String
from app.database import Base

class Condition(Base):
    __tablename__ = "conditions"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, unique=True, nullable=False)
    description = Column(String)

    def __repr__(self):
        return f"<Condition(id={self.id}, name='{self.name}')>"