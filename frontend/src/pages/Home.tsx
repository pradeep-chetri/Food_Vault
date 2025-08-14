import { useState, useEffect } from "react";
import HeroComponent from "../components/HeroComponent";
import RecipeGrid from "../components/RecipeGrid";
import { useRecipes } from "../hooks/useRecipes";

export default function Home() {
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const { recipes, loading, error } = useRecipes();

  // 🔹 Debounce search input for smoother filtering
  useEffect(() => {
    const handler = setTimeout(() => setDebouncedSearch(searchTerm), 300);
    return () => clearTimeout(handler);
  }, [searchTerm]);

  // 🔹 Filter recipes based on debounced search
  const filteredRecipes = recipes.filter((recipe) =>
    recipe.title.toLowerCase().includes(debouncedSearch.toLowerCase())
  );

  // 🔹 Optional: Preload images for better UX
  useEffect(() => {
    recipes.forEach((recipe) => {
      const img = new Image();
      img.src = recipe.image_url;
    });
  }, [recipes]);

  return (
    <>
      <HeroComponent searchTerm={searchTerm} setSearchTerm={setSearchTerm} />

      {!error ? (
        <div className="">
          {!loading ? (
            <div className="">
              {filteredRecipes.length === 0 ? (
                <p className="text-center mt-10 text-gray-500">
                  No recipes found for "
                  <span className="font-semibold">{debouncedSearch}</span>"
                </p>
              ) : (
                <RecipeGrid recipes={filteredRecipes} />
              )}
            </div>
          ) : (
            <div className="text-blue-500 flex justify-center items-center">
              <p className="mt-10">Loading...</p>
            </div>
          )}
        </div>
      ) : (
        <div className="text-red-500 flex w-full min-h-screen justify-center items-center font-bold">
          <h1>Error: {error}</h1>
        </div>
      )}
    </>
  );
}
