from pydantic import BaseModel, EmailStr

class UserBase(BaseModel):
    username: str
    email: EmailStr

class UserCreate(UserBase):
    password: str

class User(UserBase):
    id: int
    is_active: bool = True

    class Config:
        orm_mode = True
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
