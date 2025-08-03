from .recipe import router as recipe_router
from .user import router as user_router
from .bookmark import router as bookmark_router
from .stats import router as stats_router

__all__ = ["recipe_router", "user_router", "bookmark_router", "stats_router"]