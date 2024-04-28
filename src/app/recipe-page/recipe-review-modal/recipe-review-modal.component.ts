import {Component, Inject, ViewChild} from '@angular/core';
import {MAT_DIALOG_DATA} from "@angular/material/dialog";
import {UserService} from "../../users/user.service";
import {RecipeService} from "../recipe.service";
import {Recipe, RecipeReview} from "../recipe-interface";
import {MatButton} from "@angular/material/button";
import {MatCard, MatCardContent, MatCardHeader, MatCardTitle} from "@angular/material/card";
import {NgIf} from "@angular/common";
import {RecipeFormComponent} from "../recipe-form/recipe-form.component";
import {FormGroup, FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatFormField, MatLabel} from "@angular/material/form-field";
import {RecipeReviewFormComponent} from "./recipe-review-form/recipe-review-form.component";
import {MatInput} from "@angular/material/input";

@Component({
  selector: 'app-recipe-review-modal',
  standalone: true,
  imports: [
    MatButton,
    MatCard,
    MatCardContent,
    MatCardHeader,
    MatCardTitle,
    NgIf,
    RecipeFormComponent,
    FormsModule,
    MatFormField,
    RecipeReviewFormComponent,
    MatInput,
    MatLabel,
    ReactiveFormsModule
  ],
  templateUrl: './recipe-review-modal.component.html',
  styleUrl: './recipe-review-modal.component.scss'
})
export class RecipeReviewModalComponent {
  deleteId: number | undefined;
  isDelete: boolean;
  isEdit: boolean;
  recipe: Recipe;

  @ViewChild(RecipeReviewFormComponent) reviewFormComponent: RecipeReviewFormComponent | undefined;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private userService: UserService,
              private recipeService: RecipeService) {
    this.isEdit = data.isEdit;
    this.recipe = data.recipe;
    this.isDelete = data.isDelete;
    console.log('Recipe', this.recipe)
    console.log('Edit', this.isEdit)
  }

  onCreateReview(){
    let reviewForm = this.reviewFormComponent?.getReviewForm();
    if (reviewForm?.valid) {
      let review: RecipeReview = reviewForm?.value;
      review.recipe_id = this.recipe.id;
      console.log("CREATE REVIEW FORM: ", review);
      this.recipeService.createNewReview(review)
    }
  }

  onUpdateReview(){
    let reviewForm = this.reviewFormComponent?.getReviewForm();
    if (reviewForm?.valid) {
      let review: RecipeReview = reviewForm?.value;
      review.recipe_id = this.recipe.id;
      console.log("UPDATE REVIEW FORM: ", review);
      this.recipeService.updateReview(review)
    }
  }

  onDeleteReview(){
    console.log("DELETE REVIEW FORM: ", this.deleteId);
    this.recipeService.deleteReview(this.deleteId);
  }

}
