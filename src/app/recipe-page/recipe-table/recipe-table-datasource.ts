import { DataSource } from '@angular/cdk/collections';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { map } from 'rxjs/operators';
import { Observable, of as observableOf, merge } from 'rxjs';

// TODO: Replace this with your own data model type
export interface RecipeTableItem {
  recipe_name: string;
  id: number;
  user_email: string;
  difficulty: number;
  time_in_min: number;
  instructions: string;
}

// Used for testing
const EXAMPLE_DATA: RecipeTableItem[] = [
  {id: 1, recipe_name: 'Hydrogen', user_email: 'H', difficulty: 1, time_in_min: 1, instructions: 'Do this first'},
  {id: 6, recipe_name: 'Carbon', user_email: 'C', difficulty: 2, time_in_min: 10, instructions: 'Mix ingredients'},
  {id: 7, recipe_name: 'Nitrogen', user_email: 'N', difficulty: 3, time_in_min: 15, instructions: 'Bake for 15 minutes'},
  {id: 8, recipe_name: 'Oxygen', user_email: 'O', difficulty: 1, time_in_min: 5, instructions: 'Stir and serve'},
  {id: 9, recipe_name: 'Fluorine', user_email: 'F', difficulty: 4, time_in_min: 20, instructions: 'Chill before serving'},
  {id: 10, recipe_name: 'Neon', user_email: 'Ne', difficulty: 2, time_in_min: 10, instructions: 'Heat and enjoy'},
];

/**
 * Data source for the RecipeTable view. This class should
 * encapsulate all logic for fetching and manipulating the displayed data
 * (including sorting, pagination, and filtering).
 */
export class RecipeTableDataSource extends DataSource<RecipeTableItem> {
  data: RecipeTableItem[] = EXAMPLE_DATA;
  paginator: MatPaginator | undefined;
  sort: MatSort | undefined;

  constructor() {
    super();
  }

  /**
   * Connect this data source to the table. The table will only update when
   * the returned stream emits new items.
   * @returns A stream of the items to be rendered.
   */
  connect(): Observable<RecipeTableItem[]> {
    if (this.paginator && this.sort) {
      // Combine everything that affects the rendered data into one update
      // stream for the data-table to consume.
      return merge(observableOf(this.data), this.paginator.page, this.sort.sortChange)
        .pipe(map(() => {
          return this.getPagedData(this.getSortedData([...this.data ]));
        }));
    } else {
      throw Error('Please set the paginator and sort on the data source before connecting.');
    }
  }

  /**
   *  Called when the table is being destroyed. Use this function, to clean up
   * any open connections or free any held resources that were set up during connect.
   */
  disconnect(): void {}

  /**
   * Paginate the data (client-side). If you're using server-side pagination,
   * this would be replaced by requesting the appropriate data from the server.
   */
  private getPagedData(data: RecipeTableItem[]): RecipeTableItem[] {
    if (this.paginator) {
      const startIndex = this.paginator.pageIndex * this.paginator.pageSize;
      return data.splice(startIndex, this.paginator.pageSize);
    } else {
      return data;
    }
  }

  /**
   * Sort the data (client-side). If you're using server-side sorting,
   * this would be replaced by requesting the appropriate data from the server.
   */
  private getSortedData(data: RecipeTableItem[]): RecipeTableItem[] {
    if (!this.sort || !this.sort.active || this.sort.direction === '') {
      return data;
    }

    return data.sort((a, b) => {
      const isAsc = this.sort?.direction === 'asc';
      switch (this.sort?.active) {
        case 'id': return compare(+a.id, +b.id, isAsc);
        default: return 0;
      }
    });
  }
}

/** Simple sort comparator for example ID/Name columns (for client-side sorting). */
function compare(a: string | number, b: string | number, isAsc: boolean): number {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}
