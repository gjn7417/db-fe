import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import {RecipeIngredientDetails, UserRecipes} from "./views-interface";

@Injectable({
  providedIn: 'root'
})
export class ViewsService {
  private recipeIngredientDetailsData: BehaviorSubject<RecipeIngredientDetails[]> = new BehaviorSubject<RecipeIngredientDetails[]>([]);
  private userRecipesData: BehaviorSubject<UserRecipes[]> = new BehaviorSubject<UserRecipes[]>([]);

  constructor(private http: HttpClient) { }

  getRecipeIngredientDetails(): BehaviorSubject<RecipeIngredientDetails[]> {
    return this.recipeIngredientDetailsData;
  }

  updateRecipeIngredientDetails(): void {
    this.http.get<RecipeIngredientDetails[]>('http://127.0.0.1:8080/views/get-recipe-ingredient-details')
      .subscribe(
        data => this.recipeIngredientDetailsData.next(data),
        error => console.error('Error updating recipe ingredient details', error)
      );
  }

  getUserRecipes(): BehaviorSubject<UserRecipes[]> {
    return this.userRecipesData;
  }

  updateUserRecipes(): void {
    this.http.get<UserRecipes[]>('http://127.0.0.1:8080/views/get-user-recipes')
      .subscribe(
        data => this.userRecipesData.next(data),
        error => console.error('Error updating user recipes', error)
      );
  }
}
