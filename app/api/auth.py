# app/api/auth.py
from fastapi import APIRouter, Depends, HTTPException
from fastapi.security import OAuth2PasswordRequestForm
from sqlalchemy.orm import Session
from app.database import get_db
from app.core.auth import verify_password, create_access_token
from app import crud
import logging
logger = logging.getLogger(__name__)

router = APIRouter()

@router.post("/login")
def login(
    form_data: OAuth2PasswordRequestForm = Depends(),
    db: Session = Depends(get_db)
):
    print("🔐 Login attempt:", form_data.username)

    user = crud.user.get_user_by_username(db, form_data.username)

    if not user:
        print("❌ User not found:", form_data.username)
        raise HTTPException(status_code=401, detail="Invalid username or password")

    logger.info("🔐 Login attempt: %s", form_data.username)



    if not verify_password(form_data.password, user.hashed_password):
        print("❌ Password mismatch for user:", form_data.username)
        raise HTTPException(status_code=401, detail="Invalid username or password")

    print("✅ Password matched for user:", form_data.username)
    access_token = create_access_token(data={"sub": user.username})
    return {"access_token": access_token, "token_type": "bearer"}
