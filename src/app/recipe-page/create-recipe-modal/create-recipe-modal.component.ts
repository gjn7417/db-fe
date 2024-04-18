import {Component} from '@angular/core';
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
  ],
  templateUrl: './create-recipe-modal.component.html',
  styleUrl: './create-recipe-modal.component.scss'
})
export class CreateRecipeModalComponent {
  constructor() {}
}
