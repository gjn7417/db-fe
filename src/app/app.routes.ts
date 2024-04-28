import { Routes } from '@angular/router';
import {IngredientsPageComponent} from "./ingredients-page/ingredients-page.component";
import {RecipePageComponent} from "./recipe-page/recipe-page.component";
import {RecipeDisplayComponent} from "./recipe-page/recipe-display/recipe-display.component";
import {UsersPageComponent} from "./users/users-page/users-page.component";
import {ToolsComponent} from "./tools/tools.component";
import {ViewsPageComponent} from "./views-page/views-page.component";
import {ManyPageComponent} from "./many-page/many-page.component";
import {AuditPageComponent} from "./audit-page/audit-page.component";
import {ReportPageComponent} from "./report-page/report-page.component";

export const routes: Routes = [
  { path: 'ingredients', component: IngredientsPageComponent },
  { path: 'recipes', component: RecipePageComponent },
  { path: 'recipe-detail', component: RecipeDisplayComponent },
  { path: 'users', component: UsersPageComponent },
  { path: 'tools', component: ToolsComponent },
  { path: 'views', component: ViewsPageComponent },
  { path: 'many', component: ManyPageComponent },
  { path: 'audit', component: AuditPageComponent },
  { path: 'report', component: ReportPageComponent },
  { path: '', redirectTo: '/recipes', pathMatch: 'full' }
];
