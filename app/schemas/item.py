from pydantic import BaseModel
from typing import Optional
from datetime import date

class ItemBase(BaseModel):
    name: str
    description: Optional[str] = None
    barcode: Optional[str] = None
    purchase_date: Optional[date] = None
    value: Optional[float] = None
    category_id: Optional[int] = None
    location_id: Optional[int] = None
    condition_id: Optional[int] = None

class ItemCreate(ItemBase):
    pass

class ItemUpdate(BaseModel):
    name: Optional[str] = None
    description: Optional[str] = None
    barcode: Optional[str] = None
    value: Optional[float] = None
    category_id: Optional[int] = None
    location_id: Optional[int] = None
    condition_id: Optional[int] = None
    owner_id: Optional[int] = None

    class Config:
        from_attributes = True

class Item(ItemBase):
    id: int
    owner_id: int

    class Config:
        from_attributes = True
        schema_extra = {
            "example": {
                "id": 1,
                "name": "Mountain Bike",
                "description": "Trek X-Caliber 7, red color",
                "barcode": "123456789",
                "purchase_date": "2023-08-15",
                "value": 899.99,
                "category_id": 2,
                "location_id": 3,
                "condition_id": 1,
                "owner_id": 1
            }
        }
        # This allows the model to work with ORM objects
        # by converting them to dictionaries
        # and vice versa.
        # It is useful when using ORMs like SQLAlchemy
        # which return objects instead of dictionaries.
        # This is important for FastAPI to work with SQLAlchemy
        # and other ORMs.
        # It allows the model to work with ORM objects
        # by converting them to dictionaries
        # and vice versa.