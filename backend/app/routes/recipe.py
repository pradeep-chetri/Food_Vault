from typing import List
from fastapi import APIRouter, HTTPException
from fastapi.responses import JSONResponse
from app.schemas import Recipe, RecipeCreate
from app.database import get_all_recipes, create_recipe, create_recipes_bulk

router = APIRouter(prefix="/recipes", tags=["Recipes"])


@router.get("/", response_model=List[Recipe], summary="Get all recipes with tags")
def get_recipes():
    try:
        return get_all_recipes()
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@router.post("/add", summary="Add a single recipe", status_code=201)
def add_recipe(data: RecipeCreate):
    try:
        create_recipe(
            title=data.title,
            image_url=data.image_url,
            description=data.description,
            author=data.author,
            tags=data.tags
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
        create_recipes_bulk([recipe.model_dump() for recipe in data])
        return JSONResponse(status_code=201, content={
            "message": f"{len(data)} recipes added successfully",
            "error": None
        })
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
