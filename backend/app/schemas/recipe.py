from pydantic import BaseModel, Field
from typing import List, Optional

class Recipe(BaseModel):
    id: int
    title: str
    image: Optional[str] = None
    description: Optional[str] = None
    tags: List[str] = Field(default_factory=list)
    author: str
    isBookmarked: bool = False

    class Config:
        from_attributes = True
