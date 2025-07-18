from pydantic import BaseModel, ConfigDict
from typing import Optional


class CategoryBase(BaseModel):
    name: str
    description: Optional[str] = None
    inventory_id: int

class CategoryCreate(CategoryBase):
    pass

class CategoryUpdate(BaseModel):
    name: Optional[str] = None
    description: Optional[str] = None
    inventory_id: Optional[int] = None

    class Config:
        model_config = ConfigDict(from_attributes=True)


class Category(CategoryBase):
    id: int

    class Config:
        model_config = ConfigDict(from_attributes=True)
        schema_extra = {
            "example": {
                "id": 1,
                "name": "Electronics",
                "description": "Devices and gadgets",
                "inventory_id": 100
            }
        }
        # This will allow us to use ORM objects directly with Pydantic models
        # without needing to convert them to dictionaries first.
