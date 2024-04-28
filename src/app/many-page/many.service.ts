import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import {RecipeIngredient, RecipeTool, UpdateRecipeIngredient, UpdateRecipeTool} from './many-interface';

@Injectable({
  providedIn: 'root'
})
export class ManyService {
  private recipeIngredients = new BehaviorSubject<RecipeIngredient[]>([]);
  private recipeTools = new BehaviorSubject<RecipeTool[]>([]);

  constructor(private http: HttpClient) { }

  getRecipeIngredients(): Observable<RecipeIngredient[]> {
    return this.recipeIngredients.asObservable();
  }

  getRecipeTools(): Observable<RecipeTool[]> {
    return this.recipeTools.asObservable();
  }

  updateRecipeIngredients(): void {
    this.http.get<RecipeIngredient[]>('http://127.0.0.1:8080/many/get-recipe-ingredients')
      .subscribe(
        data => this.recipeIngredients.next(data),
        error => console.error('Error updating recipe ingredients', error)
      );
  }

  updateRecipeTools(): void {
    this.http.get<RecipeTool[]>('http://127.0.0.1:8080/many/get-recipe-tools')
      .subscribe(
        data => this.recipeTools.next(data),
        error => console.error('Error updating recipe tools', error)
      );
  }

  updateRecipeIngredient(data: UpdateRecipeIngredient): void {
    this.http.put('http://127.0.0.1:8080/many/update-recipe-ingredient', data)
      .subscribe(
        response => {
          console.log('Recipe ingredient updated successfully', response);
          this.updateRecipeIngredients();
        },
        error => console.error('Error updating recipe ingredient', error)
      );
  }

  updateRecipeTool(data: UpdateRecipeTool): void {
    this.http.put('http://127.0.0.1:8080/many/update-recipe-tool', data)
      .subscribe(
        response => {
          console.log('Recipe tool updated successfully', response);
          this.updateRecipeTools();
        },
        error => console.error('Error updating recipe tool', error)
      );
  }
}
