
from typing import List
from fastapi import APIRouter, HTTPException, Depends
from fastapi.responses import JSONResponse
from sqlalchemy.ext.asyncio import AsyncSession

from app.schemas.recipe import RecipeOut, RecipeCreate
from app.database.recipe import create_recipe as create_recipe_crud, get_all_recipes as get_all_recipes_crud
from app.database.initDB import get_db

router = APIRouter(prefix="/recipes", tags=["Recipes"])


# 🔹 GET all recipes
@router.get("/", response_model=List[RecipeOut], summary="Get all recipes with tags")
async def get_recipes(db: AsyncSession = Depends(get_db)):
    try:
        return await get_all_recipes_crud(db)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


# 🔹 POST single recipe
@router.post("/add", summary="Add a single recipe", status_code=201)
async def add_recipe(data: RecipeCreate, db: AsyncSession = Depends(get_db)):
    try:
        await create_recipe_crud(db, data)
        return JSONResponse(status_code=201, content={
            "message": "Recipe successfully added",
            "error": None
        })
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

# 🔹 POST multiple recipes (bulk insert)
@router.post("/bulk", summary="Add multiple recipes", status_code=201)
async def add_recipes_bulk(data: List[RecipeCreate], db: AsyncSession = Depends(get_db)):
    try:
        for recipe in data:
            await create_recipe_crud(db, recipe)
        return JSONResponse(status_code=201, content={
            "message": f"{len(data)} recipes added successfully",
            "error": None
        })
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

