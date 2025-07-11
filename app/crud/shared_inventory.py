from sqlalchemy.orm import Session
from fastapi import HTTPException
from app import models, schemes


def get_shared_inventory(db: Session, shared_id: int):
    return db.query(models.SharedInventory).filter(models.SharedInventory.id == shared_id).first()


def get_shared_users_for_inventory(db: Session, inventory_id: int):
    return (
        db.query(models.SharedInventory)
        .filter(models.SharedInventory.inventory_id == inventory_id)
        .all()
    )


def get_user_inventory_role(db: Session, user_id: int, inventory_id: int):
    return (
        db.query(models.SharedInventory)
        .filter(
            models.SharedInventory.user_id == user_id,
            models.SharedInventory.inventory_id == inventory_id,
        )
        .first()
    )


def create_shared_inventory(db: Session, share: schemes.SharedInventoryCreate):
    existing = get_user_inventory_role(db, share.user_id, share.inventory_id)
    if existing:
        raise HTTPException(status_code=400, detail="User already has access to this inventory")

    db_share = models.SharedInventory(
        user_id=share.user_id,
        inventory_id=share.inventory_id,
        role=share.role,
    )
    db.add(db_share)
    db.commit()
    db.refresh(db_share)
    return db_share


def update_shared_inventory(
    db: Session,
    shared_id: int,
    update_data: schemes.SharedInventoryBase,
):
    db_share = get_shared_inventory(db, shared_id)
    if not db_share:
        raise HTTPException(status_code=404, detail="Shared inventory entry not found")

    db_share.role = update_data.role
    db.commit()
    db.refresh(db_share)
    return db_share


def delete_shared_inventory(db: Session, shared_id: int):
    db_share = get_shared_inventory(db, shared_id)
    if not db_share:
        raise HTTPException(status_code=404, detail="Shared inventory entry not found")

    db.delete(db_share)
    db.commit()
    return db_share
