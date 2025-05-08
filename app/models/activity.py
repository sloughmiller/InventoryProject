from sqlalchemy import Column, Integer, String, DateTime, ForeignKey, Text
from sqlalchemy.sql import func
from sqlalchemy.orm import relationship
from app.database import Base

class Activity(Base):
    __tablename__ = "activities"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"))
    item_id = Column(Integer, ForeignKey("items.id")) 
    action = Column(String, nullable=False)
    details = Column(String, nullable=True)
    created_at = Column(String, server_default=func.now())

    user = relationship("User", back_populates="activities")

    def __repr__(self):
        return (f"<Activity(id={self.id}, user_id={self.user_id}, "
                f"activity_type='{self.activity_type}', created_at='{self.created_at}')>")