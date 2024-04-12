import {MediaMatcher} from '@angular/cdk/layout';
import {ChangeDetectorRef, Component, OnDestroy, ViewChild} from '@angular/core';
import {MatListModule} from '@angular/material/list';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatToolbarModule} from '@angular/material/toolbar';
import { ExpandableTableComponent } from "../expandable-table/expandable-table.component";
import {MatGridListModule} from '@angular/material/grid-list';
import {RouterLink, RouterOutlet} from "@angular/router";
import {UserSelectComponent} from "../users/user-select/user-select.component";
import {MatDialog} from "@angular/material/dialog";
import {UserCreateModalComponent} from "../users/user-create-modal/user-create-modal.component";

@Component({
    selector: 'app-sidenav',
    standalone: true,
    templateUrl: './sidenav.component.html',
    styleUrl: './sidenav.component.scss',
  imports: [MatToolbarModule, MatButtonModule, MatIconModule, MatSidenavModule, MatListModule, ExpandableTableComponent, MatGridListModule, RouterOutlet, RouterLink, UserSelectComponent]
})
export class SidenavComponent implements OnDestroy {
  @ViewChild(UserSelectComponent) userSelectComponent!: UserSelectComponent;

  mobileQuery: MediaQueryList;
  private _mobileQueryListener: () => void;

  constructor(changeDetectorRef: ChangeDetectorRef, media: MediaMatcher, public dialog: MatDialog) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(UserCreateModalComponent, {
      data: {first_name: "", last_name: "", email: "", user_name: ""}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }

  callGetUsers(): void {
    this.userSelectComponent.callUpdateUsers();
  }
}


/**  Copyright 2024 Google LLC. All Rights Reserved.
    Use of this source code is governed by an MIT-style license that
    can be found in the LICENSE file at https://angular.io/license */
