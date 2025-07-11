from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app import crud, models, schemes
from app.database import get_db
from app.api.deps import get_current_user  # ✅ new import

router = APIRouter()

@router.get("/", response_model=list[schemes.Activity])
def read_activities(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    return crud.activity.get_activities(db, skip=skip, limit=limit)

@router.get("/{activity_id}", response_model=schemes.Activity)
def read_activity(activity_id: int, db: Session = Depends(get_db)):
    db_activity = crud.activity.get_activity(db, activity_id)
    if db_activity is None:
        raise HTTPException(status_code=404, detail="Activity not found")
    return db_activity

@router.post("/", response_model=schemes.Activity)
def create_activity(
    activity: schemes.ActivityCreate,
    db: Session = Depends(get_db),
    current_user: models.User = Depends(get_current_user) 
):
    return crud.activity.create_activity(db, activity)

@router.put("/{activity_id}", response_model=schemes.Activity)
def update_activity(
    activity_id: int,
    activity_update: schemes.ActivityUpdate,
    db: Session = Depends(get_db),
    current_user: models.User = Depends(get_current_user)
):
    return crud.activity.update_activity(db, activity_id, activity_update)

@router.delete("/{activity_id}", response_model=schemes.Activity)
def delete_activity(
    activity_id: int,
    db: Session = Depends(get_db),
    current_user: models.User = Depends(get_current_user) 
):
    return crud.activity.delete_activity(db, activity_id)
