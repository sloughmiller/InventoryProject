from sqlalchemy.orm import Session
from app import models, schemas

def get_item(db: Session, item_id: int):
    return db.query(models.Item).filter(models.Item.id == item_id).first()

def get_items(db: Session, skip: int = 0, limit: int = 100):
    return db.query(models.Item).offset(skip).limit(limit).all()

def create_item(db: Session, item: schemas.ItemCreate):
    db_item = models.Item(
        name=item.name,
        description=item.description,
        barcode=item.barcode,
        value=item.value,
        quantity=item.quantity,
        category_id=item.category_id,
        location_id=item.location_id,
        condition_id=item.condition_id,
        owner_id=item.owner_id
    )
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
