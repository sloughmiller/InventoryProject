from pydantic import BaseModel, ConfigDict
from typing import Optional

class LocationBase(BaseModel):
    name: str
    description: Optional[str] = None
    inventory_id: int

class LocationCreate(LocationBase):
    pass

class LocationUpdate(BaseModel):
    name: Optional[str] = None
    description: Optional[str] = None
    inventory_id: Optional[int] = None

    class Config:
        model_config = ConfigDict(from_attributes=True)

class Location(LocationBase):
    id: int

    class Config:
        model_config = ConfigDict(from_attributes=True)
        schema_extra = {
            "example": {
                "id": 1,
                "name": "Cupboard",
                "description": "Cupboard in Kitchen",
                "inventory_id": 42
            }
        }