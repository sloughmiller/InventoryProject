from pydantic import BaseModel, ConfigDict
from typing import Optional
from datetime import datetime

class ActivityBase(BaseModel):
    user_id: int
    item_id: int
    action: str
    details: Optional[str] = None

class ActivityCreate(ActivityBase):
    pass

class ActivityUpdate(BaseModel):
    action: Optional[str] = None
    details: Optional[str] = None

    class Config:
        model_config = ConfigDict(from_attributes=True)

class Activity(ActivityBase):
    id: int
    created_at: datetime

    class Config:
        model_config = ConfigDict(from_attributes=True)
        json_schema_extra = {
            "example": {
                "id": 1,
                "item_id": 123,
                "user_id": 456,
                "action": "view",
                "details": "User viewed the item",
                "created_at": "2023-10-01T12:00:00Z"
            }
        }
