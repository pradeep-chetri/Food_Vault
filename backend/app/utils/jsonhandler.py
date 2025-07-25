import json
import os
from typing import List


DATA_FILE = "data/recipesData.json"

def load_recipes() -> List[dict]:
    if not os.path.exists(DATA_FILE):
        return []
    try:
        with open(DATA_FILE, 'r', encoding="utf-8") as f:
            return json.load(f)
    except (json.JSONDecodeError, FileNotFoundError):
        return []

def save_recipe(recipes: List[dict]):
    with open(DATA_FILE, 'w', encoding="utf-8") as f:
        json.dump(recipes, f, indent=2, ensure_ascii=False, default=str)

def get_next_id() -> int:
    recipes = load_recipes()
    if not recipes:
        return 1
    return max(recipe.get("id", 0) for recipe in recipes) + 1