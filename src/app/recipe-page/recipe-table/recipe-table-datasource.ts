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
  difficulty: string;
  rating: number;
  time_in_min: number;
}

// TODO: replace this with real data from your application
const EXAMPLE_DATA: RecipeTableItem[] = [
  {id: 1, recipe_name: 'Hydrogen', rating: 1.0079, user_email: 'H', difficulty: 'easy', time_in_min: 1},
  {id: 2, recipe_name: 'Helium', rating: 4.0026, user_email: 'He', difficulty: 'easy', time_in_min: 2},
  {id: 3, recipe_name: 'Lithium', rating: 6.941, user_email: 'Li', difficulty: 'easy', time_in_min: 3},
  {id: 4, recipe_name: 'Beryllium', rating: 9.0122, user_email: 'Be', difficulty: 'easy', time_in_min: 4},
  {id: 5, recipe_name: 'Boron', rating: 10.811, user_email: 'B', difficulty: 'easy', time_in_min: 5},
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
