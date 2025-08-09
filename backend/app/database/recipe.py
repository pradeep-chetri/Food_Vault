# app/crud/recipe.py
import time
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from sqlalchemy.orm import joinedload
from app.models.recipe import Recipe, Ingredient, Instruction, Tag
from app.schemas.recipe import RecipeCreate

async def create_recipe(db: AsyncSession, recipe: RecipeCreate) -> Recipe:
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
    for tag_name in recipe.tags:
        tag_name = tag_name.strip().lower()
        if not tag_name:
            continue
        existing_tag = await db.execute(select(Tag).where(Tag.name == tag_name))
        tag = existing_tag.scalars().first()
        if not tag:
            tag = Tag(name=tag_name)
            db.add(tag)
            await db.flush()
        tag_objs.append(tag)
    db_recipe.tags = tag_objs

    # Ingredients
    db_recipe.ingredients = [
        Ingredient(ingredient=ing.strip())
        for ing in recipe.ingredients if ing.strip()
    ]

    # Instructions
    db_recipe.instructions = [
        Instruction(step_number=i + 1, instruction=inst.strip())
        for i, inst in enumerate(recipe.instructions) if inst.strip()
    ]

    db.add(db_recipe)
    await db.commit()
    await db.refresh(db_recipe)
    return db_recipe


from typing import List

async def get_all_recipes(db: AsyncSession) -> List[Recipe]:
    start = time.time()
    result = await db.execute(
        select(Recipe)
        .options(
            joinedload(Recipe.ingredients),
            joinedload(Recipe.instructions),
            joinedload(Recipe.tags)
        )
    )
    print(f"DB Query Time: {time.time() - start:.3f}s")
    return list(result.scalars().unique().all())

