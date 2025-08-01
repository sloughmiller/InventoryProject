from sqlalchemy import String, Boolean, Index
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import Mapped, mapped_column, relationship
from typing import List, Optional, TYPE_CHECKING
from .base import Base
import uuid

if TYPE_CHECKING:
    from .item import Item
    from .activity import Activity
    from .inventory import Inventory
    from .shared_inventory import SharedInventory


class User(Base):
    __tablename__ = "users"
    __table_args__ = (
        Index("ix_users_id", "id"),
        Index("ix_users_username", "username", unique=True),
        Index("ix_users_email", "email", unique=True),
    )

    id: Mapped[uuid.UUID] = mapped_column(
        UUID(as_uuid=True), primary_key=True, default=uuid.uuid4
    )
    username: Mapped[str] = mapped_column(String, unique=True, nullable=False)
    email: Mapped[str] = mapped_column(String, unique=True, nullable=False)
    hashed_password: Mapped[str] = mapped_column(String, nullable=False)
    is_active: Mapped[Optional[bool]] = mapped_column(Boolean, default=True)
    is_superuser: Mapped[Optional[bool]] = mapped_column(Boolean, default=False)

    activities: Mapped[List["Activity"]] = relationship(
        "Activity", back_populates="user", cascade="all, delete", passive_deletes=True
    )
    inventories: Mapped[List["Inventory"]] = relationship(
        "Inventory", back_populates="owner", cascade="all, delete", passive_deletes=True
    )
    shared_inventories: Mapped[List["SharedInventory"]] = relationship(
        "SharedInventory",
        back_populates="user",
        cascade="all, delete",
        passive_deletes=True,
    )
