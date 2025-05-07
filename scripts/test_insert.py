from app.database import SessionLocal, init_db
from app.models.user import User

init_db()
db = SessionLocal()

new_user = User(username="testuser", email="test@example.com", hashed_password="test123")
db.add(new_user)
db.commit()
db.refresh(new_user)

print(f"✅ Inserted user with ID: {new_user.id}")
db.close()
