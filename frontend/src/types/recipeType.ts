export interface Tag {
  name: string;
}

interface Ingredient {
  ingredient: string;
}

interface Instruction {
  instruction: string;
}

export interface recipeCreate {
  title: string;
  image_url: string;
  description: string;
  tags: Tag[];
  author: string;
  ingredients: Ingredient[];
  instructions: Instruction[];
  prep_time: number;
  cook_time: number;
  servings: number;
  difficulty: "Easy" | "Medium" | "Hard";
  chef_note: string
}

export interface recipeDataType extends recipeCreate {
  id: number;
  publish_date?: string;  // optional if missing
}

export interface BookmarkFormData {
  email: string;
  recipe_id: number;
}
