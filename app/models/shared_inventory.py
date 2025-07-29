from sqlalchemy import ForeignKey, Enum
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import Mapped, mapped_column, relationship
from typing import TYPE_CHECKING
from .base import Base
import uuid
import enum

if TYPE_CHECKING:
    from .user import User
    from .inventory import Inventory

class RoleEnum(str, enum.Enum):
    admin = "admin"
    viewer = "viewer"

class SharedInventory(Base):
    __tablename__ = "shared_inventory"

    id: Mapped[uuid.UUID] = mapped_column(
        UUID(as_uuid=True), primary_key=True, default=uuid.uuid4
    )
    inventory_id: Mapped[uuid.UUID] = mapped_column(
        UUID(as_uuid=True), ForeignKey("inventories.id", ondelete="CASCADE")
    )
    user_id: Mapped[uuid.UUID] = mapped_column(
        UUID(as_uuid=True), ForeignKey("users.id", ondelete="CASCADE")
    )
    role: Mapped[RoleEnum] = mapped_column(Enum(RoleEnum), nullable=False)

    inventory: Mapped["Inventory"] = relationship("Inventory", back_populates="shared_users")
    user: Mapped["User"] = relationship("User", back_populates="shared_inventories")
