from fastapi import APIRouter, HTTPException, Depends
from app.schemas import BookmarkCreate, UserPublic, Recipe
from app.database import addBookmark, removeBookmark, getBookmarksByEmail
from app.utils import get_current_user  # ✅ Auth dependency

router = APIRouter(prefix="/bookmarks", tags=["Bookmark"])

# 🔹 GET /bookmarks
@router.get("", response_model=list[Recipe])
def get_bookmarks(user: UserPublic = Depends(get_current_user)):
    try:
        return getBookmarksByEmail(user.email)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


# 🔹 POST /bookmarks/add
@router.post("/add", status_code=201)
def add_bookmark(data: BookmarkCreate, user: UserPublic = Depends(get_current_user)):
    try:
        addBookmark(user.email, data.recipe_id)
        return {"message": "Bookmark successfully added", "error": None}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


# 🔹 DELETE /bookmarks/delete?recipe_id=...
@router.delete("/delete")
def delete_bookmark(recipe_id: int, user: UserPublic = Depends(get_current_user)):
    try:
        removeBookmark(user.email, recipe_id)
        return {"message": "Bookmark successfully removed", "error": None}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
