import { useState } from "react";
import { Bookmark } from "lucide-react";
import { PREDEFINED_TAGS } from "../constant/Tags_Info";
import RecipeDetails from "./RecipeDetails";
import { useUser } from "../context/UserDataContext";
import { useBookmarksContext } from "../context/BookmarkContext";
import { toggleBookmark as toggleBookmarkAPI } from "../lib/api/bookmark";
import type { recipeDataType } from "../types/recipeType";

interface RecipeCardProps {
  recipe: recipeDataType;
}

export default function RecipeCard({ recipe }: RecipeCardProps) {
  const { bookmarkedIds, toggleBookmark } = useBookmarksContext();
  const { user } = useUser();
  const [modelOpen, setModelOpen] = useState(false);

  const isBookmarked = bookmarkedIds.has(recipe.id);

  const handleBookmarkClick = async (e: React.MouseEvent) => {
    e.stopPropagation(); // prevent modal opening
    if (!user) return;
    toggleBookmark(recipe.id); // update UI instantly
    await toggleBookmarkAPI(user.email, recipe.id, isBookmarked); // persist on server
  };

  const handleModelToggle = () => setModelOpen(!modelOpen);

  return (
    <div className="relative">
      <div
        onClick={handleModelToggle}
        className="relative flex flex-col bg-white rounded-2xl shadow-sm border border-gray-200 hover:shadow-lg transition-all cursor-pointer h-[420px] overflow-hidden"
      >
        {/* Image */}
        <div className="h-48 overflow-hidden">
          <img
            src={recipe.image_url}
            alt={recipe.title}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Bookmark */}
        {user && (
          <button
            onClick={handleBookmarkClick}
            aria-label="Bookmark recipe"
            className="absolute top-3 right-3 bg-white rounded-full p-1.5 shadow-sm hover:scale-105 transition"
          >
            <Bookmark
              size={18}
              className={`transition-colors ${
                isBookmarked
                  ? "text-lime-600 fill-lime-600"
                  : "text-gray-400 fill-none"
              }`}
            />
          </button>
        )}

        {/* Content */}
        <div className="flex flex-col flex-1 p-4">
          {/* Title */}
          <h3 className="font-semibold text-lg text-zinc-800 line-clamp-2 mb-1">
            {recipe.title}
          </h3>

          {/* Tags */}
          {recipe.tags?.length > 0 && (
            <div className="flex flex-wrap gap-1 mb-2 overflow-hidden max-h-[48px]">
              {recipe.tags.slice(0, 4).map((tag) => {
                const formatted =
                  tag.name.charAt(0).toUpperCase() + tag.name.slice(1);
                const style = PREDEFINED_TAGS.find(
                  (t) => t.name === formatted
                );
                return (
                  <span
                    key={tag.name}
                    className={`px-2 py-0.5 text-xs rounded-full font-medium ${
                      style?.color || "bg-gray-200 text-gray-700"
                    }`}
                  >
                    {formatted}
                  </span>
                );
              })}
              {recipe.tags.length > 4 && (
                <span className="px-2 py-0.5 text-xs rounded-full bg-gray-100 text-gray-600">
                  +{recipe.tags.length - 4} more
                </span>
              )}
            </div>
          )}

          {/* Description */}
          <p className="text-sm text-gray-600 line-clamp-3 mb-auto">
            {recipe.description}
          </p>

          {/* Footer */}
          <div className="mt-3 flex justify-between items-center text-sm text-gray-500">
            <span>{recipe.prep_time}m prep</span>
            <span>{recipe.cook_time}m cook</span>
          </div>
        </div>
      </div>

      {/* Modal */}
      <RecipeDetails
        isOpen={modelOpen}
        Close={handleModelToggle}
        recipes={recipe}
      />
    </div>
  );
}
