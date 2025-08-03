from pydantic import BaseModel
from typing import List

class RecipeBase(BaseModel):
    title: str
    image_url: str
    description: str
    tags: List[str]
    author: str

class RecipeCreate(RecipeBase):
    pass

class RecipeUpdate(RecipeBase):
    pass

class Recipe(RecipeBase):
    id: int


