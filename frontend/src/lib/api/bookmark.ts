import axios from "axios";
import type { recipeDataType } from "../../types/recipeType";

const API = axios.create({
  baseURL: `${import.meta.env.VITE_APP_API_URL}/bookmarks`,
});

// 🛡️ Attach token to each request
API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

/**
 * Toggle bookmark (add/remove) based on current state.
 */
export async function toggleBookmark(email: string, recipeId: number, isBookmarked: boolean): Promise<void> {
  try {
    console.log(recipeId)
    if (isBookmarked) {
      await API.delete("/delete", { params: { recipe_id: recipeId } });
    } else {
      await API.post("/add", { recipe_id: recipeId, email: email });
    }
  } catch (error: any) {
    console.error("Failed to toggle bookmark:", error.response?.data || error.message);
    throw error;
  }
}

/**
 * Fetch bookmarked recipes for the current user.
 */
export async function fetchBookmarks(): Promise<recipeDataType[]> {
  try {
    console.log("Calling route")
    const response = await API.get<recipeDataType[]>("/");
    console.log("Got the data")
    if (response.status !== 200) {
      throw new Error(`Failed to fetch bookmarks. Status: ${response.status}`);
    }

    return response.data;
  } catch (error: any) {
    console.error("Error fetching bookmarks:", error.response?.data || error.message);
    throw error;
  }
}
