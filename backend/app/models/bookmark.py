from sqlalchemy import ForeignKey, String, Integer
from sqlalchemy.orm import Mapped, mapped_column, relationship
from app.database.initDB import Base

class Bookmark(Base):
    __tablename__ = "bookmarks"

    email: Mapped[str] = mapped_column(String, ForeignKey("users.email"), primary_key=True)
    recipe_id: Mapped[int] = mapped_column(Integer, ForeignKey("recipes.id"), primary_key=True)

    # Optional relationships
    recipe = relationship("Recipe", back_populates="bookmarks")
    user = relationship("User", back_populates="bookmarks")
