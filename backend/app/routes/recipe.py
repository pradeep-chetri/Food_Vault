from typing import List
from fastapi import APIRouter
from app.schemas.recipe import Recipe
from app.utils.jsonhandler import load_recipes
    

recipe_router = APIRouter(prefix="/recipes", tags=["Recipes"])

@recipe_router.get("/", response_model=List[Recipe])
async def get_recipes():
    return load_recipes()

