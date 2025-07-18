from sqlalchemy import String, Integer, ForeignKey, Index, text
from sqlalchemy.orm import Mapped, mapped_column, relationship
from typing import Optional, TYPE_CHECKING
from .base import Base

if TYPE_CHECKING:
    from .user import User
    from .item import Item
    from .inventory import Inventory

class Activity(Base):
    __tablename__ = "activities"
    __table_args__ = (
        Index("ix_activities_id", "id"),
    )

    id: Mapped[int] = mapped_column(primary_key=True)
    action: Mapped[str] = mapped_column(String)
    
    user_id: Mapped[int] = mapped_column(ForeignKey("users.id", ondelete="CASCADE"))
    item_id: Mapped[int] = mapped_column(ForeignKey("items.id", ondelete="CASCADE"))
    inventory_id: Mapped[int] = mapped_column(ForeignKey("inventories.id", ondelete="CASCADE"), nullable=False)
    
    details: Mapped[Optional[str]] = mapped_column(String, nullable=True)
    created_at: Mapped[str] = mapped_column(String, server_default=text("CURRENT_TIMESTAMP"))

    user: Mapped["User"] = relationship("User", back_populates="activities")
    item: Mapped["Item"] = relationship("Item", back_populates="activities")
    inventory: Mapped["Inventory"] = relationship("Inventory", back_populates="activities")
