from sqlalchemy import Column, Integer, String, Boolean
from sqlalchemy.orm import relationship
from app.database import Base

class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    username = Column(String, unique=True, index=True, nullable=False)
    email = Column(String, unique=True, index=True, nullable=False)
    hashed_password = Column(String, nullable=False)
    is_active = Column(Boolean, default=True)
    is_superuser = Column(Boolean, default=False)

    activities = relationship("Activity", back_populates="user")

    def __repr__(self):
        return (f"<User(id={self.id}, username='{self.username}', "
                f"email='{self.email}', is_active={self.is_active}, "
                f"is_superuser={self.is_superuser})>")