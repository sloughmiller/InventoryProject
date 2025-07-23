from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app import crud, models, schemes
from app.database import get_db
from app.api.deps import (
    get_current_user,
    extract_inventory_id,
    require_admin_or_viewer_role,
    require_admin_role,
)

router = APIRouter()


@router.get("/", response_model=list[schemes.Category])
def read_categories(
    inventory_id: int = Depends(extract_inventory_id),
    db: Session = Depends(get_db),
    _: str = Depends(require_admin_or_viewer_role),
):
    return crud.category.get_categories(db, inventory_id)


@router.post("/", response_model=schemes.Category)
def create_category(
    category: schemes.CategoryCreate,
    inventory_id: int = Depends(extract_inventory_id),
    db: Session = Depends(get_db),
    current_user: models.User = Depends(get_current_user),
    _: str = Depends(require_admin_role),
):
    return crud.category.create_category(db, category, inventory_id)


@router.get("/{category_id}", response_model=schemes.Category)
def read_category(
    category_id: int,
    inventory_id: int = Depends(extract_inventory_id),
    db: Session = Depends(get_db),
    _: str = Depends(require_admin_or_viewer_role),
):
    db_category = crud.category.get_category(db, category_id, inventory_id)
    if db_category is None:
        raise HTTPException(status_code=404, detail="Category not found")
    return db_category




@router.put("/{category_id}", response_model=schemes.Category)
def update_category(
    category_id: int,
    category_update: schemes.CategoryUpdate,
    inventory_id: int = Depends(extract_inventory_id),
    db: Session = Depends(get_db),
    _: str = Depends(require_admin_role),
):
    return crud.category.update_category(db, category_id, category_update, inventory_id)


@router.delete("/{category_id}", response_model=schemes.Category)
def delete_category(
    category_id: int,
    inventory_id: int = Depends(extract_inventory_id),
    db: Session = Depends(get_db),
    _: str = Depends(require_admin_role),
):
    return crud.category.delete_category(db, category_id, inventory_id)
