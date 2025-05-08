from fastapi import FastAPI
from app.database import get_db, init_db
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

if __name__ == "__main__":
    init_db()
    print("Database tables created successfully.")
