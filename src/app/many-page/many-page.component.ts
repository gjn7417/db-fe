import {Component, OnInit} from '@angular/core';
import {RecipeIngredient, RecipeTool, UpdateRecipeIngredient, UpdateRecipeTool} from "./many-interface";
import {ManyService} from "./many.service";
import {NgForOf} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {MatButton} from "@angular/material/button";
import {MatCard, MatCardContent, MatCardHeader, MatCardSubtitle, MatCardTitle} from "@angular/material/card";
import {MatFormField, MatLabel} from "@angular/material/form-field";
import {MatGridList, MatGridTile} from "@angular/material/grid-list";
import {MatInput} from "@angular/material/input";

@Component({
  selector: 'app-many-page',
  standalone: true,
  imports: [
    NgForOf,
    FormsModule,
    MatButton,
    MatCard,
    MatCardContent,
    MatCardHeader,
    MatCardSubtitle,
    MatCardTitle,
    MatFormField,
    MatGridList,
    MatGridTile,
    MatInput,
    MatLabel
  ],
  templateUrl: './many-page.component.html',
  styleUrl: './many-page.component.scss'
})
export class ManyPageComponent implements OnInit {
  recipeIngredients: RecipeIngredient[] = [];
  recipeTools: RecipeTool[] = [];

  updateRecipeIgredient: UpdateRecipeIngredient = {
    recipe_id: 0,
    ingredient_id: 0,
    new_recipe_id: 0,
    new_ingredient_id: 0
  }

  updateRecipeTool: UpdateRecipeTool  = {
    recipe_id: 0,
    tool_id: 0,
    new_recipe_id: 0,
    new_tool_id: 0
  }

  constructor(private manyService: ManyService) {}

  ngOnInit() {
    this.manyService.updateRecipeIngredients();
    this.manyService.updateRecipeTools();
    this.manyService.getRecipeIngredients().subscribe(data => {
      this.recipeIngredients = data;
    });
    this.manyService.getRecipeTools().subscribe(data => {
      this.recipeTools = data;
    });
  }

  submitUpdateRecipeIngredient(): void {
    this.manyService.updateRecipeIngredient(this.updateRecipeIgredient);
  }

  submitUpdateRecipeTool(): void {
    this.manyService.updateRecipeTool(this.updateRecipeTool);
  }


}
