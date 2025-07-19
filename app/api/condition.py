from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app import crud, schemes, models
from app.database import get_db
from app.api.deps import (
    get_current_user,
    extract_inventory_id,
    require_admin_or_viewer_role,
    require_admin_role,
)

router = APIRouter()


@router.get("/", response_model=list[schemes.Condition])
def read_conditions(
    inventory_id: int = Depends(extract_inventory_id),
    db: Session = Depends(get_db),
    _: str = Depends(require_admin_or_viewer_role),
):
    return crud.condition.get_conditions(db, inventory_id)


@router.get("/{condition_id}", response_model=schemes.Condition)
def read_condition(
    condition_id: int,
    inventory_id: int = Depends(extract_inventory_id),
    db: Session = Depends(get_db),
    _: str = Depends(require_admin_or_viewer_role),
):
    db_condition = crud.condition.get_condition(db, condition_id, inventory_id)
    if db_condition is None:
        raise HTTPException(status_code=404, detail="Condition not found")
    return db_condition


@router.post("/", response_model=schemes.Condition)
def create_condition(
    condition: schemes.ConditionCreate,
    db: Session = Depends(get_db),
    current_user: models.User = Depends(get_current_user),
    _: str = Depends(require_admin_role),
):
    return crud.condition.create_condition(db, condition)


@router.put("/{condition_id}", response_model=schemes.Condition)
def update_condition(
    condition_id: int,
    condition_update: schemes.ConditionUpdate,
    inventory_id: int = Depends(extract_inventory_id),
    db: Session = Depends(get_db),
    _: str = Depends(require_admin_role),
):
    return crud.condition.update_condition(
        db, condition_id, condition_update, inventory_id
    )


@router.delete("/{condition_id}", response_model=schemes.Condition)
def delete_condition(
    condition_id: int,
    inventory_id: int = Depends(extract_inventory_id),
    db: Session = Depends(get_db),
    _: str = Depends(require_admin_role),
):
    return crud.condition.delete_condition(db, condition_id, inventory_id)
