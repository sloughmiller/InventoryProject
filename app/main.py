from fastapi import FastAPI
from app.database import init_db
from app.api import users, items, categories, locations, conditions
from app.logger import logger

app = FastAPI()


#Include routers
app.include_router(users.router, prefix="/users", tags=["users"])
app.include_router(items.router, prefix="/items", tags=["items"])
app.include_router(categories.router, prefix="/categories", tags=["categories"])
app.include_router(locations.router, prefix="/locations", tags=["locations"])
app.include_router(conditions.router, prefix="/conditions", tags=["conditions"])


@app.on_event("startup")
def startup_event():
    logger.info("Starting up the application...")
    init_db()

@app.on_event("shutdown")
def shutdown_event():
    logger.info("Shutting down the application...")

@app.get("/")


def read_root():
    return {"message": "Home Inventory API is running"}
