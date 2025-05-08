from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app import crud, models, schemas
from app.database import get_db

router = APIRouter()

@router.get("/", response_model=list[schemas.Activity])
def read_activities(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    return crud.activity.get_activities(db, skip=skip, limit=limit)

@router.get("/{activity_id}", response_model=schemas.Activity)
def read_activity(activity_id: int, db: Session = Depends(get_db)):
    db_activity = crud.activity.get_activity(db, activity_id)
    if db_activity is None:
        raise HTTPException(status_code=404, detail="Activity not found")
    return db_activity

@router.post("/", response_model=schemas.Activity)
def create_activity(activity: schemas.ActivityCreate, db: Session = Depends(get_db)):
    return crud.activity.create_activity(db, activity)

@router.put("/{activity_id}", response_model=schemas.Activity)
def update_activity(activity_id: int, activity_update: schemas.ActivityUpdate, db: Session = Depends(get_db)):
    return crud.activity.update_activity(db, activity_id, activity_update)

@router.delete("/{activity_id}", response_model=schemas.Activity)
def delete_activity(activity_id: int, db: Session = Depends(get_db)):
    return crud.activity.delete_activity(db, activity_id)
