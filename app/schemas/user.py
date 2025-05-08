from pydantic import BaseModel, EmailStr
from typing import Optional

class UserBase(BaseModel):
    username: str
    email: EmailStr

class UserCreate(UserBase):
    password: str

class UserUpdate(BaseModel):
    username: Optional[str] = None
    email: Optional[EmailStr] = None
    password: Optional[str] = None
    is_active: Optional[bool] = None
    is_superuser: Optional[bool] = None

    class Config:
        from_attributes = True

class User(UserBase):
    id: int
    is_active: bool = True

    class Config:
        from_attributes = True
        schema_extra = {
            "example": {
                "id": 1,
                "username": "johndoe",
                "email": "johndoe@example.com",
                "is_active": True 
            }
        }
# This model uses orm_mode so FastAPI can work smoothly 
# with SQLAlchemy ORM objects. It allows FastAPI to convert
# between ORM objects and response dictionaries automatically.
