# schemas/inventory.py
from pydantic import BaseModel, ConfigDict
from typing import Optional

class InventoryBase(BaseModel):
    name: str

class InventoryCreate(InventoryBase):
    owner_id: Optional[int] = None  # filled in automatically from current_user

class InventoryUpdate(BaseModel):
    name: Optional[str] = None

    class Config:
        model_config = ConfigDict(from_attributes=True)

class Inventory(InventoryBase):
    id: int
    owner_id: int

    class Config:
        model_config = ConfigDict(from_attributes=True)
        schema_extra = {
            "example": {
                "id": 1,
                "name": "My Home Inventory",
                "owner_id": 1
            }
        }
