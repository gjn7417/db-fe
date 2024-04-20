import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {MatFormField, MatLabel} from "@angular/material/form-field";
import {MatButton} from "@angular/material/button";
import {MatInput} from "@angular/material/input";
import {
  IngredientChipSelectComponent
} from "../../ingredients-page/ingredient-chip-select/ingredient-chip-select.component";
import {RecipeService} from "../recipe.service";
import {Recipe} from "../recipe-interface";
import {UserService} from "../../users/user.service";
import {Ingredient} from "../../ingredients-page/ingredients-page-interfaces";

@Component({
  selector: 'app-recipe-form',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    MatFormField,
    MatButton,
    MatInput,
    MatLabel,
    IngredientChipSelectComponent
  ],
  templateUrl: './recipe-form.component.html',
  styleUrl: './recipe-form.component.scss'
})
export class RecipeFormComponent implements OnInit{
  @Input() recipe: Recipe | undefined;

  // @ts-ignore
  recipeForm: FormGroup;


  constructor(private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.recipeForm = this.formBuilder.group({
      recipe_name: [this.recipe?.recipe_name || '', Validators.required],
      instructions: [this.recipe?.instructions || '', Validators.required],
      ingredients_list: [this.recipe?.ingredients_list || [], Validators.required],
      difficulty: [this.recipe?.difficulty || 0, Validators.required],
      time_in_min: [this.recipe?.time_in_min || 0, Validators.required]
    });
  }

  onIngredientsList(ingredientsList: Ingredient[]): void {
    // @ts-ignore
    this.recipeForm.get('ingredients_list').setValue(ingredientsList);
    // @ts-ignore
    console.log('Ingredients list from child component: ', this.recipeForm.get('ingredients_list').value);
  }

  public getRecipeForm(): FormGroup {
    return this.recipeForm;
  }

  protected readonly FormControl = FormControl;
}
