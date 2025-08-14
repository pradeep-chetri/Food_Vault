import time
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import func

from app.models.recipe import Recipe
from app.models.user import User
from app.models.bookmark import Bookmark


from sqlalchemy.future import select
from sqlalchemy import func

_stats_cache = None
_stats_timestamp = 0
_STATS_TTL = 300  # seconds


async def fetch_stats(db: AsyncSession) -> dict:
    global _stats_cache, _stats_timestamp
    
    if _stats_cache and (time.time() - _stats_timestamp < _STATS_TTL):
        print("Returning cached stats")
        return _stats_cache

    print("Fetching stats from DB...")
    total_recipes = (await db.execute(select(func.count(Recipe.id)))).scalar() or 0
    total_users = (await db.execute(select(func.count(User.id)))).scalar() or 0
    total_bookmarks = (await db.execute(select(func.count(Bookmark.email)))).scalar() or 0
    
    _stats_cache = {
        "total_recipes": total_recipes,
        "total_users": total_users,
        "total_bookmarks": total_bookmarks,
    }
    
    _stats_timestamp = time.time()

    return _stats_cache


def invalidate_stats_cache():
    """Call this whenever a recipe, user, or bookmark changes."""
    global _stats_cache
    _stats_cache = None