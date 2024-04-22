import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {
  IngredientChipSelectComponent
} from "../../../ingredients-page/ingredient-chip-select/ingredient-chip-select.component";
import {MatFormField, MatLabel} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {MatOption, MatSelect} from "@angular/material/select";
import {NgForOf, NgIf} from "@angular/common";

@Component({
  selector: 'app-recipe-review-form',
  standalone: true,
  imports: [
    IngredientChipSelectComponent,
    MatFormField,
    MatInput,
    MatLabel,
    ReactiveFormsModule,
    MatSelect,
    MatOption,
    NgForOf,
    NgIf
  ],
  templateUrl: './recipe-review-form.component.html',
  styleUrl: './recipe-review-form.component.scss'
})
export class RecipeReviewFormComponent implements OnInit {
  @Input() isEdit: boolean | undefined;

  // @ts-ignore
  reviewForm: FormGroup;
  ratings: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  constructor(private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.reviewForm = this.formBuilder.group({
      id: [''],
      text: ['', Validators.required],
      rating: ['', Validators.required]
    });
  }

  public getReviewForm(): FormGroup {
    return this.reviewForm;
  }

}
