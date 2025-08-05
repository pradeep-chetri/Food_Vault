from .auth import addUser, getUserByEmail
from .bookmarks import addBookmark, removeBookmark, getBookmarksByEmail
from .recipe import get_all_recipes, create_recipe, create_recipes_bulk
from .stats import fetch_stats

__all__ = [
    "addUser",
    "getUserByEmail",
    "addBookmark",
    "removeBookmark",
    "getBookmarksByEmail",
    "get_all_recipes",
    "create_recipe",
    "create_recipes_bulk",
    "fetch_stats",
]
