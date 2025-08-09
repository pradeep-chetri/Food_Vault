from fastapi import APIRouter, HTTPException, Depends
from sqlalchemy.ext.asyncio import AsyncSession

from app.schemas.bookmark import BookmarkCreate
from app.schemas.user import UserPublic
from app.schemas.recipe import RecipeOut
from app.database.bookmarks import add_bookmark, remove_bookmark, get_bookmarks_by_email
from app.database.initDB import get_db
from app.utils import get_current_user

router = APIRouter(prefix="/bookmarks", tags=["Bookmark"])


# 🔹 GET /bookmarks
router.get("", response_model=list[RecipeOut])
async def get_bookmarks(
    db: AsyncSession = Depends(get_db),
    user: UserPublic = Depends(get_current_user)
):
    result = await get_bookmarks_by_email(db, user.email)
    if isinstance(result, dict) and "error" in result:
        raise HTTPException(status_code=500, detail=result["error"])
    return result

@router.post("/add", status_code=201)
async def add_bookmark_route(
    data: BookmarkCreate,
    db: AsyncSession = Depends(get_db),
    user: UserPublic = Depends(get_current_user)
):
    result = await add_bookmark(db, user.email, data.recipe_id)
    if isinstance(result, dict) and "error" in result:
        raise HTTPException(status_code=400, detail=result["error"])
    return {"message": "Bookmark successfully added", "error": None}

@router.delete("/delete")
async def delete_bookmark_route(
    recipe_id: int,
    db: AsyncSession = Depends(get_db),
    user: UserPublic = Depends(get_current_user)
):
    result = await remove_bookmark(db, user.email, recipe_id)
    if isinstance(result, dict) and "error" in result:
        raise HTTPException(status_code=400, detail=result["error"])
    return {"message": "Bookmark successfully removed", "error": None}