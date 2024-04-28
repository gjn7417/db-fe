import { Injectable } from '@angular/core';
import {Tool} from "./tools-interface";
import {HttpClient} from "@angular/common/http";
import {BehaviorSubject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ToolService {
  private toolsData: BehaviorSubject<Tool[]> = new BehaviorSubject<Tool[]>([]);


  constructor(private http: HttpClient) { }

  getTools(): BehaviorSubject<Tool[]> {
    return this.toolsData;
  }

  updateTools(): void {
    this.http.get<Tool[]>('http://127.0.0.1:8080/tools/get-all-tools')
      .subscribe(
        data => this.toolsData.next(data),
        error => console.error('Error updating tools', error)
      );
  }

  createNewTool(data: Tool): void {
    this.http.post('http://127.0.0.1:8080/tools/create-tool', data)
      .subscribe(
        response => {
          console.log('Tool created successfully', response);
          this.updateTools();
        },
        error => console.error('Error creating tool', error)
      );
  }

  updateTool(data: Tool): void {
    this.http.put('http://127.0.0.1:8080/tools/update-tool', data)
      .subscribe(
        response => {
          console.log('Tool Updated successfully', response);
          this.updateTools();
        },
        error => console.error('Error Updating Tool', error)
      );
  }

  deleteTool(id: number): void {
    this.http.delete('http://127.0.0.1:8080/tools/delete-tool', {params: {id: id.toString()}})
      .subscribe(
        response => {
          console.log('Tool Deleted Successfully', response);
          this.updateTools();
        },
        error => console.error('Error Deleting Tool', error)
      );
  }

  addToolToRecipe(toolId: number | undefined, recipeId: number | undefined): void {
    this.http.post('http://127.0.0.1:8080/recipes/add-recipe-tool', {tool_id: toolId, recipe_id: recipeId})
      .subscribe(
        response => {
          console.log('Tool added to recipe successfully', response);
        },
        error => console.error('Error adding tool to recipe', error)
      );
  }

  deleteToolFromRecipe(toolId: number, recipeId: number): void {
    this.http.delete('http://127.0.0.1:8080/recipes/delete-recipe-tool', {params: {tool_id: toolId.toString(),
        recipe_id: recipeId.toString()}})
      .subscribe(
        response => {
          console.log('Tool deleted from recipe successfully', response);
        },
        error => console.error('Error deleting tool from recipe', error)
      )
  }
}

