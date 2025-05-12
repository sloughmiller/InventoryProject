from sqlalchemy import String, Integer, Date, Numeric, ForeignKey, Index
from sqlalchemy.orm import Mapped, mapped_column, relationship
from typing import List, Optional
import datetime
import decimal
from .base import Base

class Item(Base):
    __tablename__ = 'items'
    __table_args__ = (
        Index('ix_items_id', 'id'),
        Index('ix_items_barcode', 'barcode', unique=True),
    )

    id: Mapped[int] = mapped_column(primary_key=True)
    name: Mapped[str] = mapped_column(String)
    description: Mapped[Optional[str]] = mapped_column(String, nullable=True)
    barcode: Mapped[Optional[str]] = mapped_column(String, unique=True, nullable=True)
    purchase_date: Mapped[Optional[datetime.date]] = mapped_column(Date, nullable=True)
    value: Mapped[Optional[decimal.Decimal]] = mapped_column(Numeric(10, 2), nullable=True)
    category_id: Mapped[Optional[int]] = mapped_column(ForeignKey('categories.id', ondelete='SET NULL'), nullable=True)
    location_id: Mapped[Optional[int]] = mapped_column(ForeignKey('locations.id', ondelete='SET NULL'), nullable=True)
    condition_id: Mapped[Optional[int]] = mapped_column(ForeignKey('conditions.id', ondelete='SET NULL'), nullable=True)
    owner_id: Mapped[Optional[int]] = mapped_column(ForeignKey('users.id', ondelete='SET NULL'), nullable=True)

    category = relationship('Category', back_populates='items')
    condition = relationship('Condition', back_populates='items')
    location = relationship('Location', back_populates='items')
    owner = relationship('User', back_populates='items')
    activities: Mapped[List['Activity']] = relationship('Activity', back_populates='item', cascade='all, delete', passive_deletes=True)
