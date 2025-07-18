# scripts/reset_db.py
from app.database import init_db

if __name__ == "__main__":
    init_db()
    print("✅ Database reset and tables recreated successfully!")
