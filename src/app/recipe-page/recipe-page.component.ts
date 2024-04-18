import {Component} from '@angular/core';
import {RecipeTableComponent} from "./recipe-table/recipe-table.component";

@Component({
  selector: 'app-recipe-page',
  standalone: true,
  imports: [
    RecipeTableComponent
  ],
  templateUrl: './recipe-page.component.html',
  styleUrl: './recipe-page.component.scss'
})
export class RecipePageComponent {

}
