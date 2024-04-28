import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA} from "@angular/material/dialog";
import {ToolService} from "../../tools/tool.service";
import {Tool} from "../../tools/tools-interface";
import {ToolsTableComponent} from "../../tools/tools-table/tools-table.component";
import {Recipe} from "../recipe-interface";
import {MatButton} from "@angular/material/button";
import {MatCard, MatCardContent, MatCardHeader, MatCardTitle} from "@angular/material/card";
import {MatFormField, MatLabel} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {NgIf} from "@angular/common";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {RecipeReviewFormComponent} from "../recipe-review-modal/recipe-review-form/recipe-review-form.component";

@Component({
  selector: 'app-recipe-tool-modal',
  standalone: true,
  imports: [
    ToolsTableComponent,
    MatButton,
    MatCard,
    MatCardContent,
    MatCardHeader,
    MatCardTitle,
    MatFormField,
    MatInput,
    MatLabel,
    NgIf,
    ReactiveFormsModule,
    RecipeReviewFormComponent,
    FormsModule
  ],
  templateUrl: './recipe-tool-modal.component.html',
  styleUrl: './recipe-tool-modal.component.scss'
})
export class RecipeToolModalComponent implements OnInit {
  deleteId: number | undefined;
  addId: number | undefined;
  isDelete: boolean;
  tools: Tool[] = [];
  recipe: Recipe;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
              private toolService: ToolService) {
    this.isDelete = data.isDelete;
    this.recipe = data.recipe;
  }

  ngOnInit() {
    this.toolService.updateTools();
    this.toolService.getTools().subscribe((data: Tool[]) => {
      this.tools = data;
    });
  }

  onAddTool(){
    this.toolService.addToolToRecipe(this.addId, this.recipe.id);
  }

  onDeleteTool(){
    if (this.deleteId && this.recipe.id){
      this.toolService.deleteToolFromRecipe(this.deleteId, this.recipe.id);
    }
  }

}
