from sqlalchemy import String, Integer, Boolean, Index
from sqlalchemy.orm import Mapped, mapped_column, relationship
from typing import List, Optional
from .base import Base

class User(Base):
    __tablename__ = 'users'
    __table_args__ = (
        Index('ix_users_id', 'id'),
        Index('ix_users_username', 'username', unique=True),
        Index('ix_users_email', 'email', unique=True),
    )

    id: Mapped[int] = mapped_column(primary_key=True)
    username: Mapped[str] = mapped_column(String, unique=True)
    email: Mapped[str] = mapped_column(String, unique=True)
    hashed_password: Mapped[str] = mapped_column(String)
    is_active: Mapped[Optional[bool]] = mapped_column(Boolean, default=True)
    is_superuser: Mapped[Optional[bool]] = mapped_column(Boolean, default=False)

    items: Mapped[List['Item']] = relationship('Item', back_populates='owner', cascade='all, delete', passive_deletes=True)
    activities: Mapped[List['Activity']] = relationship('Activity', back_populates='user', cascade='all, delete', passive_deletes=True)
