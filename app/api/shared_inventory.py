from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app import crud, schemes
from app.database import get_db
from app.api.deps import get_current_user

router = APIRouter()


# Share inventory with another user
@router.post("/", response_model=schemes.SharedInventoryResponse)
def share_inventory(
    share: schemes.SharedInventoryCreate,
    db: Session = Depends(get_db),
    current_user: schemes.User = Depends(get_current_user),
):
    print(f"👥 User {current_user.id} sharing inventory {share.inventory_id} with user {share.user_id}")
    db_inventory = crud.inventory.get_inventory(db, share.inventory_id)
    if not db_inventory:
        raise HTTPException(status_code=404, detail="Inventory not found")
    if db_inventory.owner_id != current_user.id:
        raise HTTPException(status_code=403, detail="Only the owner can share this inventory")
    
    try:
        return crud.shared_inventory.create_shared_inventory(db, share)
    except Exception as e:
        print("❌ Failed to share inventory:", e)
        raise HTTPException(status_code=500, detail="Error sharing inventory")


# Get all shared users for an inventory (only owner can view)
@router.get("/users/{inventory_id}", response_model=list[schemes.SharedInventoryResponse])
def get_shared_users(
    inventory_id: int,
    db: Session = Depends(get_db),
    current_user: schemes.User = Depends(get_current_user),
):
    print(f"👁️ User {current_user.id} requesting shared users for inventory {inventory_id}")
    db_inventory = crud.inventory.get_inventory(db, inventory_id)
    if not db_inventory:
        raise HTTPException(status_code=404, detail="Inventory not found")
    if db_inventory.owner_id != current_user.id:
        raise HTTPException(status_code=403, detail="Only the owner can view shared users")

    return crud.shared_inventory.get_shared_users_for_inventory(db, inventory_id)


# Update a user's role in shared inventory
@router.put("/{shared_id}", response_model=schemes.SharedInventoryResponse)
def update_shared_role(
    shared_id: int,
    update_data: schemes.SharedInventoryBase,
    db: Session = Depends(get_db),
    current_user: schemes.User = Depends(get_current_user),
):
    print(f"🔄 User {current_user.id} updating role for shared_id {shared_id}")
    db_share = crud.shared_inventory.get_shared_inventory(db, shared_id)
    if not db_share:
        raise HTTPException(status_code=404, detail="Shared inventory entry not found")

    db_inventory = crud.inventory.get_inventory(db, db_share.inventory_id)
    if db_inventory.owner_id != current_user.id:
        raise HTTPException(status_code=403, detail="Only the owner can update shared roles")

    return crud.shared_inventory.update_shared_inventory(db, shared_id, update_data)


# Remove a user from shared inventory
@router.delete("/{shared_id}", response_model=schemes.SharedInventoryResponse)
def delete_shared_inventory(
    shared_id: int,
    db: Session = Depends(get_db),
    current_user: schemes.User = Depends(get_current_user),
):
    print(f"🗑️ User {current_user.id} removing shared access entry {shared_id}")
    db_share = crud.shared_inventory.get_shared_inventory(db, shared_id)
    if not db_share:
        raise HTTPException(status_code=404, detail="Shared inventory entry not found")

    db_inventory = crud.inventory.get_inventory(db, db_share.inventory_id)
    if db_inventory.owner_id != current_user.id:
        raise HTTPException(status_code=403, detail="Only the owner can remove shared users")

    return crud.shared_inventory.delete_shared_inventory(db, shared_id)
