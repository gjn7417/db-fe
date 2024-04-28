import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import { MatTableModule, MatTable } from '@angular/material/table';
import { MatPaginatorModule, MatPaginator } from '@angular/material/paginator';
import { MatSortModule, MatSort } from '@angular/material/sort';
import { RecipeTableDataSource, RecipeTableItem } from './recipe-table-datasource';
import {MatButton} from "@angular/material/button";
import {UserCreateModalComponent} from "../../users/user-create-modal/user-create-modal.component";
import {MatDialog} from "@angular/material/dialog";
import {CreateRecipeModalComponent} from "../create-recipe-modal/create-recipe-modal.component";
import {RecipeService} from "../recipe.service";
import {NavigationExtras, Router} from "@angular/router";
import {Recipe} from "../recipe-interface";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatCard, MatCardContent, MatCardHeader, MatCardSubtitle, MatCardTitle} from "@angular/material/card";
import {MatFormField, MatLabel} from "@angular/material/form-field";
import {MatGridList, MatGridTile} from "@angular/material/grid-list";
import {MatInput} from "@angular/material/input";

@Component({
  selector: 'app-recipe-table',
  templateUrl: './recipe-table.component.html',
  styleUrl: './recipe-table.component.scss',
  standalone: true,
  imports: [MatTableModule, MatPaginatorModule, MatSortModule, MatButton, FormsModule, MatCard, MatCardContent, MatCardHeader, MatCardSubtitle, MatCardTitle, MatFormField, MatGridList, MatGridTile, MatInput, MatLabel, ReactiveFormsModule]
})
export class RecipeTableComponent implements AfterViewInit, OnInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatTable) table!: MatTable<RecipeTableItem>;
  dataSource = new RecipeTableDataSource();

  deleteRecipeId: number = 0;

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['id', 'recipe_name', 'user_email', 'difficulty', 'time_in_min'];

  constructor(public dialog: MatDialog, private recipeService: RecipeService, private router: Router) {
  }
  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.table.dataSource = this.dataSource;
  }

  ngOnInit(): void {
    this.recipeService.updateRecipes();
    this.recipeService.getRecipes().subscribe(data => {
      this.dataSource.data = data;
    });
  }

  onCreateRecipeClick(): void {
    const dialogRef = this.dialog.open(CreateRecipeModalComponent, {
      height: '80%',
      width: '60%',
      data: {
        isEdit: false,
        recipe: null
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

  navigateToNewPageWithObject(recipe: Recipe) {
    console.log(recipe)
    let navigationExtras: NavigationExtras = {
      state: {
        recipe: recipe
      }
    };
    this.router.navigate(['/recipe-detail'], navigationExtras);
  }

  submitDeleteRecipe() {
    this.recipeService.deleteRecipe(this.deleteRecipeId).subscribe(data => {
      this.recipeService.updateRecipes();
    });
  }

}
