import uuid
from pydantic import BaseModel, ConfigDict
from typing import Optional,ClassVar
from datetime import datetime

class ActivityBase(BaseModel):
    user_id: uuid.UUID
    item_id: uuid.UUID
    inventory_id: uuid.UUID
    action: str
    details: Optional[str] = None

class ActivityCreate(ActivityBase):
    pass

class ActivityUpdate(BaseModel):
    action: Optional[str] = None
    details: Optional[str] = None

    model_config = ConfigDict(from_attributes=True)

class Activity(ActivityBase):
    id: uuid.UUID
    created_at: datetime

    model_config: ClassVar[ConfigDict] = ConfigDict(from_attributes=True)
    json_schema_extra = {
        "example": {
            "id": "1e0d34ce-9c27-4b44-bd1d-b6e1f37f8b7a",
            "item_id": "29a1c0d5-4d97-40d6-a2c1-e71f4572e730",
            "user_id": "c65f3d4a-b93e-4abf-a503-26b91dfaa451",
            "inventory_id": "73844e74-9f0e-4ac2-ae91-5b86c44776c6",
            "action": "view",
            "details": "User viewed the item",
            "created_at": "2023-10-01T12:00:00Z"
        }
    }
