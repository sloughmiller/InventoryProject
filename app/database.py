# app/database.py
import os
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from app.models.base import Base

# ✅ Read from environment variable (Render sets this)
DATABASE_URL = os.environ.get("DATABASE_URL")
if not DATABASE_URL:
    raise RuntimeError("❌ DATABASE_URL not set.")

# ✅ Render uses Postgres — don’t need sqlite connect_args
engine = create_engine(DATABASE_URL)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

# ✅ Use in routes with Depends()
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
