import uuid
from pydantic import BaseModel, ConfigDict
from typing import Optional


class ConditionBase(BaseModel):
    name: str
    description: Optional[str] = None


class ConditionCreate(ConditionBase):
    pass


class ConditionUpdate(BaseModel):
    name: Optional[str] = None
    description: Optional[str] = None

    model_config = ConfigDict(from_attributes=True)


class Condition(ConditionBase):
    id: uuid.UUID
    inventory_id: uuid.UUID

    model_config = ConfigDict(from_attributes=True)
    json_schema_extra = {
        "example": {
            "id": "c79a3c56-90f0-42f7-a5e0-45003e80dc7d",
            "name": "Like New",
            "description": "Used only once",
            "inventory_id": "94a06722-999e-4c58-ae50-2d12e3a8f0cd"
        }
    }
