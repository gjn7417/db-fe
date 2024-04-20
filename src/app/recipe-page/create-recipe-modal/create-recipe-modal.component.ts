import {Component, Inject, ViewChild} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatStepperModule} from '@angular/material/stepper';
import {MatButtonModule} from '@angular/material/button';
import {
  IngredientChipSelectComponent
} from "../../ingredients-page/ingredient-chip-select/ingredient-chip-select.component";
import {ExpandableTableComponent} from "../../expandable-table/expandable-table.component";
import {MatCard, MatCardContent, MatCardHeader, MatCardSubtitle, MatCardTitle} from "@angular/material/card";
import {RecipeFormComponent} from "../recipe-form/recipe-form.component";
import {MAT_DIALOG_DATA} from "@angular/material/dialog";
import {Recipe} from "../recipe-interface";
import {NgIf} from "@angular/common";
import {UserService} from "../../users/user.service";
import {RecipeService} from "../recipe.service";

@Component({
  selector: 'app-create-recipe-modal',
  standalone: true,
  imports: [
    IngredientChipSelectComponent,
    MatButtonModule,
    MatStepperModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    ExpandableTableComponent,
    MatCard,
    MatCardContent,
    MatCardHeader,
    MatCardSubtitle,
    MatCardTitle,
    RecipeFormComponent,
    NgIf,
  ],
  templateUrl: './create-recipe-modal.component.html',
  styleUrl: './create-recipe-modal.component.scss'
})
export class CreateRecipeModalComponent {
  isEdit: boolean;
  recipe: Recipe;

  @ViewChild(RecipeFormComponent) recipeFormComponent: RecipeFormComponent | undefined;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private userService: UserService,
              private recipeService: RecipeService) {
    this.isEdit = data.isEdit;
    this.recipe = data.recipe;
    console.log('Recipe', this.recipe)
    console.log('Edit', this.isEdit)
  }

  onClick(){
    console.log('Recipe form', this.recipeFormComponent?.getRecipeForm())
  }

  onCreateRecipe(): void {
    let recipeForm = this.recipeFormComponent?.getRecipeForm();
    if (recipeForm?.valid) {
      let recipe: Recipe = recipeForm?.value;
      recipe['user_email'] = this.userService.getActiveUser();
      console.log("RECIPE FORM: ", recipe);
      this.recipeService.createNewRecipe(recipe)

    }
  }

  onUpdateRecipe(): void {
    let recipeForm = this.recipeFormComponent?.getRecipeForm();
    if (recipeForm?.valid) {
      let recipe: Recipe = recipeForm?.value;
      recipe['user_email'] = this.recipe.user_email || this.userService.getActiveUser();
      recipe['id'] = this.recipe.id;
      console.log("UPDATE FORM: ", recipe);
      this.recipeService.updateRecipe(recipe)
    }
  }
}
