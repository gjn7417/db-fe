import { Routes } from '@angular/router';
import {HomeComponent} from "./home/home.component";
import {IngredientsPageComponent} from "./ingredients-page/ingredients-page.component";
import {RecipePageComponent} from "./recipe-page/recipe-page.component";

export const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'ingredients', component: IngredientsPageComponent },
  { path: 'recipes', component: RecipePageComponent },
];
