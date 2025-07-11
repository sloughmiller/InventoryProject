from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app import crud, schemes, models
from app.database import get_db
from app.api.deps import get_current_user, get_inventory_role_or_403
from typing import Optional

router = APIRouter()

# View all items in an inventory → requires admin or viewer
@router.get("/", response_model=list[schemes.Item])
def read_items(
    inventory_id: Optional[int] = None,
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


# View a single item → requires admin or viewer
@router.get("/{item_id}", response_model=schemes.Item)
def read_item(
    item_id: int,
    db: Session = Depends(get_db),
    current_user: models.User = Depends(get_current_user),
):
    item = crud.item.get_item(db, item_id)
    if item is None:
        raise HTTPException(status_code=404, detail="Item not found")

    get_inventory_role_or_403(item.inventory_id, ["admin", "viewer"])(db, current_user)
    return item


# Create an item → requires admin
@router.post("/", response_model=schemes.Item)
def create_item(
    item: schemes.ItemCreate,
    inventory_id: int,
    db: Session = Depends(get_db),
    current_user: models.User = Depends(get_current_user),
):
    get_inventory_role_or_403(inventory_id, ["admin"])(db, current_user)
    return crud.item.create_item(db, item, inventory_id=inventory_id)


# Update an item → requires admin
@router.put("/{item_id}", response_model=schemes.Item)
def update_item(
    item_id: int,
    item_update: schemes.ItemUpdate,
    db: Session = Depends(get_db),
    current_user: models.User = Depends(get_current_user),
):
    item = crud.item.get_item(db, item_id)
    if item is None:
        raise HTTPException(status_code=404, detail="Item not found")

    get_inventory_role_or_403(item.inventory_id, ["admin"])(db, current_user)
    return crud.item.update_item(db, item_id, item_update)


# Delete an item → requires admin
@router.delete("/{item_id}", response_model=schemes.Item)
def delete_item(
    item_id: int,
    db: Session = Depends(get_db),
    current_user: models.User = Depends(get_current_user),
):
    item = crud.item.get_item(db, item_id)
    if item is None:
        raise HTTPException(status_code=404, detail="Item not found")

    get_inventory_role_or_403(item.inventory_id, ["admin"])(db, current_user)
    return crud.item.delete_item(db, item_id)
