import uuid
from sqlalchemy import String, ForeignKey, Index
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import Mapped, mapped_column, relationship
from typing import List, TYPE_CHECKING
from .base import Base

if TYPE_CHECKING:
    from .user import User
    from .item import Item
    from .shared_inventory import SharedInventory
    from .category import Category
    from .location import Location
    from .condition import Condition
    from .activity import Activity


class Inventory(Base):
    __tablename__ = "inventories"
    __table_args__ = (
        Index("ix_inventories_id", "id"),
        Index("ix_inventories_name", "name"),
    )

    id: Mapped[uuid.UUID] = mapped_column(
        UUID(as_uuid=True),
        primary_key=True,
        default=uuid.uuid4,
    )

    name: Mapped[str] = mapped_column(String, nullable=False)

    owner_id: Mapped[uuid.UUID] = mapped_column(
        UUID(as_uuid=True),
        ForeignKey("users.id", ondelete="CASCADE"),
        nullable=False,
    )

    # Relationships
    owner: Mapped["User"] = relationship("User", back_populates="inventories")

    items: Mapped[List["Item"]] = relationship(
        "Item", back_populates="inventory", cascade="all, delete", passive_deletes=True
    )

    shared_users: Mapped[List["SharedInventory"]] = relationship(
        "SharedInventory", back_populates="inventory", cascade="all, delete", passive_deletes=True
    )

    categories: Mapped[List["Category"]] = relationship(
        "Category", back_populates="inventory", cascade="all, delete", passive_deletes=True
    )

    locations: Mapped[List["Location"]] = relationship(
        "Location", back_populates="inventory", cascade="all, delete", passive_deletes=True
    )

    conditions: Mapped[List["Condition"]] = relationship(
        "Condition", back_populates="inventory", cascade="all, delete", passive_deletes=True
    )

    activities: Mapped[List["Activity"]] = relationship(
        "Activity", back_populates="inventory", cascade="all, delete", passive_deletes=True
    )
