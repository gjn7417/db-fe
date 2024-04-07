import { Routes } from '@angular/router';
import {HomeComponent} from "./home/home.component";
import {AuthComponent} from "./auth/auth.component";
import {IngredientsPageComponent} from "./ingredients-page/ingredients-page.component";

export const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'login', component: AuthComponent },
  { path: 'ingredients', component: IngredientsPageComponent },
];
