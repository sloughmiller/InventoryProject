from sqlalchemy import ForeignKey, String, Index
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import Mapped, mapped_column, relationship
from typing import List, Optional
from .base import Base
from typing import TYPE_CHECKING
import uuid

if TYPE_CHECKING:
    from .item import Item
    from .inventory import Inventory


class Location(Base):
    __tablename__ = "locations"
    __table_args__ = (
        Index("ix_locations_id", "id"),
        Index("ix_locations_name", "name", unique=True),
    )

    id: Mapped[uuid.UUID] = mapped_column(
        UUID(as_uuid=True), primary_key=True, default=uuid.uuid4
    )
    name: Mapped[str] = mapped_column(String, unique=True)
    description: Mapped[Optional[str]] = mapped_column(String, nullable=True)
    inventory_id: Mapped[uuid.UUID] = mapped_column(
        UUID(as_uuid=True),
        ForeignKey("inventories.id", ondelete="CASCADE"),
        nullable=False
    )

    items: Mapped[List["Item"]] = relationship(
        "Item", back_populates="location", cascade="all, delete", passive_deletes=True
    )
    
    inventory: Mapped["Inventory"] = relationship(
        "Inventory", back_populates="locations"
    )
