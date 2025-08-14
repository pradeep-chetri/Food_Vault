from time import time
from sqlalchemy import delete
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from sqlalchemy.orm import selectinload

from app.models.bookmark import Bookmark
from app.models.recipe import Recipe

from app.schemas.recipe import RecipeOut

_bookmark_cache = {}
_BOOKMARK_TTL = 300  # seconds

def invalidate_bookmark_cache(email: str):
    """Remove cached bookmarks for a given user."""
    _bookmark_cache.pop(email, None)

async def add_bookmark(db: AsyncSession, email: str, recipe_id: int):
    db_bookmark = Bookmark(email=email, recipe_id=recipe_id)
    db.add(db_bookmark)
    try:
        await db.commit()
        invalidate_bookmark_cache(email)
        return True
    except Exception as e:
        await db.rollback()
        if "UNIQUE constraint" in str(e):
            return {"error": "Bookmark already exists"}
        return {"error": str(e)}

async def remove_bookmark(db: AsyncSession, email: str, recipe_id: int):
    try:
        await db.execute(
            delete(Bookmark).where(
                Bookmark.email == email,
                Bookmark.recipe_id == recipe_id
            )
        )
        await db.commit()
        invalidate_bookmark_cache(email)
        return True
    except Exception as e:
        await db.rollback()
        return {"error": str(e)}

async def get_bookmarks_by_email(db: AsyncSession, email: str):
    try:
        now = time()
        print("Starting database")
        
        if email in _bookmark_cache:
            data, ts = _bookmark_cache[email]
            if now - ts < _BOOKMARK_TTL:
                print(f"Serving bookmarks for {email} from cache")
                return data

        print(f"Fetching bookmarks for {email} from DB...")
        
        stmt = (
            select(Recipe)
            .options(
                selectinload(Recipe.tags),
                selectinload(Recipe.ingredients),
                selectinload(Recipe.instructions),
            )
            .join(Bookmark, Recipe.id == Bookmark.recipe_id)
            .filter(Bookmark.email == email)
        )
        result = await db.execute(stmt)
        recipes = result.scalars().unique().all()

        result_list = [RecipeOut.model_validate(recipe) for recipe in recipes]
        
        _bookmark_cache[email] = (result_list, now)
        
        print(result_list)
        return result_list
    except Exception as e:
        return {"error": str(e)}
