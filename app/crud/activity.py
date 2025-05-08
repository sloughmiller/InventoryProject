from sqlalchemy.orm import Session
from app import models, schemas

def get_activity(db: Session, activity_id: int):
    return db.query(models.Activity).filter(models.Activity.id == activity_id).first()

def get_activities(db: Session, skip: int = 0, limit: int = 100):
    return db.query(models.Activity).offset(skip).limit(limit).all()

def create_activity(db: Session, activity: schemas.ActivityCreate):
    db_activity = models.Activity(
        user_id=activity.user_id,
        activity_type=activity.activity_type,
        description=activity.description,
    )
    db.add(db_activity)
    db.commit()
    db.refresh(db_activity)
    return db_activity

def delete_activity(db: Session, activity_id: int):
    db_activity = get_activity(db, activity_id)
    if db_activity:
        db.delete(db_activity)
        db.commit()
    return db_activity

def update_activity(db: Session, activity_id: int, activity_update: schemas.ActivityUpdate):
    db_activity = get_activity(db, activity_id)
    if db_activity:
        for key, value in activity_update.dict(exclude_unset=True).items():
            setattr(db_activity, key, value)
        db.commit()
        db.refresh(db_activity)
    return db_activity
