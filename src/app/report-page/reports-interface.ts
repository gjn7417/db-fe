export interface RecipeReviewSummary {
  recipe_name: string;
  average_rating: number;
  number_of_reviews: number;
}

export interface UserRecipeSummary {
  email: string;
  number_of_recipes: number;
  average_rating: number;
}
