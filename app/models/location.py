from sqlalchemy import Column, Integer, String
from app.database import Base

class Location(Base):
    __tablename__ = "locations"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, unique=True, index=True, nullable=False)
    description = Column(String, nullable=True)

    def __repr__(self):
        return f"<Location(id={self.id}, name={self.name}, description={self.description})>"