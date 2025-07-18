from pydantic import BaseModel, ConfigDict
from typing import Optional

class ConditionBase(BaseModel):
    name: str
    description: Optional[str] = None
    inventory_id: int

class ConditionCreate(ConditionBase):
    pass

class ConditionUpdate(BaseModel):
    name: Optional[str] = None
    description: Optional[str] = None
    inventory_id: Optional[int] = None

    class Config:
        model_config = ConfigDict(from_attributes=True)

class Condition(ConditionBase):
    id: int

    class Config:
        model_config = ConfigDict(from_attributes=True)
        arbitrary_types_allowed = True
        json_encoders = {
            # Add any custom encoders for your types here
        }
        json_decoders = {
            # Add any custom decoders for your types here
        }
        schema_extra = {
            "example": {
                "id": 1,
                "name": "Condition Name",
                "description": "Condition Description",
                "inventory_id": 100
            }
        }
        # Add any additional configuration here