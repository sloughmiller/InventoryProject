from sqlalchemy import String, Date, Numeric, ForeignKey, Index
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import Mapped, mapped_column, relationship
from typing import List, Optional, TYPE_CHECKING
import uuid
import datetime
import decimal
from .base import Base

if TYPE_CHECKING:
    from .inventory import Inventory
    from .activity import Activity
    from .category import Category
    from .location import Location
    from .condition import Condition


class Item(Base):
    __tablename__ = "items"
    __table_args__ = (Index("ix_items_id", "id"),)

    id: Mapped[uuid.UUID] = mapped_column(
        UUID(as_uuid=True), primary_key=True, default=uuid.uuid4
    )
    name: Mapped[str] = mapped_column(String)
    description: Mapped[Optional[str]] = mapped_column(String, nullable=True)
    barcode: Mapped[Optional[str]] = mapped_column(String, unique=True, nullable=True)
    purchase_date: Mapped[Optional[datetime.date]] = mapped_column(Date, nullable=True)
    value: Mapped[Optional[decimal.Decimal]] = mapped_column(
        Numeric(10, 2), nullable=True
    )
    quantity: Mapped[Optional[int]] = mapped_column(Integer, nullable=True)

    category_id: Mapped[Optional[uuid.UUID]] = mapped_column(
        UUID(as_uuid=True),
        ForeignKey("categories.id", ondelete="SET NULL"),
        nullable=True
    )
    location_id: Mapped[Optional[uuid.UUID]] = mapped_column(
        UUID(as_uuid=True),
        ForeignKey("locations.id", ondelete="SET NULL"),
        nullable=True
    )
    condition_id: Mapped[Optional[uuid.UUID]] = mapped_column(
        UUID(as_uuid=True),
        ForeignKey("conditions.id", ondelete="SET NULL"),
        nullable=True
    )
    inventory_id: Mapped[uuid.UUID] = mapped_column(
        UUID(as_uuid=True),
        ForeignKey("inventories.id", ondelete="CASCADE"),
        nullable=False
    )

    category: Mapped[Optional["Category"]] = relationship(
        "Category", back_populates="items"
    )
    condition: Mapped[Optional["Condition"]] = relationship(
        "Condition", back_populates="items"
    )
    location: Mapped[Optional["Location"]] = relationship(
        "Location", back_populates="items"
    )
    inventory: Mapped["Inventory"] = relationship("Inventory", back_populates="items")
    activities: Mapped[List["Activity"]] = relationship(
        "Activity", back_populates="item", cascade="all, delete", passive_deletes=True
    )
