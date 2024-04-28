import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Recipe, RecipeReview} from "./recipe-interface";
import {BehaviorSubject, Observable} from "rxjs";
import {RecipeTableItem} from "./recipe-table/recipe-table-datasource";
import {map} from "rxjs/operators";
import {Ingredient} from "../ingredients-page/ingredients-page-interfaces";
import {Tool} from "../tools/tools-interface";

@Injectable({
  providedIn: 'root'
})
export class RecipeService {
  private recipeData = new BehaviorSubject<RecipeTableItem[]>([]);

  constructor(private http: HttpClient) { }

  getRecipes(): Observable<RecipeTableItem[]> {
    return this.recipeData.asObservable();
  }

  updateRecipes(): void {
    this.http.get<RecipeTableItem[]>('http://127.0.0.1:8080/recipes/get-all-recipes')
      .subscribe(
        data => this.recipeData.next(data),
        error => console.error('Error updating ingredients', error)
      );
  }

  deleteRecipe(id: number): Observable<Object> {
    return this.http.delete('http://127.0.0.1:8080/recipes/delete-recipe', {params: {id: id.toString()}});
  }

  createNewRecipe(data: Recipe): void {
    this.http.post('http://127.0.0.1:8080/recipes/create-recipe', data)
      .subscribe(
        response => {
          console.log('Recipe created successfully', response);
        },
        error => console.error('Error creating ingredient', error)
      );
  }

  updateRecipe(data: Recipe): void {
    this.http.post('http://127.0.0.1:8080/recipes/update-recipe', data)
      .subscribe(
        response => {
          console.log('Recipe updated successfully', response);
        },
        error => console.error('Error creating ingredient', error)
      );
  }

  getRecipeReviews(id: number): Observable<Object>{
    return this.http.get<any[]>(`http://127.0.0.1:8080/recipes/get-recipe-reviews?id=${id}`).pipe(
      map(data => data.map(item => ({
        id: item.id,
        text: item.text,
        rating: item.rating,
        recipe_id: item.recipe_id
      } as RecipeReview)))
    );
  }

  getRecipeIngredients(id: number): Observable<Object>{
    return this.http.get<any[]>(`http://127.0.0.1:8080/recipes/get-recipe-ingredients?id=${id}`).pipe(
      map(data => data.map(item => ({
        name: item.name,
        id: item.id,
        food_category: item.food_category
      } as Ingredient)))
    );
  }

  getRecipeTools(id: number): Observable<Object> {
    return this.http.get<Tool[]>(`http://127.0.0.1:8080/recipes/get-recipe-tools?id=${id}`).pipe(
      map(data => data.map(item => ({
        id: item.id,
        name: item.name,
        brand: item.brand
      } as Tool)))
    );
  }

  createNewReview(data: RecipeReview): void {
    this.http.post('http://127.0.0.1:8080/recipes/create-recipe-review', data)
      .subscribe(
        response => {
          console.log('Revoiew created successfully', response);
        },
        error => console.error('Error creating review', error)
      );
  }

  updateReview(data: RecipeReview): void {
    this.http.post('http://127.0.0.1:8080/recipes/update-recipe-review', data)
      .subscribe(
        response => {
          console.log('Review created successfully', response);
        },
        error => console.error('Error creating review', error)
      );
  }

  deleteReview(id: number | undefined): void {
    if (id === undefined) return;
    this.http.delete('http://127.0.0.1:8080/recipes/delete-recipe-review', {params: {id: id.toString()}})
      .subscribe(
        response => {
          console.log('Review deleted successfully', response);
        },
        error => console.error('Error deleting review', error)
      );
  }

  getAverageRecipeRating(id: number): Observable<number> {
    return this.http.get<any>(`http://127.0.0.1:8080/reports/get-avg-rating-of-recipe?id=${id}`);
  }

}
