from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app import crud, schemas, models
from app.database import get_db
from app.api.deps import get_current_user, get_inventory_role_or_403, require_admin_role

router = APIRouter()


# View all items in an inventory → requires admin or viewer
@router.get("/", response_model=list[schemas.Item])
def read_items(
    inventory_id: int,
    skip: int = 0,
    limit: int = 100,
    db: Session = Depends(get_db),
    current_user: models.User = Depends(get_current_user),
    role: str = Depends(require_admin_role),
):
    return crud.item.get_items(db, inventory_id=inventory_id, skip=skip, limit=limit)


# View a single item → requires admin or viewer
@router.get("/{item_id}", response_model=schemas.Item)
def read_item(
    item_id: int,
    db: Session = Depends(get_db),
    current_user: models.User = Depends(get_current_user),
):
    item = crud.item.get_item(db, item_id)
    if item is None:
        raise HTTPException(status_code=404, detail="Item not found")

    # Permission check via inventory_id on the item
    get_inventory_role_or_403(item.inventory_id, ["admin", "viewer"])(db, current_user)

    return item


# Create an item → requires admin
@router.post("/", response_model=schemas.Item)
def create_item(
    item: schemas.ItemCreate,
    inventory_id: int,
    db: Session = Depends(get_db),
    current_user: models.User = Depends(get_current_user),
    role: str = Depends(require_admin_role),
):
    return crud.item.create_item(db, item, inventory_id=inventory_id)


# Update an item → requires admin
@router.put("/{item_id}", response_model=schemas.Item)
def update_item(
    item_id: int,
    item_update: schemas.ItemUpdate,
    db: Session = Depends(get_db),
    current_user: models.User = Depends(get_current_user),
):
    item = crud.item.get_item(db, item_id)
    if item is None:
        raise HTTPException(status_code=404, detail="Item not found")

    get_inventory_role_or_403(item.inventory_id, ["admin"])(db, current_user)
    return crud.item.update_item(db, item_id, item_update)


# Delete an item → requires admin
@router.delete("/{item_id}", response_model=schemas.Item)
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
