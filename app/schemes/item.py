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
    category_id: Optional[int] = None
    location_id: Optional[int] = None
    condition_id: Optional[int] = None


# For item creation — inventory_id is required, but only here
class ItemCreate(ItemBase):
    inventory_id: int


# For item updates — do NOT allow inventory_id to be updated
class ItemUpdate(BaseModel):
    name: Optional[str] = None
    description: Optional[str] = None
    barcode: Optional[str] = None
    purchase_date: Optional[date] = None
    value: Optional[float] = None
    quantity: Optional[int] = None
    category_id: Optional[int] = None
    location_id: Optional[int] = None
    condition_id: Optional[int] = None

    class Config:
        model_config = ConfigDict(from_attributes=True)


# Response model — includes ID and inventory ID
class Item(ItemBase):
    id: int
    inventory_id: int

    class Config:
        model_config = ConfigDict(from_attributes=True)
        schema_extra = {
            "example": {
                "id": 1,
                "name": "Mountain Bike",
                "description": "Trek X-Caliber 7, red color",
                "barcode": "123456789",
                "purchase_date": "2023-08-15",
                "value": 899.99,
                "quantity": 2,
                "category_id": 2,
                "location_id": 3,
                "condition_id": 1,
                "inventory_id": 1
            }
        }
