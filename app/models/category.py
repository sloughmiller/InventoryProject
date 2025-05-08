from sqlalchemy import String, Integer, Index
from sqlalchemy.orm import Mapped, mapped_column, relationship
from typing import List, Optional
from .base import Base

class Category(Base):
    __tablename__ = 'categories'
    __table_args__ = (
        Index('ix_categories_id', 'id'),
        Index('ix_categories_name', 'name', unique=True),
    )

    id: Mapped[int] = mapped_column(primary_key=True)
    name: Mapped[str] = mapped_column(String, unique=True)
    description: Mapped[Optional[str]] = mapped_column(String, nullable=True)

    items: Mapped[List['Item']] = relationship('Item', back_populates='category', cascade='all, delete', passive_deletes=True)
