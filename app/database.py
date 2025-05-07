from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
import os

# Load database URL from environment variable or use local SQLite as fallback
DATABASE_URL = os.getenv("DATABASE_URL", "sqlite:///./test.db")

# Set up SQLAlchemy engine and session
engine = create_engine(DATABASE_URL)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()

# Dependency for getting DB session in routes
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


# ✅ Function to initialize the database
def init_db():
    from app import models  # Import models to create tables
    Base.metadata.create_all(bind=engine)
