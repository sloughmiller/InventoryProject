import uuid
from pydantic import BaseModel, ConfigDict
from typing import Optional
from datetime import date


# Shared base model — used for create and response
class ItemBase(BaseModel):
    name: str
    description: Optional[str] = None
    barcode: Optional[str] = None
    purchase_date: Optional[date] = None
    value: Optional[float] = None
    quantity: Optional[int] = None
    category_id: Optional[uuid.UUID] = None
    location_id: Optional[uuid.UUID] = None
    condition_id: Optional[uuid.UUID] = None


# For item creation — inventory_id is required
class ItemCreate(ItemBase):
    inventory_id: uuid.UUID


# For item updates — inventory_id is *not* allowed
class ItemUpdate(BaseModel):
    name: Optional[str] = None
    description: Optional[str] = None
    barcode: Optional[str] = None
    purchase_date: Optional[date] = None
    value: Optional[float] = None
    quantity: Optional[int] = None
    category_id: Optional[uuid.UUID] = None
    location_id: Optional[uuid.UUID] = None
    condition_id: Optional[uuid.UUID] = None

    model_config = ConfigDict(from_attributes=True)


# Response model — includes ID and inventory ID
class Item(ItemBase):
    id: uuid.UUID
    inventory_id: uuid.UUID

    model_config = ConfigDict(from_attributes=True)
    json_schema_extra = {
        "example": {
            "id": "f13f4f8e-31b5-4560-91a2-51c39e322e0a",
            "name": "Mountain Bike",
            "description": "Trek X-Caliber 7, red color",
            "barcode": "123456789",
            "purchase_date": "2023-08-15",
            "value": 899.99,
            "quantity": 2,
            "category_id": "e9e6b709-2f69-4d6c-a6d1-ea634dca1c58",
            "location_id": "76c4dd80-20b6-4e6e-b497-04df1a32aa7a",
            "condition_id": "b93a7ab3-748e-4dd5-b39c-7f6cb48c7b28",
            "inventory_id": "bc44d05c-9431-48d5-8df8-5dc6de3b5997"
        }
    }
