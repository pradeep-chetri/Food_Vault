from .recipe import router as recipe_router
from .user import router as user_router
from .bookmark import router as bookmark_router
from .stats import router as stats_router
from .image_upload import router as image_router
from .health_check import router as health_router

routers = [
    recipe_router,
    user_router,
    bookmark_router,
    stats_router,
    image_router,
    health_router
]

__all__ = ["routers"]
