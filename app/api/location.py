from fastapi import APIRouter, Depends, HTTPException, Response
from sqlalchemy.orm import Session
from uuid import UUID
from app import crud, schemes, models
from app.database import get_db
from app.api.deps import (
    get_current_user,
    extract_inventory_id,
    require_admin_or_viewer_role,
    require_admin_role,
)

router = APIRouter()


@router.get("/", response_model=list[schemes.Location])
def read_locations(
    inventory_id: UUID = Depends(extract_inventory_id),
    db: Session = Depends(get_db),
    _: str = Depends(require_admin_or_viewer_role),
):
    return crud.location.get_locations(db, inventory_id)


@router.get("/{location_id}", response_model=schemes.Location)
def read_location(
    location_id: UUID,
    inventory_id: UUID = Depends(extract_inventory_id),
    db: Session = Depends(get_db),
    _: str = Depends(require_admin_or_viewer_role),
):
    db_location = crud.location.get_location(db, location_id, inventory_id)
    if db_location is None:
        raise HTTPException(status_code=404, detail="Location not found")
    return db_location


@router.post("/", response_model=schemes.Location)
def create_location(
    location: schemes.LocationCreate,
    inventory_id: UUID = Depends(extract_inventory_id),
    db: Session = Depends(get_db),
    current_user: models.User = Depends(get_current_user),
    _: str = Depends(require_admin_role),
):
    print("📦 Incoming location payload:", location)
    return crud.location.create_location(db, location, inventory_id)


@router.put("/{location_id}", response_model=schemes.Location)
def update_location(
    location_id: UUID,
    location_update: schemes.LocationUpdate,
    inventory_id: UUID = Depends(extract_inventory_id),
    db: Session = Depends(get_db),
    _: str = Depends(require_admin_role),
):
    return crud.location.update_location(db, location_id, location_update, inventory_id)


@router.delete("/{location_id}", response_model=schemes.Location)
def delete_location(
    location_id: UUID,
    inventory_id: UUID = Depends(extract_inventory_id),
    db: Session = Depends(get_db),
    _: str = Depends(require_admin_role),
):
    return crud.location.delete_location(db, location_id, inventory_id)


@router.options("/")
def options_locations():
    return Response(status_code=204)
