from uuid import UUID
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app import crud, models, schemes
from app.database import get_db
from app.api.deps import (
    get_current_user,
    extract_inventory_id,
    require_admin_or_viewer_role,
    require_admin_role,
)

router = APIRouter()


@router.get("/", response_model=list[schemes.Activity])
def read_activities(
    inventory_id: UUID = Depends(extract_inventory_id),
    db: Session = Depends(get_db),
    _: str = Depends(require_admin_or_viewer_role),
):
    return crud.activity.get_activities(db, inventory_id)


@router.get("/{activity_id}", response_model=schemes.Activity)
def read_activity(
    activity_id: UUID,
    inventory_id: UUID = Depends(extract_inventory_id),
    db: Session = Depends(get_db),
    _: str = Depends(require_admin_or_viewer_role),
):
    db_activity = crud.activity.get_activity(db, activity_id, inventory_id)
    if db_activity is None:
        raise HTTPException(status_code=404, detail="Activity not found")
    return db_activity


@router.post("/", response_model=schemes.Activity)
def create_activity(
    activity: schemes.ActivityCreate,
    db: Session = Depends(get_db),
    current_user: models.User = Depends(get_current_user),
    _: str = Depends(require_admin_role),
):
    return crud.activity.create_activity(db, activity)


@router.put("/{activity_id}", response_model=schemes.Activity)
def update_activity(
    activity_id: UUID,
    activity_update: schemes.ActivityUpdate,
    inventory_id: UUID = Depends(extract_inventory_id),
    db: Session = Depends(get_db),
    _: str = Depends(require_admin_role),
):
    return crud.activity.update_activity(
        db, activity_id, activity_update, inventory_id
    )


@router.delete("/{activity_id}", response_model=schemes.Activity)
def delete_activity(
    activity_id: UUID,
    inventory_id: UUID = Depends(extract_inventory_id),
    db: Session = Depends(get_db),
    _: str = Depends(require_admin_role),
):
    return crud.activity.delete_activity(db, activity_id, inventory_id)
