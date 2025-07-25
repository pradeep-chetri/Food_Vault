import { useEffect, useState } from "react";
import RecipeCard from "../Home/RecipeCard";
import { tagColorMap } from "../../constant/TagColors";
import type { recipeCardDataType } from "../../types/recipeCardDataType";

export default function BookmarkedRecipes() {
  const [recipes, setRecipes] = useState<recipeCardDataType[]>([]);

  useEffect(() => {
        const fetchRecipes = async () => {
          try {
            // Import fetchRecipeData dynamically to avoid circular deps
            const { fetchRecipeData } = await import("../../lib/recipeData");
            const data = await fetchRecipeData();
            setRecipes(data);
          } catch (err) {
            // Optionally handle error, e.g. set error state
            setRecipes([]);
          }
        };
        fetchRecipes();
      }, []);

  const handleBookmarkToggle = (id: number) => {
    setRecipes((prev) =>
      prev.map((recipe) =>
        recipe.id === id
          ? { ...recipe, isBookmarked: !recipe.isBookmarked }
          : recipe
      )
    );
  };

  const bookmarked = recipes.filter((recipe) => recipe.isBookmarked);

  return (
    <section id="bookmarked" className="px-4 md:px-8 lg:px-16 py-6">
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-zinc-800 flex items-center gap-2">
          <span className="text-rose-500">📌</span> Your Bookmarked Recipes
        </h2>
        <p className="text-sm text-zinc-500 mt-1">
          Saved recipes you love and want to revisit.
        </p>
      </div>

      {bookmarked.length > 0 ? (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {bookmarked.map((recipe) => (
            <RecipeCard
              key={recipe.id}
              title={recipe.title}
              description={recipe.description}
              imageUrl={recipe.image}
              tags={recipe.tags}
              bookmarked={recipe.isBookmarked}
              tagsColor={recipe.tags.map((tag) => tagColorMap[tag])}
              onBookmarkToggle={() => handleBookmarkToggle(recipe.id)}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-16 text-zinc-400 italic text-base">
          You haven`t bookmarked any recipes yet.
        </div>
      )}
    </section>
  );
}
