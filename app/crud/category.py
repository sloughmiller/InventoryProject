from sqlalchemy.orm import Session
from uuid import UUID
from app import models, schemes


def get_category(db: Session, category_id: UUID, inventory_id: UUID):
    return (
        db.query(models.Category)
        .filter(models.Category.id == category_id, models.Category.inventory_id == inventory_id)
        .first()
    )


def get_categories(db: Session, inventory_id: UUID, skip: int = 0, limit: int = 100):
    return (
        db.query(models.Category)
        .filter(models.Category.inventory_id == inventory_id)
        .offset(skip)
        .limit(limit)
        .all()
    )


def create_category(db: Session, category: schemes.CategoryCreate, inventory_id: UUID):
    db_category = models.Category(
        name=category.name,
        description=category.description,
        inventory_id=inventory_id,  # ✅ pulled from route, not schema
    )
    db.add(db_category)
    db.commit()
    db.refresh(db_category)
    return db_category


def delete_category(db: Session, category_id: UUID, inventory_id: UUID):
    db_category = get_category(db, category_id, inventory_id)
    if db_category:
        db.delete(db_category)
        db.commit()
    return db_category


def update_category(
    db: Session,
    category_id: UUID,
    category_update: schemes.CategoryUpdate,
    inventory_id: UUID,
):
    db_category = get_category(db, category_id, inventory_id)
    if db_category:
        for key, value in category_update.dict(exclude_unset=True).items():
            setattr(db_category, key, value)
        db.commit()
        db.refresh(db_category)
    return db_category
