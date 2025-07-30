from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from fastapi.security import OAuth2PasswordRequestForm
from uuid import UUID

from app import crud, schemes
from app.database import get_db
from app.api.deps import get_current_user
from app.core.auth import hash_password, verify_password, create_access_token

import logging

logger = logging.getLogger(__name__)

router = APIRouter()


# Create user
@router.post("/", response_model=schemes.User)
def create_user(user: schemes.UserCreate, db: Session = Depends(get_db)):
    print("🧾 Incoming signup request:", user.dict())
    try:
        created_user = crud.user.create_user(db, user)
        print("✅ User created successfully:", created_user.username)
        return created_user
    except HTTPException as e:
        print(f"❌ HTTPException during signup: {e.detail}")
        raise e
    except Exception as e:
        print("❌ Unexpected error during signup:", e)
        raise HTTPException(status_code=500, detail="Internal server error")


# Login
@router.post("/login")
def login(
    form_data: OAuth2PasswordRequestForm = Depends(),
    db: Session = Depends(get_db),
):
    logger.info("🔐 Login attempt: %s", form_data.username)
    db_user = crud.user.get_user_by_username(db, username=form_data.username)

    if not db_user:
        logger.warning("❌ User not found: %s", form_data.username)
        raise HTTPException(status_code=401, detail="Invalid username or password")

    if not verify_password(form_data.password, db_user.hashed_password):
        logger.warning("❌ Password mismatch for user: %s", form_data.username)
        raise HTTPException(status_code=401, detail="Invalid username or password")

    logger.info("✅ Password matched. Issuing token.")
    access_token = create_access_token(data={"sub": db_user.username})
    return {"access_token": access_token, "token_type": "bearer"}


# Get all users
@router.get("/", response_model=list[schemes.User], dependencies=[Depends(get_current_user)])
def read_users(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    return crud.user.get_users(db, skip=skip, limit=limit)


# Get current user
@router.get("/me", response_model=schemes.User)
def read_current_user(current_user: schemes.User = Depends(get_current_user)):
    return current_user


# Get user by UUID
@router.get("/{user_id}", response_model=schemes.User, dependencies=[Depends(get_current_user)])
def read_user(user_id: UUID, db: Session = Depends(get_db)):
    db_user = crud.user.get_user(db, user_id)
    if db_user is None:
        raise HTTPException(status_code=404, detail="User not found")
    return db_user


# Update user
@router.put("/{user_id}", response_model=schemes.User, dependencies=[Depends(get_current_user)])
def update_user(user_id: UUID, user_update: schemes.UserUpdate, db: Session = Depends(get_db)):
    if user_update.password:
        user_update.password = hash_password(user_update.password)
    return crud.user.update_user(db, user_id, user_update)


# Delete user
@router.delete("/{user_id}", response_model=schemes.User, dependencies=[Depends(get_current_user)])
def delete_user(user_id: UUID, db: Session = Depends(get_db)):
    return crud.user.delete_user(db, user_id)
