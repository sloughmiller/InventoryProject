import uuid
from pydantic import BaseModel, ConfigDict
from typing import ClassVar, Optional


class InventoryBase(BaseModel):
    name: str


class InventoryCreate(InventoryBase):
    owner_id: Optional[uuid.UUID] = None 


class InventoryUpdate(BaseModel):
    name: Optional[str] = None

    model_config: ClassVar[ConfigDict] = ConfigDict(from_attributes=True)


class Inventory(InventoryBase):
    id: uuid.UUID
    owner_id: uuid.UUID

    model_config: ClassVar[ConfigDict] =ConfigDict(from_attributes=True)
    json_schema_extra = {
        "example": {
            "id": "94a06722-999e-4c58-ae50-2d12e3a8f0cd",
            "name": "My Home Inventory",
            "owner_id": "4f9c1bfa-04f5-4413-86d5-2c33f7ea6b7c"
        }
    }
