from sqlalchemy.orm import Session
from uuid import UUID
from app import models, schemes


def get_location(db: Session, location_id: UUID, inventory_id: UUID):
    return (
        db.query(models.Location)
        .filter(
            models.Location.id == location_id,
            models.Location.inventory_id == inventory_id,
        )
        .first()
    )


def get_locations(db: Session, inventory_id: UUID, skip: int = 0, limit: int = 100):
    return (
        db.query(models.Location)
        .filter(models.Location.inventory_id == inventory_id)
        .offset(skip)
        .limit(limit)
        .all()
    )


def create_location(db: Session, location: schemes.LocationCreate, inventory_id: UUID):
    db_location = models.Location(
        name=location.name,
        description=location.description,
        inventory_id=inventory_id,  # ✅ pulled from route, not schema
    )
    db.add(db_location)
    db.commit()
    db.refresh(db_location)
    return db_location


def delete_location(db: Session, location_id: UUID, inventory_id: UUID):
    db_location = get_location(db, location_id, inventory_id)
    if db_location:
        db.delete(db_location)
        db.commit()
    return db_location


def update_location(
    db: Session,
    location_id: UUID,
    location_update: schemes.LocationUpdate,
    inventory_id: UUID,
):
    db_location = get_location(db, location_id, inventory_id)
    if db_location:
        for key, value in location_update.dict(exclude_unset=True).items():
            setattr(db_location, key, value)
        db.commit()
        db.refresh(db_location)
    return db_location
