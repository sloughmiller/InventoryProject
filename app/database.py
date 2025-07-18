from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from app.core.config import settings
from app.models.base import Base  # ✅ FIX: import Base from models.base

DATABASE_URL = settings.database_url

engine = create_engine(
    DATABASE_URL,
    connect_args=(
        {"check_same_thread": False} if DATABASE_URL.startswith("sqlite") else {}
    ),
)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


def init_db():
    from app import models  # Ensures all models are registered with Base

    # ⚠️ Drop all tables — destructive operation!
    Base.metadata.drop_all(bind=engine)
    print("🧨 All tables dropped.")

    # ✅ Recreate all tables based on current models
    Base.metadata.create_all(bind=engine)
    print("✅ All tables created.")
