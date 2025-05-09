from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app import crud, schemas, models
from app.database import get_db
from app.api.deps import get_current_user  # ✅ import auth dependency

router = APIRouter()

@router.get("/", response_model=list[schemas.Location])
def read_locations(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    return crud.location.get_locations(db, skip=skip, limit=limit)

@router.get("/{location_id}", response_model=schemas.Location)
def read_location(location_id: int, db: Session = Depends(get_db)):
    db_location = crud.location.get_location(db, location_id)
    if db_location is None:
        raise HTTPException(status_code=404, detail="Location not found")
    return db_location

@router.post("/", response_model=schemas.Location)
def create_location(
    location: schemas.LocationCreate,
    db: Session = Depends(get_db),
    current_user: models.User = Depends(get_current_user)  
):
    return crud.location.create_location(db, location)

@router.put("/{location_id}", response_model=schemas.Location)
def update_location(
    location_id: int,
    location_update: schemas.LocationUpdate,
    db: Session = Depends(get_db),
    current_user: models.User = Depends(get_current_user)  
):
    return crud.location.update_location(db, location_id, location_update)

@router.delete("/{location_id}", response_model=schemas.Location)
def delete_location(
    location_id: int,
    db: Session = Depends(get_db),
    current_user: models.User = Depends(get_current_user)  
):
    return crud.location.delete_location(db, location_id)
