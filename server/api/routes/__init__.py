from fastapi import APIRouter
from api import app



router = APIRouter()

@router.get('/')
async def leaderboard():
    return {"test": 2123}

# Secure Routes
app.include_router(router, tags=['Leaderboard Information'], prefix='/leaderboard')