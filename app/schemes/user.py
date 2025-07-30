from pydantic import BaseModel, EmailStr, ConfigDict
from typing import Optional
from uuid import UUID

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
        model_config = ConfigDict(from_attributes=True)

class User(UserBase):
    id: UUID
    is_active: bool = True

    class Config:
        model_config = ConfigDict(from_attributes=True)
        schema_extra = {
            "example": {
                "id": "c0a801d6-9a2a-4f45-87a3-e389a143c0ee",
                "username": "johndoe",
                "email": "johndoe@example.com",
                "is_active": True
            }
        }
