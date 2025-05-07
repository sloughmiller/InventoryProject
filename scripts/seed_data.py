import sys
import os

# Add project root to Python path
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from app.database import SessionLocal, init_db
from app import models

def seed_data():
    db = SessionLocal()

    # Create demo users
    user1 = models.User(username="johndoe", email="john@example.com", hashed_password="hashed_john")
    user2 = models.User(username="janedoe", email="jane@example.com", hashed_password="hashed_jane")
    db.add_all([user1, user2])

    # Create categories
    cat1 = models.Category(name="Tools", description="Hand and power tools")
    cat2 = models.Category(name="Electronics", description="Electronic devices and gadgets")
    db.add_all([cat1, cat2])

    # Create locations
    loc1 = models.Location(name="Garage", description="Main house garage")
    loc2 = models.Location(name="Basement", description="Storage basement")
    db.add_all([loc1, loc2])

    # Create conditions
    cond1 = models.Condition(name="New", description="Brand new item")
    cond2 = models.Condition(name="Used", description="Previously used item")
    db.add_all([cond1, cond2])

    db.commit()

    # Create items
    item1 = models.Item(
        name="Cordless Drill",
        description="18V cordless drill",
        barcode="123456789",
        value=99.99,
        category_id=cat1.id,
        location_id=loc1.id,
        condition_id=cond1.id,
        owner_id=user1.id,
    )
    item2 = models.Item(
        name="Laptop",
        description="Dell XPS 13",
        barcode="987654321",
        value=1299.99,
        category_id=cat2.id,
        location_id=loc2.id,
        condition_id=cond2.id,
        owner_id=user2.id,
    )
    db.add_all([item1, item2])

    db.commit()
    db.close()

    print("✅ Seed data inserted successfully!")

if __name__ == "__main__":
    init_db()
    seed_data()
