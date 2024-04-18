export interface CreateRecipeForm {
  recipe_name: string;
  user_email: string;
  instructions: string;
  ingredients_list: string[];
  difficulty: number;
  time_in_min: number;
}
