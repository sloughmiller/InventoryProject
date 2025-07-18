from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app import crud, schemes, models
from app.database import get_db
from app.api.deps import get_current_user  # ✅ import the auth dependency

router = APIRouter()


@router.get("/", response_model=list[schemes.Category])
def read_categories(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    return crud.category.get_categories(db, skip=skip, limit=limit)


@router.get("/{category_id}", response_model=schemes.Category)
def read_category(category_id: int, db: Session = Depends(get_db)):
    db_category = crud.category.get_category(db, category_id)
    if db_category is None:
        raise HTTPException(status_code=404, detail="Category not found")
    return db_category


@router.post("/", response_model=schemes.Category)
def create_category(
    category: schemes.CategoryCreate,
    db: Session = Depends(get_db),
    current_user: models.User = Depends(get_current_user),  # ✅ protect POST
):
    return crud.category.create_category(db, category)


@router.put("/{category_id}", response_model=schemes.Category)
def update_category(
    category_id: int,
    category_update: schemes.CategoryUpdate,
    db: Session = Depends(get_db),
    current_user: models.User = Depends(get_current_user),  # ✅ protect PUT
):
    return crud.category.update_category(db, category_id, category_update)


@router.delete("/{category_id}", response_model=schemes.Category)
def delete_category(
    category_id: int,
    db: Session = Depends(get_db),
    current_user: models.User = Depends(get_current_user),  # ✅ protect DELETE
):
    return crud.category.delete_category(db, category_id)
