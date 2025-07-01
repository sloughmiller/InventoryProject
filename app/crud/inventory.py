from sqlalchemy.orm import Session
from fastapi import HTTPException
from app import models, schemas


def get_inventory(db: Session, inventory_id: int):
    return db.query(models.Inventory).filter(models.Inventory.id == inventory_id).first()


def get_user_inventories(db: Session, user_id: int):
    return db.query(models.Inventory).filter(models.Inventory.owner_id == user_id).all()


def create_inventory(db: Session, inventory: schemas.InventoryCreate):
    db_inventory = models.Inventory(
        name=inventory.name,
        owner_id=inventory.owner_id,
    )
    db.add(db_inventory)
    db.commit()
    db.refresh(db_inventory)
    return db_inventory


def update_inventory(db: Session, inventory_id: int, inventory_update: schemas.InventoryUpdate):
    db_inventory = get_inventory(db, inventory_id)
    if not db_inventory:
        raise HTTPException(status_code=404, detail="Inventory not found")

    update_data = inventory_update.dict(exclude_unset=True)
    for key, value in update_data.items():
        setattr(db_inventory, key, value)

    db.commit()
    db.refresh(db_inventory)
    return db_inventory


def delete_inventory(db: Session, inventory_id: int):
    db_inventory = get_inventory(db, inventory_id)
    if not db_inventory:
        raise HTTPException(status_code=404, detail="Inventory not found")

    db.delete(db_inventory)
    db.commit()
    return db_inventory
