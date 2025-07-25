from pydantic import BaseModel

class Bookmark(BaseModel):
    user_id: int
    recipe_id: int