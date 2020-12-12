from typing import List
from fastapi import Depends, HTTPException, APIRouter
from sqlalchemy.orm import Session
from api import app

from ..db import database, crud, models, schemas
models.Base.metadata.create_all(bind=database.engine)

router = APIRouter()

# Dependency
def get_db():
    db = database.SessionLocal()
    try:
        yield db
    finally:
        db.close()

# Used only in the online API to migrate data
@router.post('/new', response_model=schemas.User)
def insert_new_user(user: schemas.UserNew, db: Session = Depends(get_db)):
	db_user = crud.get_user_by_name(db, name=user.name)
	if db_user:
		return db_user
	else:
		return crud.insert_new_user(db=db, user=user)

@router.post('/', response_model=schemas.User)
def upsert_user(user: schemas.UserBase, db: Session = Depends(get_db)):
	db_user = crud.get_user_by_name(db, name=user.name)
	if db_user:
		return crud.update_user(db=db, user=user)
	else:
		return crud.create_user(db=db, user=user)

@router.get('/', response_model=List[schemas.User])
def readLeaderboard(db: Session = Depends(get_db)):
    users = crud.get_users(db, skip=0, limit=100)
    return users

# Secure Routes
app.include_router(
    router, tags=['Leaderboard Information'], prefix='/leaderboard')
