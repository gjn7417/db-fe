import {Component, Input} from '@angular/core';
import {Tool} from "../tools-interface";
import {NgForOf} from "@angular/common";

@Component({
  selector: 'app-tools-table',
  standalone: true,
  imports: [
    NgForOf
  ],
  templateUrl: './tools-table.component.html',
  styleUrl: './tools-table.component.scss'
})
export class ToolsTableComponent {
  @Input() tools: Tool[] = [];

}
