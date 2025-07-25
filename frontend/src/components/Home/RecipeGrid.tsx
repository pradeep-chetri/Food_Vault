import RecipeCard from "./RecipeCard";
import { tagColorMap } from "../../constant/TagColors";
import type { recipeCardDataType } from "../../types/recipeCardDataType";

interface RecipeCardProps {
    recipes: recipeCardDataType[];
}

export default function RecipeGrid({ recipes }: RecipeCardProps) {
  return (
    <section className="px-6 md:px-10 py-12">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 justify-items-center">
        {recipes.map((recipe) => (
          <RecipeCard
            key={recipe.id}
            title={recipe.title}
            description={recipe.description}
            imageUrl={recipe.image}
            tags={recipe.tags}
            bookmarked={recipe.isBookmarked}
            tagsColor={recipe.tags.map(tag => tagColorMap[tag])}
            onBookmarkToggle={() => {
              recipe.isBookmarked = !recipe.isBookmarked;
            }}
          />
        ))}
      </div>
    </section>
  );
}
