from sqlalchemy.orm import Session
from app import models, schemes

def get_condition(db: Session, condition_id: int):
    return db.query(models.Condition).filter(models.Condition.id == condition_id).first()

def get_conditions(db: Session, skip: int = 0, limit: int = 100):
    return db.query(models.Condition).offset(skip).limit(limit).all()

def create_condition(db: Session, condition: schemes.ConditionCreate):
    db_condition = models.Condition(
        name=condition.name,
        description=condition.description
    )
    db.add(db_condition)
    db.commit()
    db.refresh(db_condition)
    return db_condition

def delete_condition(db: Session, condition_id: int):
    db_condition = get_condition(db, condition_id)
    if db_condition:
        db.delete(db_condition)
        db.commit()
    return db_condition

def update_condition(db: Session, condition_id: int, condition_update: schemes.ConditionUpdate):
    db_condition = get_condition(db, condition_id)
    if db_condition:
        for key, value in condition_update.dict(exclude_unset=True).items():
            setattr(db_condition, key, value)
        db.commit()
        db.refresh(db_condition)
    return db_condition
