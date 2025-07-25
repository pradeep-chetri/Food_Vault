import { useEffect, useState } from "react";
import RecipeCard from "../Home/RecipeCard";
import { tagColorMap } from "../../constant/TagColors";
import type { recipeCardDataType } from "../../types/recipeCardDataType";
import { BookPlus } from "lucide-react";
import { useUser } from "../../context/UserDataContext";

export default function YourRecipes() {
  const [recipes, setRecipes] = useState<recipeCardDataType[]>([]);
  const { user } = useUser();
  const authoredRecipes = recipes.filter((recipe) => recipe.author === user?.name);

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

  const handleAddRecipe = () => {
    // Placeholder for modal or form logic
    console.log("Add new recipe clicked");
  };

  return (
    <section id="your-recipes" className="px-4 md:px-8 lg:px-16 py-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div>
    <h2 className="text-xl font-semibold text-zinc-800 flex items-center gap-2">
      🧾 Your Recipes
    </h2>
    <p className="text-sm text-zinc-500 mt-1">
      Manage and view recipes you’ve added.
    </p>
  </div>

        <button
    onClick={handleAddRecipe}
    className="flex items-center gap-2 bg-amber-500 hover:bg-amber-600 text-white px-4 py-2 rounded-xl shadow hover:shadow-md transition duration-200"
  >
    <BookPlus size={18} />
    <span>Add Recipe</span>
  </button>
      </div>

      {/* Recipe Grid or Empty State */}
      {authoredRecipes.length > 0 ? (
        <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-6">
          {authoredRecipes.map((recipe) => (
            <RecipeCard
              key={recipe.id}
              title={recipe.title}
              description={recipe.description}
              imageUrl={recipe.image}
              tags={recipe.tags}
              bookmarked={recipe.isBookmarked}
              tagsColor={recipe.tags.map((tag) => tagColorMap[tag])}
            />
          ))}
        </div>
      ) : (
        <div className="text-center mt-16 text-zinc-400 italic">
          You haven`t added any recipes yet.
        </div>
      )}
    </section>
  );
}
