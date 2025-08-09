from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from app.database.initDB import get_db  # Your DB session dependency
from app.database.stats import fetch_stats
import logging

router = APIRouter(tags=["Stats"])

@router.get("/stats", summary="Fetch general app statistics")
async def get_stats(db: AsyncSession = Depends(get_db)):
    try:
        stats = await fetch_stats(db)
        return stats 
    except Exception as e:
        logging.error(f"Error fetching stats: {e}")
        raise HTTPException(status_code=500, detail="Internal Server Error")
