import axios from "axios";
import type { recipeDataType } from "../../types/recipeType";

const API = axios.create({
  baseURL: "http://localhost:8000/api/bookmarks",
});

/**
 * Toggle bookmark (add/remove) based on current state.
 */
export async function toggleBookmark(
  email: string | null,
  recipeId: number, // 🔧 Should be number for consistency with backend
  isCurrentlyBookmarked: boolean
) {
  if (!email) return;

  if (isCurrentlyBookmarked) {
    // ✅ Use query params for DELETE (per your FastAPI design)
    await API.delete("/delete", {
      params: { email, recipe_id: recipeId },
    });
  } else {
    await API.post("/add", { email, recipe_id: recipeId });
  }
}

/**
 * Fetch bookmarked recipes for a user.
 */
export async function fetchBookmarks(email: string): Promise<recipeDataType[]> {
  try {
    const response = await API.get<recipeDataType[]>("/", { params: { email } });

    if (response.status !== 200) {
      throw new Error(`Failed to fetch bookmarks. Status: ${response.status}`);
    }

    return response.data;
  } catch (error: any) {
    console.error("Error fetching bookmarks:", error?.response || error);
    throw error;
  }
}
