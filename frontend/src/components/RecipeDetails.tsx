import { ChefHat, Clock, Users, X } from "lucide-react";
import { PREDEFINED_TAGS } from "../constant/Tags_Info";
import type { recipeDataType } from "../types/recipeType";

interface RecipeDetailsProps {
  isOpen: boolean;
  Close: () => void;
  recipes: recipeDataType;
}

export default function RecipeDetails({
  isOpen,
  Close,
  recipes,
}: RecipeDetailsProps) {
  if (!isOpen) return null;

  const displayRecipe = { ...recipes };

  return (
    <div className="fixed inset-0 bg-zinc-900/50 flex items-center justify-center z-50 p-4">
      <div className="bg-gradient-to-br from-[#fdfcfb] to-[#f4f4f5] no-scrollbar rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-gray-200">
        {/* Header with Image */}
        <div className="relative">
          <div className="h-64 md:h-72 overflow-hidden rounded-t-2xl">
            <img
              src={displayRecipe.image_url}
              alt={displayRecipe.title}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Close Button */}
          <button
            onClick={Close}
            className="fixed top-4 right-4 bg-white/90 hover:bg-white backdrop-blur-sm rounded-full p-2.5 shadow-sm transition-all duration-200 hover:scale-105 border border-gray-200"
            aria-label="Close recipe details"
          >
            <X size={20} className="text-gray-600" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 md:p-8">
          {/* Title and Description */}
          <div className="text-center mb-8">
            <h1 className="text-3xl md:text-4xl font-semibold text-zinc-800 mb-4 leading-snug tracking-tight">
              {displayRecipe.title}
            </h1>
            <p className="text-md text-gray-500 mb-2">
              by{" "}
              <span className="text-lime-600 font-semibold">
                {displayRecipe.author}
              </span>{" "}
              • <span>{displayRecipe.publish_date}</span>
            </p>

            {/* Tags */}
            {displayRecipe.tags.length > 0 && (
              <div className="flex flex-wrap justify-center gap-3 mt-2 mb-4">
                {displayRecipe.tags.map((tag) => {
                  // Capitalize tag.name for display
                  const formatted =
                    tag.name.charAt(0).toUpperCase() + tag.name.slice(1);

                  // Find style by tag name in PREDEFINED_TAGS
                  const style = PREDEFINED_TAGS.find(
                    (t) => t.name === formatted
                  );

                  return (
                    <span
                      key={tag.name} // Use unique tag name as key
                      className={`px-4 py-1.5 text-sm rounded-full font-medium ${style?.color} shadow-sm hover:shadow-md transition-all`}
                    >
                      {formatted}
                    </span>
                  );
                })}
              </div>
            )}

            <p className="text-base md:text-lg text-gray-600 leading-relaxed tracking-wide max-w-2xl mx-auto mb-6">
              {displayRecipe.description}
            </p>
          </div>

          {/* Recipe Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-10 max-w-2xl mx-auto">
            {/* Prep Time */}
            <div className="text-center space-y-2">
              <div className="w-12 h-12 bg-white rounded-xl shadow-sm border border-gray-200 flex items-center justify-center mx-auto">
                <Clock size={20} className="text-orange-500" />
              </div>
              <div className="text-xl font-bold text-gray-800">
                {displayRecipe.prep_time}m
              </div>
              <div className="text-sm text-gray-500">Prep Time</div>
            </div>

            {/* Cook Time */}
            <div className="text-center space-y-2">
              <div className="w-12 h-12 bg-white rounded-xl shadow-sm border border-gray-200 flex items-center justify-center mx-auto">
                <Clock size={20} className="text-lime-600" />
              </div>
              <div className="text-xl font-bold text-gray-800">
                {displayRecipe.cook_time}m
              </div>
              <div className="text-sm text-gray-500">Cook Time</div>
            </div>

            {/* Servings */}
            <div className="text-center space-y-2">
              <div className="w-12 h-12 bg-white rounded-xl shadow-sm border border-gray-200 flex items-center justify-center mx-auto">
                <Users size={20} className="text-orange-500" />
              </div>
              <div className="text-xl font-bold text-gray-800">
                {displayRecipe.servings}
              </div>
              <div className="text-sm text-gray-500">Servings</div>
            </div>

            {/* Difficulty */}
            <div className="text-center space-y-2">
              <div className="w-12 h-12 bg-white rounded-xl shadow-sm border border-gray-200 flex items-center justify-center mx-auto">
                <ChefHat size={20} className="text-lime-600" />
              </div>
              <div className="text-base font-bold text-gray-800">
                {displayRecipe.difficulty}
              </div>
              <div className="text-sm text-gray-500">Level</div>
            </div>
          </div>

          {/* Ingredients and Instructions */}
          <div className="grid lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {/* Ingredients */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200">
              <h2 className="text-xl font-semibold text-zinc-800 mb-6 tracking-tight">
                Ingredients
              </h2>
              <div className="space-y-3">
                {displayRecipe.ingredients.map((ingredientObj, index) => (
                  <div
                    key={`${ingredientObj.ingredient}-${index}`} // unique key with ingredient + index
                    className="flex items-start gap-4 text-gray-700 hover:bg-gray-50 p-3 rounded-xl transition-all duration-200"
                  >
                    <div className="w-2 h-2 bg-orange-500 rounded-full mt-2.5 flex-shrink-0"></div>
                    <span className="leading-relaxed tracking-wide">
                      {ingredientObj.ingredient}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Instructions */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200">
              <h2 className="text-xl font-semibold text-zinc-800 mb-6 tracking-tight">
                Instructions
              </h2>
              <div className="space-y-4">
                {displayRecipe.instructions.map((instructionObj, index) => (
                  <div
                    key={`${index}-${instructionObj.instruction.slice(0, 20)}`} // unique key: index + first 20 chars
                    className="flex gap-4 hover:bg-gray-50 p-3 rounded-xl transition-all duration-200"
                  >
                    <div className="flex-shrink-0 w-8 h-8 bg-orange-500 text-white text-sm font-bold rounded-full flex items-center justify-center shadow-sm">
                      {index + 1}
                    </div>
                    <p className="text-gray-700 leading-relaxed tracking-wide pt-1">
                      {instructionObj.instruction}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Chef's Note */}
          {displayRecipe.chef_note && (
            <div className="mt-10 bg-white rounded-2xl p-6 shadow-sm border border-gray-200 max-w-3xl mx-auto">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-lime-100 rounded-xl flex items-center justify-center flex-shrink-0">
                  <ChefHat size={20} className="text-lime-600" />
                </div>
                <div className="text-center flex-1">
                  <h4 className="text-lg font-semibold text-zinc-800 mb-3 tracking-tight">
                    Chef's Note
                  </h4>
                  <p className="text-gray-600 leading-relaxed tracking-wide">
                    {displayRecipe.chef_note}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Footer */}
          <div className="text-center mt-10 pt-6 border-t border-gray-200"></div>
        </div>
      </div>
    </div>
  );
}
