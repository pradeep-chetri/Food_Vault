// src/context/RecipeContext.tsx
import { createContext, useContext, useState, useEffect } from "react";
import type { ReactNode } from "react";

export interface Recipe {
  id: number;
  title: string;
  image: string;
  description: string;
  tags: string[];
  isBookmarked: boolean;
}

interface RecipeContextType {
  recipes: Recipe[];
  toggleBookmark: (id: number) => void;
}

const RecipeContext = createContext<RecipeContextType | null>(null);

export const useRecipeContext = () => {
  const context = useContext(RecipeContext);
  if (!context) throw new Error("RecipeContext must be used inside RecipeProvider");
  return context;
};

export const RecipeProvider = ({ children }: { children: ReactNode }) => {
  const [recipes, setRecipes] = useState<Recipe[]>([]);


  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        // Import fetchRecipeData dynamically to avoid circular deps
        const { fetchRecipeData } = await import("../lib/recipeData");
        const data = await fetchRecipeData();
        setRecipes(data);
      } catch (err) {
        // Optionally handle error, e.g. set error state
        setRecipes([]);
      }
    };
    fetchRecipes();
  }, []);

  const toggleBookmark = (id: number) => {
    setRecipes((prev) =>
      prev.map((recipe) =>
        recipe.id === id
          ? { ...recipe, isBookmarked: !recipe.isBookmarked }
          : recipe
      )
    );
  };

  return (
    <RecipeContext.Provider value={{ recipes, toggleBookmark }}>
      {children}
    </RecipeContext.Provider>
  );
};
