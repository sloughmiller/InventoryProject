from pydantic import Basemodel
from typing import Optional

class ConditionBase(Basemodel):
    name: str
    description: Optional[str] = None

class ConditionCreate(ConditionBase):
    pass

class Condition(ConditionBase):
    id: int

    class Config:
        orm_mode = True
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