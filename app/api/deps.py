from fastapi import Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer
from sqlalchemy.orm import Session
from jose import JWTError

from app import crud, database, core
from app.crud.shared_inventory import get_user_inventory_role
from app.models.inventory import Inventory

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/login")


def get_current_user(
    token: str = Depends(oauth2_scheme), db: Session = Depends(database.get_db)
):
    try:
        payload = core.auth.decode_access_token(token)
        if payload is None:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid token"
            )
    except JWTError:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid token"
        )

    username = payload.get("sub")
    if username is None:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid token payload"
        )

    user = crud.user.get_user_by_username(db, username=username)
    if user is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail="User not found"
        )

    return user


def get_inventory_role_or_403(inventory_id: int, allowed_roles: list[str]):
    def dependency(
        db: Session = Depends(database.get_db),
        current_user=Depends(get_current_user),
    ):
        # Check if current user owns the inventory
        db_inventory = db.query(Inventory).filter(Inventory.id == inventory_id).first()
        if not db_inventory:
            raise HTTPException(status_code=404, detail="Inventory not found")

        if db_inventory.owner_id == current_user.id:
            return "owner"

        # Check shared access
        role_entry = get_user_inventory_role(db, current_user.id, inventory_id)
        if not role_entry or role_entry.role not in allowed_roles:
            raise HTTPException(
                status_code=403, detail="Not authorized for this inventory"
            )

        return role_entry.role

    return dependency
