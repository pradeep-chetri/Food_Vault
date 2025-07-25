
const API_BASE_URL = "http://localhost:8000/api";
import type { recipeCardDataType } from "../types/recipeCardDataType";

export async function fetchRecipeData(): Promise<recipeCardDataType[]>{
    const url = `${API_BASE_URL}/recipes`;
    const response = await fetch(url);

    if(!response.ok){
        throw new Error(`Error Fetching recipes: ${response.statusText}`);
    }

    return response.json()
}