import uuid
from pydantic import BaseModel, ConfigDict
from typing import ClassVar, Optional


# Base model — shared fields
class LocationBase(BaseModel):
    name: str
    description: Optional[str] = None


# Used for creation — inventory_id is usually inferred from context
class LocationCreate(LocationBase):
    pass


# Used for update — inventory_id not allowed here
class LocationUpdate(BaseModel):
    name: Optional[str] = None
    description: Optional[str] = None

    model_config: ClassVar[ConfigDict] = ConfigDict(from_attributes=True)


# Full response model — includes UUID fields
class Location(LocationBase):
    id: uuid.UUID
    inventory_id: uuid.UUID

    model_config: ClassVar[ConfigDict] =ConfigDict(from_attributes=True)
    json_schema_extra = {
        "example": {
            "id": "c5c00cb2-89f6-43e7-91d0-7d22e9839b2e",
            "name": "Cupboard",
            "description": "Cupboard in Kitchen",
            "inventory_id": "fae60a7b-7fdd-420f-85a0-1534fafeaf57"
        }
    }
