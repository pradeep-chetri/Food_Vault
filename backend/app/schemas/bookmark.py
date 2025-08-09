from pydantic import BaseModel

class Bookmark(BaseModel):
    recipe_id: int

class BookmarkCreate(Bookmark):
    email: str
