from sqlalchemy.orm import Session
from uuid import UUID
from app import models, schemes


def get_activity(db: Session, activity_id: UUID, inventory_id: UUID):
    return (
        db.query(models.Activity)
        .filter(
            models.Activity.id == activity_id,
            models.Activity.inventory_id == inventory_id,
        )
        .first()
    )


def get_activities(db: Session, inventory_id: UUID, skip: int = 0, limit: int = 100):
    return (
        db.query(models.Activity)
        .filter(models.Activity.inventory_id == inventory_id)
        .offset(skip)
        .limit(limit)
        .all()
    )


def create_activity(db: Session, activity: schemes.ActivityCreate):
    db_activity = models.Activity(
        user_id=activity.user_id,
        item_id=activity.item_id,
        action=activity.action,
        details=activity.details,
        inventory_id=activity.inventory_id,
    )
    db.add(db_activity)
    db.commit()
    db.refresh(db_activity)
    return db_activity


def delete_activity(db: Session, activity_id: UUID, inventory_id: UUID):
    db_activity = get_activity(db, activity_id, inventory_id)
    if db_activity:
        db.delete(db_activity)
        db.commit()
    return db_activity


def update_activity(
    db: Session,
    activity_id: UUID,
    activity_update: schemes.ActivityUpdate,
    inventory_id: UUID,
):
    db_activity = get_activity(db, activity_id, inventory_id)
    if db_activity:
        for key, value in activity_update.dict(exclude_unset=True).items():
            setattr(db_activity, key, value)
        db.commit()
        db.refresh(db_activity)
    return db_activity
