import { useEffect, useState } from 'react';
import RecipeGrid from '../components/Home/RecipeGrid';
import type { recipeCardDataType } from "../types/recipeCardDataType";
import { fetchRecipeData } from "../lib/recipeData";
import HeroComponent from '../components/Home/HeroComponent';

function Home() {
  const [searchTerm, setSearchTerm] = useState("");
  const [recipeCardData, setRecipeCardData] = useState<recipeCardDataType[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const data = await fetchRecipeData();
        setRecipeCardData(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred");
      } finally {
        setLoading(false);
      }
    };

    fetchRecipes();
  }, []);

  const filteredRecipes = recipeCardData.filter(recipe =>
    recipe.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <div className="text-blue-500 flex w-full min-h-screen justify-center items-center font-bold">
        <h1>Loading...</h1>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-red-500 flex w-full min-h-screen justify-center items-center font-bold">
        <h1>Error: {error}</h1>
      </div>
    );
  }

  return (
    <>
      <div className="p-6" />
      <HeroComponent searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      <RecipeGrid recipes={filteredRecipes} />
    </>
  );
}

export default Home;
