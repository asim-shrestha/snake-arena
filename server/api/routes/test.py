from fastapi import APIRouter

router = APIRouter()


@router.get('/')
async def leaderboard():
    return {"test": 2123}