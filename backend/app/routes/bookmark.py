from fastapi import APIRouter, HTTPException
from app.schemas.bookmark import BookmarkCreate
from app.schemas.recipe import Recipe
from app.database.bookmarks import addBookmark, removeBookmark, getBookmarksByEmail
from pydantic import EmailStr

router = APIRouter(prefix="/bookmarks", tags=["Bookmark"])

# 🔹 GET /bookmarks?email=xyz@example.com
@router.get("", response_model=list[Recipe])
def get_bookmarks(email: EmailStr):
    try:
        return getBookmarksByEmail(email)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


# 🔹 POST /bookmarks/add
@router.post("/add", status_code=201)
def add_bookmark(data: BookmarkCreate):
    try:
        addBookmark(data.email, data.recipe_id)
        return {"message": "Bookmark successfully added", "error": None}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


# 🔹 DELETE /bookmarks/delete?email=...&recipe_id=...
@router.delete("/delete")
def delete_bookmark(email: str, recipe_id: int):
    try:
        removeBookmark(email, recipe_id)
        return {"message": "Bookmark successfully removed", "error": None}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
