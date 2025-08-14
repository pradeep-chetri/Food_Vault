from pydantic import BaseModel, validator
from typing import List, Optional

class TagCreate(BaseModel):
    name: str

class IngredientCreate(BaseModel):
    ingredient: str

class InstructionCreate(BaseModel):
    instruction: str

class RecipeCreate(BaseModel):
    title: str
    image_url: str
    description: str
    tags: List[TagCreate]  # Accept objects with 'name' property
    author: str
    ingredients: List[IngredientCreate]  # Accept objects with 'ingredient' property
    instructions: List[InstructionCreate]  # Accept objects with 'instruction' property
    prep_time: int
    cook_time: int
    servings: int
    difficulty: str
    chef_note: Optional[str] = None

# Output schemas (for GET requests) - these return objects
class TagOut(BaseModel):
    id: int
    name: str
    
    class Config:
        from_attributes = True

class IngredientOut(BaseModel):
    id: int
    ingredient: str
    
    class Config:
        from_attributes = True

class InstructionOut(BaseModel):
    id: int
    step_number: int
    instruction: str
    
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
    chef_note: Optional[str] = None
    tags: List[TagOut]  # Returns objects
    ingredients: List[IngredientOut]  # Returns objects
    instructions: List[InstructionOut]  # Returns objects
    created_at: Optional[str] = None
    
    class Config:
        from_attributes = True