from fastapi import APIRouter
from app.database.stats import fetch_stats  # Updated import to be explicit

router = APIRouter(tags=["Stats"])

@router.get("/stats", summary="Fetch general app statistics")
def get_stats():
    return fetch_stats()
