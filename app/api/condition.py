from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app import crud, schemes, models
from app.database import get_db
from app.api.deps import get_current_user  # ✅ import the auth dependency

router = APIRouter()

@router.get("/", response_model=list[schemes.Condition])
def read_conditions(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    return crud.condition.get_conditions(db, skip=skip, limit=limit)

@router.get("/{condition_id}", response_model=schemes.Condition)
def read_condition(condition_id: int, db: Session = Depends(get_db)):
    db_condition = crud.condition.get_condition(db, condition_id)
    if db_condition is None:
        raise HTTPException(status_code=404, detail="Condition not found")
    return db_condition

@router.post("/", response_model=schemes.Condition)
def create_condition(
    condition: schemes.ConditionCreate,
    db: Session = Depends(get_db),
    current_user: models.User = Depends(get_current_user) 
):
    return crud.condition.create_condition(db, condition)

@router.put("/{condition_id}", response_model=schemes.Condition)
def update_condition(
    condition_id: int,
    condition_update: schemes.ConditionUpdate,
    db: Session = Depends(get_db),
    current_user: models.User = Depends(get_current_user)  
):
    return crud.condition.update_condition(db, condition_id, condition_update)

@router.delete("/{condition_id}", response_model=schemes.Condition)
def delete_condition(
    condition_id: int,
    db: Session = Depends(get_db),
    current_user: models.User = Depends(get_current_user)  
):
    return crud.condition.delete_condition(db, condition_id)
