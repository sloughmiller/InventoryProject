from pydantic import BaseModel
from typing import Optional

class ConditionBase(BaseModel):
    name: str
    description: Optional[str] = None

class ConditionCreate(ConditionBase):
    pass

class ConditionUpdate(BaseModel):
    name: Optional[str] = None
    description: Optional[str] = None

    class Config:
        from_attributes = True

class Condition(ConditionBase):
    id: int

    class Config:
        from_attributes = True
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
                "description": "Condition Description"
            }
        }
        # Add any additional configuration here