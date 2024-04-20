import {Ingredient} from "../ingredients-page/ingredients-page-interfaces";

export interface Recipe {
  id?: number;
  recipe_name: string;
  user_email: string;
  instructions: string;
  ingredients_list: Ingredient[];
  difficulty: number;
  time_in_min: number;
  reviews?: RecipeReview[]
}

export interface RecipeReview {
  id: number;
  text: string;
  rating: number;
  recipe_id: number;
}
