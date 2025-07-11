from pydantic import BaseModel, ConfigDict
from typing import Optional

class LocationBase(BaseModel):
    name: str
    description: Optional[str] = None

class LocationCreate(LocationBase):
    pass

class LocationUpdate(BaseModel):
    name: Optional[str] = None
    description: Optional[str] = None

    class Config:
        model_config = ConfigDict(from_attributes=True)

class Location(LocationBase):
    id: int

    class Config:
        model_config = ConfigDict(from_attributes=True)
        schema_extra = {
            "example": {
                "id": 1,
                "name": "Central Park",
                "description": "A large public park in New York City."
            }
        }