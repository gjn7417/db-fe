import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {BehaviorSubject, catchError, Observable, of, tap} from "rxjs";
import {Ingredient} from "./ingredients-page-interfaces";

@Injectable({
  providedIn: 'root'
})
export class IngredientsServiceService {
  private ingredientsData = new BehaviorSubject<Ingredient[]>([]);

  constructor(private http: HttpClient) { }

  getIngredients(): Observable<Ingredient[]> {
    return this.ingredientsData.asObservable();
  }

  updateIngredients(): void {
    this.http.get<Ingredient[]>('http://127.0.0.1:8080/ingredients/get-all-ingredients')
      .subscribe(
        data => this.ingredientsData.next(data),
        error => console.error('Error updating ingredients', error)
      );
  }

  createNewIngredient(data: Ingredient): void {
    this.http.post('http://127.0.0.1:8080/ingredients/create-ingredient', data)
      .subscribe(
        response => {
          console.log('Ingredient created successfully', response);
          this.updateIngredients();
        },
        error => console.error('Error creating ingredient', error)
      );
  }

  updateIngredient(data: Ingredient): void {
    this.http.put('http://127.0.0.1:8080/ingredients/update-ingredient', data)
      .subscribe(
        response => {
          console.log('Ingredient Updated successfully', response);
          this.updateIngredients();
        },
        error => console.error('Error Updating ingredient', error)
      );
  }

  deleteIngredient(id: number): void {
    this.http.delete('http://127.0.0.1:8080/ingredients/delete-ingredient', {params: {id: id.toString()}})
      .subscribe(
        response => {
          console.log('Ingredient Deleted Successfully', response);
          this.updateIngredients();
        },
        error => console.error('Error Deleting Ingredient', error)
      );
  }
}
