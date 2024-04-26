import {Component, OnInit} from '@angular/core';
import {ViewsService} from "./views.service";
import {RecipeIngredientDetails, UserRecipes} from "./views-interface";
import {NgForOf} from "@angular/common";

@Component({
  selector: 'app-views-page',
  standalone: true,
  imports: [
    NgForOf
  ],
  templateUrl: './views-page.component.html',
  styleUrl: './views-page.component.scss'
})
export class ViewsPageComponent implements OnInit {
  recipeIngredientDetails: RecipeIngredientDetails[] = [];
  userRecipes: UserRecipes[] = [];

  constructor(private viewsService: ViewsService) {}

  ngOnInit() {
    this.viewsService.updateRecipeIngredientDetails();
    this.viewsService.updateUserRecipes();
    this.viewsService.getRecipeIngredientDetails().subscribe((data: RecipeIngredientDetails[]) => {
      this.recipeIngredientDetails = data;
    });
    this.viewsService.getUserRecipes().subscribe((data: UserRecipes[]) => {
      this.userRecipes = data;
    });
  }

}
