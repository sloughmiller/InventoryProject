from sqlalchemy import String, Integer, ForeignKey, Index
from sqlalchemy.orm import Mapped, mapped_column, relationship
from typing import List, TYPE_CHECKING
from .base import Base

if TYPE_CHECKING:
    from .user import User
    from .item import Item
    from .shared_inventory import SharedInventory

class Inventory(Base):
    __tablename__ = 'inventories'
    __table_args__ = (
        Index('ix_inventories_id', 'id'),
        Index('ix_inventories_name', 'name'),
    )

    id: Mapped[int] = mapped_column(primary_key=True)
    name: Mapped[str] = mapped_column(String, nullable=False)
    owner_id: Mapped[int] = mapped_column(ForeignKey('users.id', ondelete='CASCADE'), nullable=False)

    # Relationships
    owner: Mapped['User'] = relationship('User', back_populates='inventories')
    items: Mapped[List['Item']] = relationship('Item', back_populates='inventory', cascade='all, delete', passive_deletes=True)
    shared_users: Mapped[List['SharedInventory']] = relationship('SharedInventory', back_populates='inventory', cascade='all, delete', passive_deletes=True)
