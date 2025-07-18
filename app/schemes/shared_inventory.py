from pydantic import BaseModel,ConfigDict
from enum import Enum


class RoleEnum(str, Enum):
    admin = "admin"
    viewer = "viewer"


class SharedInventoryBase(BaseModel):
    user_id: int
    role: RoleEnum


class SharedInventoryCreate(SharedInventoryBase):
    inventory_id: int


class SharedInventoryResponse(SharedInventoryBase):
    id: int
    inventory_id: int

    class Config:
        model_config = ConfigDict(from_attributes=True)


class SharedUserInfo(BaseModel):
    user_id: int
    username: str
    role: RoleEnum
