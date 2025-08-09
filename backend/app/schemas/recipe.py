from pydantic import BaseModel
from typing import List, Optional


class TagOut(BaseModel):
    name: str
    class Config:
        from_attributes = True

class IngredientOut(BaseModel):
    ingredient: str
    class Config:
        from_attributes = True

class InstructionOut(BaseModel):
    step_number: int
    instruction: str
    class Config:
        from_attributes = True

class RecipeCreate(BaseModel):
    title: str
    image_url: str
    description: str
    author: str
    prep_time: int
    cook_time: int
    servings: int
    difficulty: str
    chef_note: Optional[str]
    tags: List[str]                  # Just list of tag names for input
    ingredients: List[str]           # List of ingredient strings for input
    instructions: List[str]          # List of instruction strings for input

    class Config:
        from_attributes = True
        
class RecipeOut(BaseModel):
    id: int
    title: str
    image_url: str
    description: str
    author: str
    prep_time: int
    cook_time: int
    servings: int
    difficulty: str
    chef_note: Optional[str]
    tags: List[TagOut]
    ingredients: List[IngredientOut]
    instructions: List[InstructionOut]

    class Config:
        from_attributes = True