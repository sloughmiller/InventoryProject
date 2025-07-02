from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app import crud, schemas, models
from app.database import get_db
from app.api.deps import get_current_user

router = APIRouter()

@router.get("/", response_model=list[schemas.Item])
def read_items(
    inventory_id: int,
    skip: int = 0,
    limit: int = 100,
    db: Session = Depends(get_db),
    current_user: models.User = Depends(get_current_user),
):
    # Optionally validate the user owns the inventory
    inventory = db.query(models.Inventory).filter_by(id=inventory_id, owner_id=current_user.id).first()
    if inventory is None:
        raise HTTPException(status_code=404, detail="Inventory not found")
    return crud.item.get_items(db, inventory_id=inventory_id, skip=skip, limit=limit)

@router.get("/{item_id}", response_model=schemas.Item)
def read_item(
    item_id: int,
    db: Session = Depends(get_db),
    current_user: models.User = Depends(get_current_user),
):
    item = crud.item.get_item(db, item_id)
    if item is None:
        raise HTTPException(status_code=404, detail="Item not found")
    # Optional: verify ownership
    if item.inventory.owner_id != current_user.id:
        raise HTTPException(status_code=403, detail="Forbidden")
    return item

@router.post("/", response_model=schemas.Item)
def create_item(
    item: schemas.ItemCreate,
    inventory_id: int,
    db: Session = Depends(get_db),
    current_user: models.User = Depends(get_current_user),
):
    # Validate inventory belongs to current user
    inventory = db.query(models.Inventory).filter_by(id=inventory_id, owner_id=current_user.id).first()
    if inventory is None:
        raise HTTPException(status_code=404, detail="Inventory not found")
    return crud.item.create_item(db, item, inventory_id=inventory_id)

@router.put("/{item_id}", response_model=schemas.Item)
def update_item(
    item_id: int,
    item_update: schemas.ItemUpdate,
    db: Session = Depends(get_db),
    current_user: models.User = Depends(get_current_user),
):
    item = crud.item.get_item(db, item_id)
    if item is None or item.inventory.owner_id != current_user.id:
        raise HTTPException(status_code=404, detail="Item not found or forbidden")
    return crud.item.update_item(db, item_id, item_update)

@router.delete("/{item_id}", response_model=schemas.Item)
def delete_item(
    item_id: int,
    db: Session = Depends(get_db),
    current_user: models.User = Depends(get_current_user),
):
    item = crud.item.get_item(db, item_id)
    if item is None or item.inventory.owner_id != current_user.id:
        raise HTTPException(status_code=404, detail="Item not found or forbidden")
    return crud.item.delete_item(db, item_id)
