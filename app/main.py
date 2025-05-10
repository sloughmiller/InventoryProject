from fastapi import FastAPI
from app.database import get_db, init_db, SessionLocal
from app.core.auth import hash_password
from app import crud, schemas
from app.api import activity, category, condition, item, location, user
from app.core.logger import logger
from contextlib import asynccontextmanager

@asynccontextmanager
async def lifespan(app: FastAPI):
    logger.info("Starting up the application...")
    init_db()
    yield
    logger.info("Shutting down the application...")

app = FastAPI(lifespan=lifespan)

# Include routers
app.include_router(activity.router, prefix="/activities", tags=["activities"])
app.include_router(category.router, prefix="/categories", tags=["categories"])
app.include_router(condition.router, prefix="/conditions", tags=["conditions"])
app.include_router(item.router, prefix="/items", tags=["items"])
app.include_router(location.router, prefix="/locations", tags=["locations"])
app.include_router(user.router, prefix="/users", tags=["users"])

@app.get("/")
def read_root():
    return {"message": "Home Inventory API is running"}

def seed_admin_user():
    db = SessionLocal()
    admin_username = "admin"
    admin_email = "admin@example.com"
    admin_password = "adminpass"
    
    existing_user = crud.user.get_user_by_username(db, admin_username)
    if not existing_user:
        admin_user = schemas.UserCreate(
            username=admin_username,
            email=admin_email,
            password=hash_password(admin_password),
        )
        crud.user.create_user(db, admin_user)
        logger.info("✅ Admin user created: admin/adminpass")
    else:
        logger.info("✅ Admin user already exists")
    db.close()

if __name__ == "__main__":
    init_db()
    seed_admin_user()
    print("Database tables created successfully.")
