import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {MatFormField, MatLabel} from "@angular/material/form-field";
import {MatButton} from "@angular/material/button";
import {MatInput} from "@angular/material/input";
import {
  IngredientChipSelectComponent
} from "../../ingredients-page/ingredient-chip-select/ingredient-chip-select.component";
import {RecipeService} from "../recipe.service";
import {CreateRecipeForm} from "../recipe-interface";
import {UserService} from "../../users/user.service";

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
  // @ts-ignore
  recipeForm: FormGroup;


  constructor(private formBuilder: FormBuilder, private recipeService: RecipeService,
              private userService: UserService) {}

  ngOnInit(): void {
    this.recipeForm = this.formBuilder.group({
      recipe_name: ['', Validators.required],
      instructions: ['', Validators.required],
      ingredients_list: [[], Validators.required],
      difficulty: [0, Validators.required],
      time_in_min: [0, Validators.required]
    });
  }

  onIngredientsList(ingredientsList: string[]): void {
    // @ts-ignore
    this.recipeForm.get('ingredients_list').setValue(ingredientsList);
    // @ts-ignore
    console.log('Ingredients list from child component: ', this.recipeForm.get('ingredients_list').value);
  }

  onSubmit(): void {
    if (this.recipeForm.valid) {
      console.log(this.recipeForm.value);
      let recipe: CreateRecipeForm = this.recipeForm.value;
      recipe['user_email'] = this.userService.getActiveUser();
      console.log("RECIPE FORM: ", recipe);
      this.recipeService.createNewRecipe(recipe)

    }
  }

  protected readonly FormControl = FormControl;
}
