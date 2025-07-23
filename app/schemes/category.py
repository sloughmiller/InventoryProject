from pydantic import BaseModel, ConfigDict
from typing import Optional


# Base model for shared fields (no inventory_id here anymore)
class CategoryBase(BaseModel):
    name: str
    description: Optional[str] = None


# Schema for creating a category (used in POST body)
class CategoryCreate(CategoryBase):
    pass


# Schema for updating a category (used in PUT body)
class CategoryUpdate(BaseModel):
    name: Optional[str] = None
    description: Optional[str] = None

    class Config:
        model_config = ConfigDict(from_attributes=True)


# Schema for returning a category (used in response_model)
class Category(CategoryBase):
    id: int
    inventory_id: int

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
