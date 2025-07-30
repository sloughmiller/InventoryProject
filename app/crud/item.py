from sqlalchemy.orm import Session
from uuid import UUID
from app import models, schemes


# 🔍 Get a single item by ID, scoped by inventory
def get_item(db: Session, item_id: UUID, inventory_id: UUID) -> models.Item | None:
    return (
        db.query(models.Item)
        .filter(
            models.Item.id == item_id,
            models.Item.inventory_id == inventory_id
        )
        .first()
    )


# 📦 Get all items for a specific inventory
def get_items(
    db: Session,
    inventory_id: UUID,
    skip: int = 0,
    limit: int = 100
) -> list[models.Item]:
    return (
        db.query(models.Item)
        .filter(models.Item.inventory_id == inventory_id)
        .offset(skip)
        .limit(limit)
        .all()
    )


# 🔐 Get all items from inventories shared with the user
def get_all_accessible_items(db: Session, user_id: UUID) -> list[models.Item]:
    return (
        db.query(models.Item)
        .join(
            models.SharedInventory,
            models.Item.inventory_id == models.SharedInventory.inventory_id
        )
        .filter(models.SharedInventory.user_id == user_id)
        .all()
    )


# ✅ Create a new item (enforcing scoped inventory)
def create_item(
    db: Session,
    item: schemes.ItemCreate,
    inventory_id: UUID
) -> models.Item:
    item_data = item.dict(exclude={"inventory_id"})
    db_item = models.Item(**item_data, inventory_id=inventory_id)
    db.add(db_item)
    db.commit()
    db.refresh(db_item)
    return db_item


# ❌ Delete an item (scoped to inventory)
def delete_item(
    db: Session,
    item_id: UUID,
    inventory_id: UUID
) -> models.Item | None:
    db_item = get_item(db, item_id, inventory_id)
    if db_item:
        db.delete(db_item)
        db.commit()
    return db_item


# ✏️ Update an item (scoped, excludes inventory_id)
def update_item(
    db: Session,
    item_id: UUID,
    item_update: schemes.ItemUpdate,
    inventory_id: UUID
) -> models.Item | None:
    db_item = get_item(db, item_id, inventory_id)
    if db_item:
        for key, value in item_update.dict(exclude_unset=True).items():
            setattr(db_item, key, value)
        db.commit()
        db.refresh(db_item)
    return db_item
