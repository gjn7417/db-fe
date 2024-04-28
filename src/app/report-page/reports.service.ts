import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { BehaviorSubject, Observable } from "rxjs";
import { RecipeReviewSummary, UserRecipeSummary } from "./reports-interface";

@Injectable({
  providedIn: 'root'
})
export class ReportService {
  private topRecipeReviewData = new BehaviorSubject<RecipeReviewSummary[]>([]);
  private leastRecipeReviewData = new BehaviorSubject<RecipeReviewSummary[]>([]);
  private userRecipeData = new BehaviorSubject<UserRecipeSummary[]>([]);

  constructor(private http: HttpClient) { }

  updateTopRecipeReviews(): void {
    this.http.get<RecipeReviewSummary[]>('http://127.0.0.1:8080/reports/get-top-rated-recipes')
      .subscribe(
        data => this.topRecipeReviewData.next(data),
        error => console.error('Error updating recipe reviews', error)
      );
  }

  getTopRecipeReviews(): Observable<RecipeReviewSummary[]> {
    return this.topRecipeReviewData.asObservable();
  }

  updateLeastRecipeReviews(): void {
    this.http.get<RecipeReviewSummary[]>('http://127.0.0.1:8080/reports/get-least-rated-recipes')
      .subscribe(
        data => this.leastRecipeReviewData.next(data),
        error => console.error('Error updating recipe reviews', error)
      );
  }

  getLEastRecipeReviews(): Observable<RecipeReviewSummary[]> {
    return this.leastRecipeReviewData.asObservable();
  }

  updateUserRecipes(): void {
    this.http.get<UserRecipeSummary[]>('http://127.0.0.1:8080/reports/get-most-active-users')
      .subscribe(
        data => this.userRecipeData.next(data),
        error => console.error('Error updating user recipes', error)
      );
  }

  getUserRecipes(): Observable<UserRecipeSummary[]> {
    return this.userRecipeData.asObservable();
  }
}
