from fastapi import FastAPI, Request, Response
from fastapi.middleware.cors import CORSMiddleware
from contextlib import asynccontextmanager
from fastapi.responses import JSONResponse
from fastapi.exceptions import RequestValidationError
from starlette.exceptions import HTTPException as StarletteHTTPException

from app.database import get_db, SessionLocal
from app.core.auth import hash_password
from app import crud, schemes
from app.core.logger import logger
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
    auth,
)

import logging


@asynccontextmanager
async def lifespan(app: FastAPI):
    logger.info("🚀 Starting up the application...")
    # init_db()
    seed_admin_user()
    yield
    logger.info("🛑 Shutting down the application...")


app = FastAPI(
    lifespan=lifespan,
    docs_url="/docs",
    redoc_url="/redoc",
    openapi_url="/openapi.json",
)


@app.middleware("http")
async def add_vary_header(request: Request, call_next):
    response = await call_next(request)
    response.headers["Vary"] = "Origin"
    return response


@app.exception_handler(Exception)
async def generic_exception_handler(request: Request, exc: Exception):
    logger.exception(f"🔥 Unhandled exception: {exc}")
    return JSONResponse(status_code=500, content={"detail": "Internal server error"})


@app.exception_handler(StarletteHTTPException)
async def http_exception_handler(request: Request, exc: StarletteHTTPException):
    return JSONResponse(status_code=exc.status_code, content={"detail": exc.detail})


@app.exception_handler(RequestValidationError)
async def validation_exception_handler(request: Request, exc: RequestValidationError):
    return JSONResponse(status_code=422, content={"detail": exc.errors()})


@app.options("/{full_path:path}")
async def preflight_handler(full_path: str):
    logger.debug(f"🌐 Handling CORS preflight for: {full_path}")
    return Response(status_code=204)


origins = [
    "https://sloughmiller-inventoryproject.netlify.app",
    "http://localhost:5173",
    "https://localhost:5173",
    "http://192.168.1.21:5173",
    "https://192.168.1.21:5173",
]

# ✅ Apply CORS middleware early
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# ✅ Middleware to log every request
@app.middleware("http")
async def log_requests(request: Request, call_next):
    logger.info(f"🔁 Incoming request: {request.method} {request.url}")
    try:
        response = await call_next(request)
        logger.info(
            f"✅ Response: {response.status_code} for {request.method} {request.url}"
        )
        return response
    except Exception as e:
        logger.exception(f"❌ Exception during request: {e}")
        raise


# ✅ Include API routers
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
    try:
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
    finally:
        db.close()


# For dev-only execution
if __name__ == "__main__":
    # init_db()
    seed_admin_user()
    print("Database tables created successfully.")
