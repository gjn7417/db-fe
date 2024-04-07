import {AfterViewInit, ChangeDetectorRef, Component, OnInit, ViewChild} from '@angular/core';
import { MatTableModule, MatTable } from '@angular/material/table';
import { MatPaginatorModule, MatPaginator } from '@angular/material/paginator';
import { MatSortModule, MatSort } from '@angular/material/sort';
import { IngredientsTableDataSource, IngredientsTableItem } from './ingredients-table-datasource';
import {IngredientsServiceService} from "../ingredients-service.service";

@Component({
  selector: 'app-ingredients-table',
  templateUrl: './ingredients-table.component.html',
  styleUrl: './ingredients-table.component.scss',
  standalone: true,
  imports: [MatTableModule, MatPaginatorModule, MatSortModule]
})
export class IngredientsTableComponent implements AfterViewInit, OnInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatTable) table!: MatTable<IngredientsTableItem>;
  dataSource: IngredientsTableDataSource = new IngredientsTableDataSource();

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['id', 'name', 'food_category'];

  constructor(private ingredientsService: IngredientsServiceService,
              private changeDetectorRef: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.ingredientsService.updateIngredients();
    this.ingredientsService.getIngredients().subscribe(data => {
      this.dataSource.data = data;
    });
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.table.dataSource = this.dataSource;
  }
}
