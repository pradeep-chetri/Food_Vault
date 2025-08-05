from fastapi import APIRouter
from app.database import fetch_stats

router = APIRouter(tags=["Stats"])

@router.get("/stats")
def get_stats():
    return fetch_stats()