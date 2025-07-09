from sqlalchemy.orm import Session
from app import models, schemas


def get_item(db: Session, item_id: int):
    return db.query(models.Item).filter(models.Item.id == item_id).first()


def get_items(db: Session, inventory_id: int, skip: int = 0, limit: int = 100):
    return (
        db.query(models.Item)
        .filter(models.Item.inventory_id == inventory_id)
        .offset(skip)
        .limit(limit)
        .all()
    )


def get_all_accessible_items(db: Session, user_id: int) -> list[models.Item]:
    return (
        db.query(models.Item)
        .join(
            models.SharedInventory,
            models.Item.inventory_id == models.SharedInventory.inventory_id,
        )
        .filter(models.SharedInventory.user_id == user_id)
        .all()
    )


def create_item(db: Session, item: schemas.ItemCreate, inventory_id: int):
    db_item = models.Item(**item.dict(), inventory_id=inventory_id)
    db.add(db_item)
    db.commit()
    db.refresh(db_item)
    return db_item


def delete_item(db: Session, item_id: int):
    db_item = get_item(db, item_id)
    if db_item:
        db.delete(db_item)
        db.commit()
    return db_item


def update_item(db: Session, item_id: int, item_update: schemas.ItemUpdate):
    db_item = get_item(db, item_id)
    if db_item:
        for key, value in item_update.dict(exclude_unset=True).items():
            setattr(db_item, key, value)
        db.commit()
        db.refresh(db_item)
    return db_item
