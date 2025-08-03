from pydantic import BaseModel

class Bookmark(BaseModel):
    email: str

class BookmarkPublic(Bookmark):
    pass
class BookmarkCreate(Bookmark):
    recipe_id: int
