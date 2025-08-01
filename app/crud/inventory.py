from sqlalchemy.orm import Session
from fastapi import HTTPException
from uuid import UUID
from app import models, schemes


def get_inventory(db: Session, inventory_id: UUID):
    return (
        db.query(models.Inventory).filter(models.Inventory.id == inventory_id).first()
    )


def get_user_inventories(db: Session, user_id: UUID):
    return db.query(models.Inventory).filter(models.Inventory.owner_id == user_id).all()


def create_inventory(
    db: Session, inventory_data: schemes.InventoryCreate, owner_id: UUID
):
    db_inventory = models.Inventory(
        name=inventory_data.name,
        owner_id=owner_id,
    )
    db.add(db_inventory)
    db.commit()
    db.refresh(db_inventory)
    return db_inventory


def update_inventory(
    db: Session, inventory_id: UUID, inventory_update: schemes.InventoryUpdate
):
    db_inventory = get_inventory(db, inventory_id)
    if not db_inventory:
        raise HTTPException(status_code=404, detail="Inventory not found")

    update_data = inventory_update.dict(exclude_unset=True)
    for key, value in update_data.items():
        setattr(db_inventory, key, value)

    db.commit()
    db.refresh(db_inventory)
    return db_inventory


def delete_inventory(db: Session, inventory_id: UUID):
    db_inventory = get_inventory(db, inventory_id)
    if not db_inventory:
        raise HTTPException(status_code=404, detail="Inventory not found")

    db.delete(db_inventory)
    db.commit()
    return db_inventory


def get_inventories_user_can_access(db: Session, user_id: UUID):
    owned = (
        db.query(models.Inventory).filter(models.Inventory.owner_id == user_id).all()
    )

    shared_links = (
        db.query(models.SharedInventory)
        .filter(models.SharedInventory.user_id == user_id)
        .all()
    )

    shared = [link.inventory for link in shared_links if link.inventory is not None]

    return owned + shared
