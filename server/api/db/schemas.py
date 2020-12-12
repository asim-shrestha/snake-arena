from typing import List, Optional
from pydantic import BaseModel


class UserBase(BaseModel):
    name: str
    wonGame: bool

class UserNew(BaseModel):
	name: str
	wins: int
	losses: int

class User(BaseModel):
	id: int
	name: str
	wins: int
	losses: int
	num_games: int
	
	class Config:
		orm_mode = True
