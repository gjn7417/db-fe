import {Component, ViewChild} from '@angular/core';
import {ExpandableTableComponent} from "../expandable-table/expandable-table.component";
import {IngredientsTableComponent} from "./ingredients-table/ingredients-table.component";
import {MatCard, MatCardContent, MatCardHeader, MatCardSubtitle, MatCardTitle} from "@angular/material/card";
import {MatGridList, MatGridTile} from "@angular/material/grid-list";
import {MatFormField, MatFormFieldModule, MatLabel} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {MatButton} from "@angular/material/button";
import {FormsModule} from "@angular/forms";
import {IngredientsServiceService} from "./ingredients-service.service";
import {Ingredient} from "./ingredients-page-interfaces";

@Component({
  selector: 'app-ingredients-page',
  standalone: true,
  imports: [
    ExpandableTableComponent,
    IngredientsTableComponent,
    MatCard,
    MatCardContent,
    MatCardHeader,
    MatCardSubtitle,
    MatCardTitle,
    MatGridList,
    MatGridTile,
    MatFormField,
    MatFormFieldModule,
    MatLabel,
    MatInput,
    MatButton,
    FormsModule
  ],
  templateUrl: './ingredients-page.component.html',
  styleUrl: './ingredients-page.component.scss'
})
export class IngredientsPageComponent {
  @ViewChild(IngredientsTableComponent) ingredientsTableComponent!: IngredientsTableComponent;
  newIngredient: Ingredient = {
    name: '',
    food_category: ''
  };

  updateIngredient: Ingredient = {
    id: 0,
    name: '',
    food_category: ''
  };

  deleteIngredientId: number = 0;


  constructor(private ingredientsService: IngredientsServiceService) {}
  submitCreateIngredient(data: Ingredient): void {
    this.ingredientsService.createNewIngredient(data);
  }

  submitUpdateIngredient(data: Ingredient): void {
    this.ingredientsService.updateIngredient(data);
  }

  submitDeleteIngredient(): void {
    this.ingredientsService.deleteIngredient(this.deleteIngredientId);
  }
}
