from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app import crud, schemas
from app.database import get_db
from app.api.deps import get_current_user
from app.core.auth import hash_password, verify_password, create_access_token
from fastapi.security import OAuth2PasswordRequestForm


router = APIRouter()

@router.get("/", response_model=list[schemas.User])
def read_users(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    return crud.user.get_users(db, skip=skip, limit=limit)

@router.get("/{user_id}", response_model=schemas.User)
def read_user(user_id: int, db: Session = Depends(get_db)):
    db_user = crud.user.get_user(db, user_id)
    if db_user is None:
        raise HTTPException(status_code=404, detail="User not found")
    return db_user

@router.post("/", response_model=schemas.User, dependencies=[Depends(get_current_user)])
def create_user(user: schemas.UserCreate, db: Session = Depends(get_db)):
    user.password = hash_password(user.password)  
    return crud.user.create_user(db, user)

@router.put("/{user_id}", response_model=schemas.User, dependencies=[Depends(get_current_user)])
def update_user(user_id: int, user_update: schemas.UserUpdate, db: Session = Depends(get_db)):
    if user_update.password:
        user_update.password = hash_password(user_update.password)
    return crud.user.update_user(db, user_id, user_update)

@router.delete("/{user_id}", response_model=schemas.User, dependencies=[Depends(get_current_user)])
def delete_user(user_id: int, db: Session = Depends(get_db)):
    return crud.user.delete_user(db, user_id)

@router.post("/login")
def login(form_data: OAuth2PasswordRequestForm = Depends(), db: Session = Depends(get_db)):
    db_user = crud.user.get_user_by_username(db, username=form_data.username)
    if not db_user or not verify_password(form_data.password, db_user.hashed_password):
        raise HTTPException(status_code=401, detail="Invalid username or password")
    access_token = create_access_token(data={"sub": db_user.username})
    return {"access_token": access_token, "token_type": "bearer"}

