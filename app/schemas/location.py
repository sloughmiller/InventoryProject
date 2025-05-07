from pydantic import BaseModel
from typing import Optional

class LocationBase(BaseModel):
    name: str
    description: Optional[str] = None

class LocationCreate(LocationBase):
    pass

class Location(LocationBase):
    id: int

    class Config:
        orm_mode = True
        schema_extra = {
            "example": {
                "id": 1,
                "name": "Central Park",
                "description": "A large public park in New York City."
            }
        }