from sqlalchemy.orm import Session

from . import models, schemas


def get_users(db: Session, skip: int = 0, limit: int = 100):
    return db.query(models.User).offset(skip).limit(limit).all()


def get_user_by_name(db: Session, name: str):
    return db.query(models.User).filter(models.User.name == name).first()


def update_user(db: Session, user: schemas.UserBase):
	# Get user
	db_user = get_user_by_name(db, user.name)

	# Update values
	if user.wonGame:
		db_user.wins = db_user.wins + 1
	else:
		db_user.losses = db_user.losses + 1
	db_user.num_games = db_user.num_games + 1

	# Persist
	db.commit()
	db.refresh(db_user)
	return db_user


def create_user(db: Session, user: schemas.UserBase):
	# Get values
	userWins = 0
	userLosses = 0
	if user.wonGame:
		userWins = 1
	else:
		userLosses = 1
	db_user = models.User(
        name = user.name,
        wins = userWins,
        losses = userLosses,
        num_games = 1,
    )

	# Add user
	db.add(db_user)
	db.commit()
	db.refresh(db_user)
	return db_user


def insert_new_user(db: Session, user: schemas.UserNew):
	# Get values
	db_user = models.User(
        name = user.name,
        wins = user.wins,
        losses = user.losses,
        num_games = user.wins + user.losses,
    )

	# Add user
	db.add(db_user)
	db.commit()
	db.refresh(db_user)
	return db_user