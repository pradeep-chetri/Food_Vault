from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import func

from app.models.recipe import Recipe
from app.models.user import User
from app.models.bookmark import Bookmark


from sqlalchemy.future import select
from sqlalchemy import func

async def fetch_stats(db: AsyncSession) -> dict:
    total_recipes = (await db.execute(select(func.count(Recipe.id)))).scalar() or 0
    total_users = (await db.execute(select(func.count(User.id)))).scalar() or 0
    total_bookmarks = (await db.execute(select(func.count(Bookmark.email)))).scalar() or 0

    return {
        "total_recipes": total_recipes,
        "total_users": total_users,
        "total_bookmarks": total_bookmarks,
    }

