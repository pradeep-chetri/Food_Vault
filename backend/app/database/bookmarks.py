from sqlalchemy import delete
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from app.models.bookmark import Bookmark
from app.models.recipe import Recipe

async def add_bookmark(db: AsyncSession, email: str, recipe_id: int):
    db_bookmark = Bookmark(email=email, recipe_id=recipe_id)
    db.add(db_bookmark)
    try:
        await db.commit()
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
        return True
    except Exception as e:
        await db.rollback()
        return {"error": str(e)}

async def get_bookmarks_by_email(db: AsyncSession, email: str):
    try:
        stmt = (
            select(Recipe)
            .join(Bookmark, Recipe.id == Bookmark.recipe_id)
            .filter(Bookmark.email == email)
        )
        result = await db.execute(stmt)
        recipes = result.scalars().unique().all()

        result_list = []
        for recipe in recipes:
            tags = [tag.name.capitalize() for tag in recipe.tags]
            result_list.append({
                "id": recipe.id,
                "title": recipe.title,
                "image_url": recipe.image_url,
                "description": recipe.description,
                "author": recipe.author,
                "tags": tags,
            })
        return result_list
    except Exception as e:
        return {"error": str(e)}
