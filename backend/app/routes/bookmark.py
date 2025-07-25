from fastapi import APIRouter , HTTPException
from app.schemas.bookmark import Bookmark

router = APIRouter()

@router.get("/bookmarks/{user_id}", response_model=Bookmark)
def get_bookmark(user_id: int, recipe_id: int):
    pass
