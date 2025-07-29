import uuid
from sqlalchemy import String, ForeignKey, Index
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import Mapped, mapped_column, relationship
from typing import List, Optional, TYPE_CHECKING
from .base import Base

if TYPE_CHECKING:
    from .item import Item
    from .inventory import Inventory


class Condition(Base):
    __tablename__ = "conditions"
    __table_args__ = (
        Index("ix_conditions_id", "id"),
        Index("ix_conditions_name", "name", unique=True),
    )

    id: Mapped[uuid.UUID] = mapped_column(
        UUID(as_uuid=True),
        primary_key=True,
        default=uuid.uuid4
    )

    name: Mapped[str] = mapped_column(String, unique=True)
    description: Mapped[Optional[str]] = mapped_column(String, nullable=True)

    inventory_id: Mapped[uuid.UUID] = mapped_column(
        UUID(as_uuid=True),
        ForeignKey('inventories.id', ondelete='CASCADE'),
        nullable=False
    )

    items: Mapped[List["Item"]] = relationship(
        "Item",
        back_populates="condition",
        cascade="all, delete",
        passive_deletes=True
    )

    inventory: Mapped["Inventory"] = relationship(
        "Inventory",
        back_populates="conditions"
    )
