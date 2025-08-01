from fastapi import Depends, HTTPException, status, Request
from fastapi.security import OAuth2PasswordBearer
from sqlalchemy.orm import Session
from uuid import UUID
from jose import JWTError

from app import crud, database, core
from app.crud.shared_inventory import get_user_inventory_role
from app.models.inventory import Inventory

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/auth/login")


def get_current_user(
    token: str = Depends(oauth2_scheme),
    db: Session = Depends(database.get_db),
):
    try:
        payload = core.auth.decode_access_token(token)
        if payload is None:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid token"
            )

        user_id_str = payload.get("sub")
        if user_id_str is None:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED, detail="Missing token subject"
            )

        user_id = UUID(user_id_str)

    except (JWTError, ValueError):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Could not validate credentials",
        )

    user = crud.user.get_user(db, user_id)
    if user is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail="User not found"
        )

    return user


def extract_inventory_id(request: Request) -> UUID:
    path_params = request.path_params
    query_params = dict(request.query_params)
    headers = dict(request.headers)

    raw_id = path_params.get("inventory_id") or query_params.get("inventory_id")

    if raw_id is None:
        raise HTTPException(
            status_code=400,
            detail={
                "error": "Missing required parameter: inventory_id",
                "path": request.url.path,
                "query_params": query_params,
                "path_params": path_params,
                "method": request.method,
                "headers": {
                    "authorization": headers.get("authorization"),
                    "content-type": headers.get("content-type"),
                },
            },
        )

    try:
        return UUID(raw_id)
    except ValueError:
        raise HTTPException(
            status_code=422,
            detail={
                "error": f"Invalid inventory_id: must be a UUID. Got '{raw_id}'",
                "path": request.url.path,
            },
        )


def get_inventory_role_or_403(inventory_id: UUID, allowed_roles: list[str]):
    def dependency(
        db: Session = Depends(database.get_db),
        current_user=Depends(get_current_user),
    ):
        db_inventory = db.query(Inventory).filter(Inventory.id == inventory_id).first()
        if not db_inventory:
            raise HTTPException(status_code=404, detail="Inventory not found")

        if db_inventory.owner_id == current_user.id:
            return "owner"

        role_entry = get_user_inventory_role(db, current_user.id, inventory_id)
        if not role_entry or role_entry.role not in allowed_roles:
            raise HTTPException(
                status_code=403, detail="Not authorized for this inventory"
            )

        return role_entry.role

    return dependency


def require_admin_role(
    inventory_id: UUID = Depends(extract_inventory_id),
    db: Session = Depends(database.get_db),
    current_user=Depends(get_current_user),
):
    return get_inventory_role_or_403(inventory_id, ["admin"])(db, current_user)


def require_admin_or_viewer_role(
    inventory_id: UUID = Depends(extract_inventory_id),
    db: Session = Depends(database.get_db),
    current_user=Depends(get_current_user),
):
    return get_inventory_role_or_403(inventory_id, ["admin", "viewer"])(
        db, current_user
    )
