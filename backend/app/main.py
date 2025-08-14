from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import uvicorn
from app.routes import recipe_router, user_router, bookmark_router, stats_router, image_router


app = FastAPI(title="Recipe Book API", version="0.1")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(recipe_router, prefix="/api")
app.include_router(user_router, prefix="/api")
app.include_router(bookmark_router, prefix="/api")
app.include_router(stats_router, prefix="/api")
app.include_router(image_router, prefix="/api")

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("app.main:app", host="0.0.0.0", port=8000, reload=True)
