import { useEffect, useState } from "react";
import type { recipeDataType } from "../types/recipeType";
import { fetchBookmarks } from "../lib/api/bookmark";
import { useUser } from "../context/UserDataContext";

export const useBookmarks = () => {
  const { user } = useUser();
  const [bookmarkedRecipes, setBookmarkedRecipes] = useState<recipeDataType[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!user?.email) return;

    const fetchData = async () => {
      setLoading(true); // ✅ Bug fix: should only trigger fetch loading if user is present
      try {
        const data = await fetchBookmarks(user.email);
        setBookmarkedRecipes(data);
      } catch (err) {
        console.error("Fetch failed:", err);
        setError(err instanceof Error ? err.message : "Something went wrong");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [user?.email]); // ✅ Dependency fix: rerun if email changes

  return { bookmarkedRecipes, loading, error };
};
