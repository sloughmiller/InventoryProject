from sqlalchemy.orm import Session
from app import models, schemas

def get_location(db: Session, location_id: int):
    return db.query(models.Location).filter(models.Location.id == location_id).first()

def get_locations(db: Session, skip: int = 0, limit: int = 100):
    return db.query(models.Location).offset(skip).limit(limit).all()

def create_location(db: Session, location: schemas.LocationCreate):
    db_location = models.Location(
        name=location.name,
        description=location.description
    )
    db.add(db_location)
    db.commit()
    db.refresh(db_location)
    return db_location

def delete_location(db: Session, location_id: int):
    db_location = get_location(db, location_id)
    if db_location:
        db.delete(db_location)
        db.commit()
    return db_location

def update_location(db: Session, location_id: int, location_update: schemas.LocationUpdate):
    db_location = get_location(db, location_id)
    if db_location:
        for key, value in location_update.dict(exclude_unset=True).items():
            setattr(db_location, key, value)
        db.commit()
        db.refresh(db_location)
    return db_location
