import { useEffect, useState } from 'react';
import { fetchRecipeData } from '../lib/api/recipe';
import type { recipeDataType } from '../types/recipeType';

export const useRecipes = () => {
  const [recipes, setRecipes] = useState<recipeDataType[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      try {
        const data = await fetchRecipeData();
        setRecipes(data);
      } catch (err) {
        console.error("Fetch failed:", err);
        setError(err instanceof Error ? err.message : "Something went wrong");
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  return { recipes, loading, error };
};
