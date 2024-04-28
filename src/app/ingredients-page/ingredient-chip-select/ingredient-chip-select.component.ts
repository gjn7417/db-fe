import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {Component, ElementRef, ViewChild, inject, Output, EventEmitter, OnInit, Input} from '@angular/core';
import {FormControl, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatAutocompleteSelectedEvent, MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatChipInputEvent, MatChipsModule} from '@angular/material/chips';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import {MatIconModule} from '@angular/material/icon';
import {AsyncPipe} from '@angular/common';
import {MatFormFieldModule} from '@angular/material/form-field';
import {LiveAnnouncer} from '@angular/cdk/a11y';
import {IngredientsServiceService} from "../ingredients-service.service";
import {Ingredient} from "../ingredients-page-interfaces";
import {Recipe} from "../../recipe-page/recipe-interface";

@Component({
  selector: 'app-ingredient-chip-select',
  standalone: true,
  imports: [FormsModule,
    MatFormFieldModule,
    MatChipsModule,
    MatIconModule,
    MatAutocompleteModule,
    ReactiveFormsModule,
    AsyncPipe,],
  templateUrl: './ingredient-chip-select.component.html',
  styleUrl: './ingredient-chip-select.component.scss'
})
export class IngredientChipSelectComponent implements OnInit {
  @Input() recipe: Recipe | undefined;

  // @ts-ignore
  @Output() ingredientsList = new EventEmitter<Ingredient[]>();

  separatorKeysCodes: number[] = [ENTER, COMMA];
  ingredientCtrl: FormControl<Ingredient | null> = new FormControl(null);
  filteredIngredients: Observable<Ingredient[]>;
  ingredients: Ingredient[] = [];
  allIngredients: Ingredient[] = [];

  @ViewChild('ingredientInput') fruitInput: ElementRef<HTMLInputElement> | undefined;

  announcer = inject(LiveAnnouncer);

  constructor(private ingredientsService: IngredientsServiceService) {
    this.filteredIngredients = this.ingredientCtrl.valueChanges.pipe(
      startWith(null),
      map((ingredient: Ingredient | null) => (ingredient ? this._filter(ingredient.name) : this.allIngredients.slice())),
    );
  }

  ngOnInit() {
    this.ingredientsService.updateIngredients();
    this.ingredientsService.getIngredients().subscribe(data => {
      this.allIngredients = data;
    });
    if(this.recipe){
      this.ingredients = this.recipe.ingredients_list;
    }
    console.log(this.allIngredients)
  }

  emitIngredientsList(): void {
    // @ts-ignore
    this.ingredientsList.emit(this.ingredients); // Emit the event with the list of fruits
  }

  add(event: MatChipInputEvent): void {
    const value: any = (event.value || '').trim();

    // Add our fruit
    if (value) {
      this.ingredients.push(value);
    }

    this.emitIngredientsList();

    // Clear the input value
    event.chipInput!.clear();

    this.ingredientCtrl.setValue(null);
  }

  remove(fruit: Ingredient): void {
    const index = this.ingredients.indexOf(fruit);

    if (index >= 0) {
      this.ingredients.splice(index, 1);
      this.emitIngredientsList();

      this.announcer.announce(`Removed ${fruit}`);
    }
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    this.ingredients.push(event.option.value);
    this.emitIngredientsList();
    // @ts-ignore
    this.fruitInput.nativeElement.value = '';
    this.ingredientCtrl.setValue(null);
  }

  private _filter(value: string): Ingredient[] {
    const filterValue = value.toLowerCase();
    return this.allIngredients.filter(ingredient => ingredient.name.toLowerCase().includes(filterValue));
  }
}
