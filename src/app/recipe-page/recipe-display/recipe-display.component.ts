import {Component, Input, OnInit} from '@angular/core';
import {Recipe, RecipeReview} from "../recipe-interface";
import {Router} from "@angular/router";
import {NgForOf, NgIf} from "@angular/common";
import {ExpandableTableComponent} from "../../expandable-table/expandable-table.component";
import {MatCard, MatCardContent, MatCardHeader, MatCardSubtitle, MatCardTitle} from "@angular/material/card";
import {MatGridList, MatGridTile} from "@angular/material/grid-list";
import {MatButton} from "@angular/material/button";
import {MatDialog} from "@angular/material/dialog";
import {CreateRecipeModalComponent} from "../create-recipe-modal/create-recipe-modal.component";
import {RecipeService} from "../recipe.service";
import {Ingredient} from "../../ingredients-page/ingredients-page-interfaces";
import {RecipeReviewModalComponent} from "../recipe-review-modal/recipe-review-modal.component";

@Component({
  selector: 'app-recipe-display',
  standalone: true,
  imports: [
    NgIf,
    NgForOf,
    ExpandableTableComponent,
    MatCard,
    MatCardContent,
    MatCardHeader,
    MatCardSubtitle,
    MatCardTitle,
    MatGridList,
    MatGridTile,
    MatButton
  ],
  templateUrl: './recipe-display.component.html',
  styleUrl: './recipe-display.component.scss'
})
export class RecipeDisplayComponent implements OnInit {

  // @ts-ignore
  @Input() recipe: Recipe;

  constructor(private router: Router, public dialog: MatDialog, private recipeService: RecipeService) {
    const navigation = this.router.getCurrentNavigation();
    // @ts-ignore
    this.recipe = navigation?.extras.state['recipe'] as Recipe;
    console.log(this.recipe)
  }

  ngOnInit(): void {
    if(this.recipe.id){
      this.recipeService.getRecipeReviews(this.recipe.id).subscribe(data => {
        this.recipe.reviews = data as RecipeReview[];
      });

      this.recipeService.getRecipeIngredients(this.recipe.id).subscribe(data => {
        console.log(data)
        this.recipe.ingredients_list = data as Ingredient[];
      });
    }
  }

  onEditRecipeClick(recipe: Recipe): void {
    const dialogRef = this.dialog.open(CreateRecipeModalComponent, {
      height: '80%',
      width: '60%',
      data: {
        recipe: recipe,
        isEdit: true
      }
    });
  }

  onAddReviewClick(recipe: Recipe): void {
    const dialogRef = this.dialog.open(RecipeReviewModalComponent, {
      height: '80%',
      width: '60%',
      data: {
        recipe: recipe,
        isEdit: false,
        isDelete: false
      }
    });
  }

  onEditReviewClick(recipe: Recipe): void {
    const dialogRef = this.dialog.open(RecipeReviewModalComponent, {
      height: '80%',
      width: '60%',
      data: {
        recipe: recipe,
        isEdit: true,
        isDelete: false
      }
    });
  }

  onDeleteReviewClick(recipe: Recipe): void {
    const dialogRef = this.dialog.open(RecipeReviewModalComponent, {
      height: '80%',
      width: '60%',
      data: {
        recipe: recipe,
        isEdit: true,
        isDelete: true
      }
    });
  }

}
