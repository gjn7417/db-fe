import {Component, OnInit} from '@angular/core';
import {NgForOf} from "@angular/common";
import {UserData} from "../user-interface";
import {UserService} from "../user.service";
import {UserCreateModalComponent} from "../user-create-modal/user-create-modal.component";
import {MatDialog} from "@angular/material/dialog";
import {MatButton} from "@angular/material/button";

@Component({
  selector: 'app-users-page',
  standalone: true,
  imports: [
    NgForOf,
    MatButton
  ],
  templateUrl: './users-page.component.html',
  styleUrl: './users-page.component.scss'
})
export class UsersPageComponent implements OnInit {

  userData: UserData[] = []

  constructor(private userService: UserService, public dialog: MatDialog){}

  ngOnInit(): void {
    this.userService.updateUsers();
    this.userService.getUsers().subscribe(data => {
      this.userData = data;
    });
  }

  openCreateUser(): void {
    const dialogRef = this.dialog.open(UserCreateModalComponent, {
      data: {first_name: "", last_name: "", email: "", user_name: ""}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
    this.userService.updateUsers();
  }

}
