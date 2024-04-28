export interface RecipeIngredient {
  recipe_id: number;
  ingredient_id: number;
}

export interface UpdateRecipeIngredient {
  recipe_id: number;
  ingredient_id: number;
  new_recipe_id: number;
  new_ingredient_id: number;
}

export interface RecipeTool {
  recipe_id: number;
  tool_id: number;
}

export interface UpdateRecipeTool {
  recipe_id: number;
  tool_id: number;
  new_recipe_id: number;
  new_tool_id: number;
}
