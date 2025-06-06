from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app import crud, schemas, models
from app.database import get_db
from app.api.deps import get_current_user  # ✅ import auth dependency

router = APIRouter()


@router.get("/", response_model=list[schemas.Item])
def read_items(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    return crud.item.get_items(db, skip=skip, limit=limit)


@router.get("/{item_id}", response_model=schemas.Item)
def read_item(item_id: int, db: Session = Depends(get_db)):
    db_item = crud.item.get_item(db, item_id)
    if db_item is None:
        raise HTTPException(status_code=404, detail="Item not found")
    return db_item


@router.post("/", response_model=schemas.Item)
def create_item(
    item: schemas.ItemCreate,
    db: Session = Depends(get_db),
    current_user: models.User = Depends(get_current_user),
):
    item_data = item.dict()
    item_data["owner_id"] = current_user.id
    return crud.item.create_item(db, schemas.ItemCreate(**item_data))


@router.put("/{item_id}", response_model=schemas.Item)
def update_item(
    item_id: int,
    item_update: schemas.ItemUpdate,
    db: Session = Depends(get_db),
    current_user: models.User = Depends(get_current_user),
):
    return crud.item.update_item(db, item_id, item_update)


@router.delete("/{item_id}", response_model=schemas.Item)
def delete_item(
    item_id: int,
    db: Session = Depends(get_db),
    current_user: models.User = Depends(get_current_user),
):
    return crud.item.delete_item(db, item_id)
