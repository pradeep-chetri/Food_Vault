export interface recipeCreateDataType {
    title: string;
    description: string;
    image_url: string;
    tags: string[];
    author: string
}

export interface recipeDataType extends recipeCreateDataType{
    id: number;
}

export interface BookmarkFormData {
    email: string;
    recipe_id: number;
}