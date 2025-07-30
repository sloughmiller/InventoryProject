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
    logger.info("🔐 Login attempt: %s", form_data.username)

    user = crud.user.get_user_by_username(db, form_data.username)

    if not user:
        logger.warning("❌ User not found: %s", form_data.username)
        raise HTTPException(status_code=401, detail="Invalid username or password")

    if not verify_password(form_data.password, user.hashed_password):
        logger.warning("❌ Password mismatch for user: %s", form_data.username)
        raise HTTPException(status_code=401, detail="Invalid username or password")

    logger.info("✅ Login successful for user: %s", form_data.username)

    # ✅ Use UUID as sub for secure token subject
    access_token = create_access_token(data={"sub": str(user.id)})

    return {"access_token": access_token, "token_type": "bearer"}
