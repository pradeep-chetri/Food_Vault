import axios from "axios";
import type { recipeCreate, recipeDataType } from "../../types/recipeType";

const API = axios.create({
  baseURL: "http://localhost:8000/api/recipes",
});

export async function fetchRecipeData(): Promise<recipeDataType[]>{
    const response = await API.get<recipeDataType[]>("");
    const status = response.status
    const data = response.data

    if(!status){
        throw new Error(`Error Fetching recipes: ${response.statusText}`);
    }

    return data
}

export async function submitNewRecipe(formData: recipeCreate){
    const url = await API.post("/add", formData)
    return url.data
}
