from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app import crud, schemas
from app.database import get_db
from app.api.deps import get_current_user

router = APIRouter()


# Create new inventory
# api/inventory.py
@router.post("/", response_model=schemas.Inventory)
def create_inventory(
    inventory: schemas.InventoryCreate,
    db: Session = Depends(get_db),
    current_user: schemas.User = Depends(get_current_user),
):
    print("📦 Creating inventory:", inventory.name)
    try:
        created_inventory = crud.inventory.create_inventory(
            db, inventory, current_user.id
        )
        print("✅ Inventory created:", created_inventory.id)
        return created_inventory
    except Exception as e:
        print("❌ Failed to create inventory:", e)
        raise HTTPException(status_code=500, detail="Error creating inventory")


@router.get("/accessible", response_model=list[schemas.Inventory])
def get_accessible_inventories(
    db: Session = Depends(get_db),
    current_user: schemas.User = Depends(get_current_user),
):
    print(f"🔍 Fetching accessible inventories for user {current_user.username}")
    return crud.inventory.get_inventories_user_can_access(db, current_user.id)


# Get all inventories owned by current user
@router.get("/", response_model=list[schemas.Inventory])
def get_user_inventories(
    db: Session = Depends(get_db),
    current_user: schemas.User = Depends(get_current_user),
):
    print("📦 Fetching inventories for user:", current_user.username)
    return crud.inventory.get_user_inventories(db, current_user.id)


# Get one inventory by ID (if owned)
@router.get("/{inventory_id}", response_model=schemas.Inventory)
def get_inventory(
    inventory_id: int,
    db: Session = Depends(get_db),
    current_user: schemas.User = Depends(get_current_user),
):
    print(f"🔎 Getting inventory {inventory_id} for user {current_user.id}")
    db_inventory = crud.inventory.get_inventory(db, inventory_id)
    if db_inventory is None:
        raise HTTPException(status_code=404, detail="Inventory not found")
    if db_inventory.owner_id != current_user.id:
        raise HTTPException(
            status_code=403, detail="Not authorized to view this inventory"
        )
    return db_inventory


# Update inventory (only owner can)
@router.put("/{inventory_id}", response_model=schemas.Inventory)
def update_inventory(
    inventory_id: int,
    inventory_update: schemas.InventoryUpdate,
    db: Session = Depends(get_db),
    current_user: schemas.User = Depends(get_current_user),
):
    print(f"📝 Attempting update on inventory {inventory_id} by user {current_user.id}")
    db_inventory = crud.inventory.get_inventory(db, inventory_id)
    if not db_inventory:
        raise HTTPException(status_code=404, detail="Inventory not found")
    if db_inventory.owner_id != current_user.id:
        raise HTTPException(
            status_code=403, detail="Not authorized to edit this inventory"
        )
    return crud.inventory.update_inventory(db, inventory_id, inventory_update)


# Delete inventory (only owner can)
@router.delete("/{inventory_id}", response_model=schemas.Inventory)
def delete_inventory(
    inventory_id: int,
    db: Session = Depends(get_db),
    current_user: schemas.User = Depends(get_current_user),
):
    print(
        f"🗑️ Attempting deletion of inventory {inventory_id} by user {current_user.id}"
    )
    db_inventory = crud.inventory.get_inventory(db, inventory_id)
    if not db_inventory:
        raise HTTPException(status_code=404, detail="Inventory not found")
    if db_inventory.owner_id != current_user.id:
        raise HTTPException(
            status_code=403, detail="Not authorized to delete this inventory"
        )
    return crud.inventory.delete_inventory(db, inventory_id)
