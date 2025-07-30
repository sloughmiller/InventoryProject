from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from uuid import UUID
from typing import Optional

from app import crud, schemes, models
from app.database import get_db
from app.api.deps import get_current_user, get_inventory_role_or_403

router = APIRouter()


# ✅ GET all items for a given inventory OR all accessible items
@router.get("/", response_model=list[schemes.Item])
def read_items(
    inventory_id: Optional[UUID] = None,
    skip: int = 0,
    limit: int = 100,
    db: Session = Depends(get_db),
    current_user: models.User = Depends(get_current_user),
):
    if inventory_id is not None:
        get_inventory_role_or_403(inventory_id, ["admin", "viewer"])(db, current_user)
        return crud.item.get_items(db, inventory_id=inventory_id, skip=skip, limit=limit)
    else:
        return crud.item.get_all_accessible_items(db, user_id=current_user.id)


# ✅ GET single item by ID
@router.get("/{item_id}", response_model=schemes.Item)
def read_item(
    item_id: UUID,
    db: Session = Depends(get_db),
    current_user: models.User = Depends(get_current_user),
):
    item = db.query(models.Item).filter(models.Item.id == item_id).first()
    if item is None:
        raise HTTPException(status_code=404, detail="Item not found")

    get_inventory_role_or_403(item.inventory_id, ["admin", "viewer"])(db, current_user)
    return item


# ✅ POST a new item (inventory_id required in body)
@router.post("/", response_model=schemes.Item)
def create_item(
    item: schemes.ItemCreate,
    db: Session = Depends(get_db),
    current_user: models.User = Depends(get_current_user),
):
    get_inventory_role_or_403(item.inventory_id, ["admin", "user"])(db, current_user)
    return crud.item.create_item(db, item, inventory_id=item.inventory_id)


# ✅ PUT update item by ID
@router.put("/{item_id}", response_model=schemes.Item)
def update_item(
    item_id: UUID,
    item_update: schemes.ItemUpdate,
    db: Session = Depends(get_db),
    current_user: models.User = Depends(get_current_user),
):
    existing = db.query(models.Item).filter(models.Item.id == item_id).first()
    if existing is None:
        raise HTTPException(status_code=404, detail="Item not found")

    get_inventory_role_or_403(existing.inventory_id, ["admin"])(db, current_user)
    return crud.item.update_item(db, item_id, item_update, inventory_id=existing.inventory_id)


# ✅ DELETE item by ID
@router.delete("/{item_id}", response_model=schemes.Item)
def delete_item(
    item_id: UUID,
    db: Session = Depends(get_db),
    current_user: models.User = Depends(get_current_user),
):
    existing = db.query(models.Item).filter(models.Item.id == item_id).first()
    if existing is None:
        raise HTTPException(status_code=404, detail="Item not found")

    get_inventory_role_or_403(existing.inventory_id, ["admin"])(db, current_user)
    return crud.item.delete_item(db, item_id, inventory_id=existing.inventory_id)
