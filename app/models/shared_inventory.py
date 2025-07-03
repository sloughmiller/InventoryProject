# models/shared_inventory.py
from sqlalchemy import Integer, ForeignKey, Enum
from sqlalchemy.orm import Mapped, mapped_column, relationship
from typing import TYPE_CHECKING
from .base import Base
import enum

if TYPE_CHECKING:
    from .user import User
    from .inventory import Inventory

class RoleEnum(str, enum.Enum):
    admin = "admin"
    viewer = "viewer"

class SharedInventory(Base):
    __tablename__ = "shared_inventory"

    id: Mapped[int] = mapped_column(primary_key=True)
    inventory_id: Mapped[int] = mapped_column(ForeignKey("inventories.id", ondelete="CASCADE"))
    user_id: Mapped[int] = mapped_column(ForeignKey("users.id", ondelete="CASCADE"))
    role: Mapped[RoleEnum] = mapped_column(Enum(RoleEnum), nullable=False)

    inventory: Mapped['Inventory'] = relationship('Inventory', back_populates='shared_users')
    user: Mapped['User'] = relationship('User', back_populates='shared_inventories')
