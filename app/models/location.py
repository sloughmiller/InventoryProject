from sqlalchemy import ForeignKey, String, Integer, Index
from sqlalchemy.orm import Mapped, mapped_column, relationship
from typing import List, Optional
from .base import Base
from typing import TYPE_CHECKING

if TYPE_CHECKING:
    from .item import Item
    from .inventory import Inventory


class Location(Base):
    __tablename__ = "locations"
    __table_args__ = (
        Index("ix_locations_id", "id"),
        Index("ix_locations_name", "name", unique=True),
    )

    id: Mapped[int] = mapped_column(primary_key=True)
    name: Mapped[str] = mapped_column(String, unique=True)
    description: Mapped[Optional[str]] = mapped_column(String, nullable=True)
    inventory_id: Mapped[int] = mapped_column(
        ForeignKey("inventories.id", ondelete="CASCADE"), nullable=False
    )

    items: Mapped[List["Item"]] = relationship(
        "Item", back_populates="location", cascade="all, delete", passive_deletes=True
    )
    
    inventory: Mapped["Inventory"] = relationship(
        "Inventory", back_populates="locations"
    )
