import axios from "axios";
import type { recipeCreateDataType, recipeDataType } from "../../types/recipeType";

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

export async function submitNewRecipe(formData: recipeCreateDataType){
    const url = await API.post("/add", formData)
    console.log(url.data)
}
