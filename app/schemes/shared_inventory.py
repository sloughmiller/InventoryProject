from pydantic import BaseModel, ConfigDict
from enum import Enum
from uuid import UUID


class RoleEnum(str, Enum):
    admin = "admin"
    viewer = "viewer"


class SharedInventoryBase(BaseModel):
    user_id: UUID
    role: RoleEnum


class SharedInventoryCreate(SharedInventoryBase):
    inventory_id: UUID


class SharedInventoryResponse(SharedInventoryBase):
    id: UUID
    inventory_id: UUID

    class Config:
        model_config = ConfigDict(from_attributes=True)


class SharedUserInfo(BaseModel):
    user_id: UUID
    username: str
    role: RoleEnum
