from fastapi import FastAPI, Request
from app.database import get_db, init_db, SessionLocal
from app.core.auth import hash_password
from app import crud, schemes
from app.api import (
    activity,
    category,
    condition,
    item,
    location,
    user,
    health,
    inventory,
    shared_inventory,
)
from app.core.logger import logger
from contextlib import asynccontextmanager
from app.api import auth
from fastapi.middleware.cors import CORSMiddleware

import logging


@asynccontextmanager
async def lifespan(app: FastAPI):
    logger.info("🚀 Starting up the application...")
    init_db()
    seed_admin_user()
    yield
    logger.info("🛑 Shutting down the application...")


app = FastAPI(
    lifespan=lifespan,
    docs_url="/docs",  # Swagger UI
    redoc_url="/redoc",  # Optional alternative UI
    openapi_url="/openapi.json",  # OpenAPI schema
)


app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "https://localhost:5173",
        "http://192.168.1.21:5173",
        "https://192.168.1.21:5173",
        "https://sloughmiller-inventoryproject.netlify.app",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# ✅ Moved below app declaration
@app.middleware("http")
async def log_requests(request: Request, call_next):
    logger.info(f"🔁 {request.method} {request.url.path}")
    response = await call_next(request)
    return response


# Include routers
app.include_router(activity.router, prefix="/activities", tags=["activities"])
app.include_router(category.router, prefix="/categories", tags=["categories"])
app.include_router(condition.router, prefix="/conditions", tags=["conditions"])
app.include_router(item.router, prefix="/items", tags=["items"])
app.include_router(location.router, prefix="/locations", tags=["locations"])
app.include_router(user.router, prefix="/users", tags=["users"])
app.include_router(inventory.router, prefix="/inventories", tags=["inventories"])
app.include_router(
    shared_inventory.router, prefix="/shared-inventories", tags=["shared-inventories"]
)
app.include_router(health.router, tags=["Health"])
app.include_router(auth.router, prefix="/auth", tags=["auth"])


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
        admin_user = schemes.UserCreate(
            username=admin_username,
            email=admin_email,
            password=admin_password,
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
