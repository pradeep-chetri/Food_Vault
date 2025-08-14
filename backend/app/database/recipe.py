# app/database/recipe.py
import time
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from sqlalchemy.orm import joinedload
from app.models.recipe import Recipe, Ingredient, Instruction, Tag
from app.schemas.recipe import RecipeCreate
from typing import List, Optional
from app.database.stats import invalidate_stats_cache

_recipe_cache: Optional[List[Recipe]] = None
_cache_timestamp: float = 0
_CACHE_TTL = 300  # seconds


async def create_recipe(db: AsyncSession, recipe: RecipeCreate) -> Recipe:
    global _recipe_cache
    _recipe_cache = None  # Invalidate cache
    invalidate_stats_cache()
    
    # Main Recipe
    db_recipe = Recipe(
        title=recipe.title.strip(),
        image_url=recipe.image_url.strip(),
        description=recipe.description.strip(),
        author=recipe.author.strip(),
        prep_time=recipe.prep_time,
        cook_time=recipe.cook_time,
        servings=recipe.servings,
        difficulty=recipe.difficulty,
        chef_note=recipe.chef_note.strip() if recipe.chef_note else None
    )

    # Handle tags
    tag_objs = []
    for tag in recipe.tags:  # tag is TagCreate object
        tag_name = tag.name.strip().lower()
        if not tag_name:
            continue
        existing_tag = await db.execute(select(Tag).where(Tag.name == tag_name))
        db_tag = existing_tag.scalars().first()
        if not db_tag:
            db_tag = Tag(name=tag_name)
            db.add(db_tag)
            await db.flush()
        tag_objs.append(db_tag)
    db_recipe.tags = tag_objs

    # Ingredients
    db_recipe.ingredients = [
        Ingredient(ingredient=ing.ingredient.strip())
        for ing in recipe.ingredients if ing.ingredient.strip()
    ]

    # Instructions
    db_recipe.instructions = [
        Instruction(step_number=i + 1, instruction=inst.instruction.strip())
        for i, inst in enumerate(recipe.instructions) if inst.instruction.strip()
    ]

    db.add(db_recipe)
    await db.commit()
    await db.refresh(db_recipe)
    return db_recipe


async def get_all_recipes(db: AsyncSession) -> List[Recipe]:
    global _recipe_cache, _cache_timestamp
    
    if _recipe_cache and (time.time() - _cache_timestamp < _CACHE_TTL):
        print("Returning cached recipes")
        return _recipe_cache

    print("Fetching recipes from DB...")
    result = await db.execute(
        select(Recipe)
        .options(
            joinedload(Recipe.ingredients),
            joinedload(Recipe.instructions),
            joinedload(Recipe.tags)
        )
    )
    recipes = list(result.scalars().unique().all())
    
    _recipe_cache = recipes
    _cache_timestamp = time.time()
    
    return recipes
