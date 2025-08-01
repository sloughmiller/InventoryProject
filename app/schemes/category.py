import uuid
from pydantic import BaseModel, ConfigDict
from typing import ClassVar, Optional


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

    model_config = ConfigDict(from_attributes=True)


# Schema for returning a category (used in response_model)
class Category(CategoryBase):
    id: uuid.UUID
    inventory_id: uuid.UUID

    model_config: ClassVar[ConfigDict] =ConfigDict(from_attributes=True)
    json_schema_extra = {
        "example": {
            "id": "28d5c2f3-3a58-4bfc-b82e-2a97e4771631",
            "name": "Electronics",
            "description": "Devices and gadgets",
            "inventory_id": "73844e74-9f0e-4ac2-ae91-5b86c44776c6"
        }
    }
