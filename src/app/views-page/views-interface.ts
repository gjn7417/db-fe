export interface RecipeIngredientDetails {
  id: number;
  recipe_name: string;
  user_email: string;
  difficulty: string;
  time_in_min: number;
  instructions: string;
  ingredient_id: number;
  ingredient_name: string;
  food_category: string;
}

export interface UserRecipes {
  email: string;
  first_name: string;
  last_name: string;
  user_name: string;
  recipe_id: number;
  recipe_name: string;
  difficulty: string;
  time_in_min: number;
  instructions: string;
}
