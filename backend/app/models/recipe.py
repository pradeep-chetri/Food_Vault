from sqlalchemy import Column, Integer, String, Text, ForeignKey, Table, CheckConstraint
from sqlalchemy.orm import relationship
from app.database.initDB import Base

# Association table for Many-to-Many between Recipe and Tag
recipe_tags = Table(
    "recipe_tags",
    Base.metadata,
    Column("recipe_id", Integer, ForeignKey("recipes.id", ondelete="CASCADE"), primary_key=True),
    Column("tag_id", Integer, ForeignKey("tags.id", ondelete="CASCADE"), primary_key=True)
)

class Recipe(Base):
    __tablename__ = "recipes"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String, nullable=False)
    image_url = Column(String, nullable=False)
    description = Column(Text, nullable=False)
    author = Column(String, nullable=False)
    prep_time = Column(Integer, nullable=False)
    cook_time = Column(Integer, nullable=False)
    servings = Column(Integer, nullable=False)
    difficulty = Column(String, nullable=False)
    chef_note = Column(Text)

    __table_args__ = (
        CheckConstraint("difficulty IN ('Easy', 'Medium', 'Hard')", name="difficulty_check"),
    )

    # Relationships
    ingredients = relationship("Ingredient", back_populates="recipe", cascade="all, delete-orphan")
    instructions = relationship("Instruction", back_populates="recipe", cascade="all, delete-orphan")
    tags = relationship("Tag", secondary=recipe_tags, back_populates="recipes")
    # In Recipe model
    bookmarks = relationship("Bookmark", back_populates="recipe", cascade="all, delete-orphan")



class Ingredient(Base):
    __tablename__ = "ingredients"

    id = Column(Integer, primary_key=True, index=True)
    recipe_id = Column(Integer, ForeignKey("recipes.id", ondelete="CASCADE"), nullable=False)
    ingredient = Column(String, nullable=False)

    recipe = relationship("Recipe", back_populates="ingredients")


class Instruction(Base):
    __tablename__ = "instructions"

    id = Column(Integer, primary_key=True, index=True)
    recipe_id = Column(Integer, ForeignKey("recipes.id", ondelete="CASCADE"), nullable=False)
    step_number = Column(Integer, nullable=False)
    instruction = Column(Text, nullable=False)

    recipe = relationship("Recipe", back_populates="instructions")


class Tag(Base):
    __tablename__ = "tags"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, unique=True, nullable=False)

    recipes = relationship("Recipe", secondary=recipe_tags, back_populates="tags")
