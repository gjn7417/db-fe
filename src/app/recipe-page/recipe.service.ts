import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {CreateRecipeForm} from "./recipe-interface";

@Injectable({
  providedIn: 'root'
})
export class RecipeService {

  constructor(private http: HttpClient) { }

  createNewRecipe(data: CreateRecipeForm): void {
    this.http.post('http://127.0.0.1:8080/recipes/create-recipe', data)
      .subscribe(
        response => {
          console.log('Recipe created successfully', response);
        },
        error => console.error('Error creating ingredient', error)
      );
  }
}
