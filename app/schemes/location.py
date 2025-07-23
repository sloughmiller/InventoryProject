from pydantic import BaseModel, ConfigDict
from typing import Optional


# Base model — no inventory_id here
class LocationBase(BaseModel):
    name: str
    description: Optional[str] = None


# Used for creation (inventory_id will come from the route/controller, not here)
class LocationCreate(LocationBase):
    pass


# Used for update — do not allow inventory_id to be updated
class LocationUpdate(BaseModel):
    name: Optional[str] = None
    description: Optional[str] = None

    class Config:
        model_config = ConfigDict(from_attributes=True)


# Response model — includes inventory_id and id
class Location(LocationBase):
    id: int
    inventory_id: int

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
