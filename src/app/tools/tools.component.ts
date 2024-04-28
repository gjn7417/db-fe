import {Component, OnInit} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {IngredientsTableComponent} from "../ingredients-page/ingredients-table/ingredients-table.component";
import {MatButton} from "@angular/material/button";
import {MatCard, MatCardContent, MatCardHeader, MatCardSubtitle, MatCardTitle} from "@angular/material/card";
import {MatFormField, MatLabel} from "@angular/material/form-field";
import {MatGridList, MatGridTile} from "@angular/material/grid-list";
import {MatInput} from "@angular/material/input";
import {Tool} from "./tools-interface";
import {ToolService} from "./tool.service";
import {ToolsTableComponent} from "./tools-table/tools-table.component";

@Component({
  selector: 'app-tools',
  standalone: true,
  imports: [
    FormsModule,
    IngredientsTableComponent,
    MatButton,
    MatCard,
    MatCardContent,
    MatCardHeader,
    MatCardSubtitle,
    MatCardTitle,
    MatFormField,
    MatGridList,
    MatGridTile,
    MatInput,
    MatLabel,
    ReactiveFormsModule,
    ToolsTableComponent
  ],
  templateUrl: './tools.component.html',
  styleUrl: './tools.component.scss'
})
export class ToolsComponent implements OnInit {
  tools: Tool[] = [];

  newTool: Tool = {
    id: 0,
    name: '',
    brand: '',
  }

  updateTool: Tool = {
    id: 0,
    name: '',
    brand: '',
  }

  deleteToolId: number = 0;

  constructor(private toolService: ToolService) {}

  ngOnInit() {
    this.toolService.updateTools();
    this.toolService.getTools().subscribe((data: Tool[]) => {
      this.tools = data;
    });
  }

  submitCreateTool(data: Tool): void {
    this.toolService.createNewTool(data);
  }

  submitUpdateTool(data: Tool): void {
    this.toolService.updateTool(data);
  }

  submitDeleteTool(id: number): void {
    this.toolService.deleteTool(id);
  }


}
