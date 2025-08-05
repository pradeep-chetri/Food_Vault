from typing import List
from fastapi import APIRouter, HTTPException
from fastapi.responses import JSONResponse
from app.schemas import Recipe, RecipeCreate
from app.database import get_all_recipes, create_recipe, create_recipes_bulk

router = APIRouter(prefix="/recipes", tags=["Recipes"])

@router.get("/", response_model=List[Recipe], summary="Get all recipes with tags")
def get_recipes():
    """Returns a list of all recipes along with their tags."""
    return get_all_recipes()

@router.post("/add", summary="Add recipe with tags", status_code=201)
def add_recipe(data: RecipeCreate):
    """Add new recipe to the collection."""
    try:
        create_recipe(
            data.title,
            data.image_url,
            data.description,
            data.author,
            data.tags
        )
        return JSONResponse(status_code=201, content={
            "message": "Recipe successfully added",
            "error": None
        })
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.post("/bulk", summary="Add multiple recipes", status_code=201)
def add_recipes_bulk(data: List[RecipeCreate]):
    try:
        # convert pydantic models to dicts
        recipes = [recipe.model_dump() for recipe in data]
        create_recipes_bulk(recipes)
        return JSONResponse(status_code=201, content={
            "message": f"{len(data)} recipes added successfully",
            "error": None
        })
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
