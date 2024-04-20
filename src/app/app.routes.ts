import { Routes } from '@angular/router';
import {IngredientsPageComponent} from "./ingredients-page/ingredients-page.component";
import {RecipePageComponent} from "./recipe-page/recipe-page.component";
import {RecipeDisplayComponent} from "./recipe-page/recipe-display/recipe-display.component";

export const routes: Routes = [
  { path: 'ingredients', component: IngredientsPageComponent },
  { path: 'recipes', component: RecipePageComponent },
  { path: 'recipe-detail', component: RecipeDisplayComponent },
  { path: '', redirectTo: '/recipes', pathMatch: 'full' }
];
