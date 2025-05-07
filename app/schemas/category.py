from pydantic import BaseModel
from typing import Optional


class CategoryBase(BaseModel):
    name: str
    description: Optional[str] = None

class CategoryCreate(CategoryBase):
    pass

class Category(CategoryBase):
    id: int

    class Config:
        orm_mode = True
        schema_extra = {
            "example": {
                "id": 1,
                "name": "Electronics",
                "description": "Devices and gadgets"
            }
        }
        # This will allow us to use ORM objects directly with Pydantic models
        # without needing to convert them to dictionaries first.
