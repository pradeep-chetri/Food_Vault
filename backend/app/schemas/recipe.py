from pydantic import BaseModel, field_validator
from typing import List


class RecipeBase(BaseModel):
    title: str
    image_url: str
    description: str
    tags: List[str]
    author: str

    @field_validator("tags")
    @classmethod
    def clean_tags(cls, v: List[str]) -> List[str]:
        return [tag.strip().lower() for tag in v if isinstance(tag, str) and tag.strip()]


class RecipeCreate(RecipeBase):
    pass


class RecipeUpdate(RecipeBase):
    pass


class Recipe(RecipeBase):
    id: int
