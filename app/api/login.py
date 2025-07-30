from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from fastapi.security import OAuth2PasswordRequestForm

from app import crud, database, core

router = APIRouter()

@router.post("/login")
def login(
    form_data: OAuth2PasswordRequestForm = Depends(),
    db: Session = Depends(database.get_db)
):
    user = crud.user.get_user_by_username(db, form_data.username)
    if not user or not core.auth.verify_password(form_data.password, user.hashed_password):
        raise HTTPException(status_code=400, detail="Incorrect username or password")
    
    access_token = core.auth.create_access_token(
        data={"sub": str(user.id)}  # Use UUID string
    )
    return {"access_token": access_token, "token_type": "bearer"}
