import RecipeCard from "./RecipeCard";
import type { recipeDataType } from "../types/recipeType";

interface RecipeGridProps {
  recipes: recipeDataType[];
}

export default function RecipeGrid({ recipes }: RecipeGridProps) {
  return (
    <section className="w-full px-4 md:px-10 py-12">
      <div className="max-w-7xl mx-auto">
        {/* Optional title */}
        {/* <h2 className="text-2xl md:text-3xl font-semibold text-zinc-800 mb-6">
          Featured Recipes
        </h2> */}

        {/* Recipe Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 justify-items-center">
          {recipes.map((recipe) => (
            <RecipeCard
              key={recipe.id}
              id={recipe.id}
              title={recipe.title}
              description={recipe.description}
              imageUrl={recipe.image_url}
              tags={recipe.tags}
            />
          ))}
        </div>

        {/* Empty State (optional) */}
        {recipes.length === 0 && (
          <div className="text-center text-gray-500 mt-12 text-lg">
            No recipes found. Try adjusting your filters or add a new one!
          </div>
        )}
      </div>
    </section>
  );
}
