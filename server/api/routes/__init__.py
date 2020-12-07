from fastapi import APIRouter
from api import app
from . import test



router = APIRouter()

@router.get('/')
async def leaderboard():
    return {"test": 2123}

# Secure Routes
app.include_router(test.router, tags=['Leaderboard Information'], prefix='/leaderboard')
