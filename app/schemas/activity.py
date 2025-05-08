from pydantic import BaseModel
from typing import Optional
from datetime import datetime


class ActivityBase(BaseModel):
    item_id: int
    user_id: int
    action: str
    details: Optional[str] = None

class ActivityCreate(ActivityBase):
    pass

class ActivityUpdate(BaseModel):
    action: Optional[str] = None
    details: Optional[str] = None

    class Config:
        from_attributes = True

class Activity(ActivityBase):
    id:int
    timestamp: datetime


    class Config:
        from_attributes = True
        schema_extra = {
            "example": {
                "id": 1,
                "item_id": 123,
                "user_id": 456,
                "action": "view",
                "details": "User viewed the item",
                "timestamp": "2023-10-01T12:00:00Z"
            }
        }