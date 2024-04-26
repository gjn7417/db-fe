import {Component, OnInit} from '@angular/core';
import {NgForOf} from "@angular/common";
import {UserData} from "../user-interface";
import {UserService} from "../user.service";
import {UserCreateModalComponent} from "../user-create-modal/user-create-modal.component";
import {MatDialog} from "@angular/material/dialog";
import {MatButton} from "@angular/material/button";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatCard, MatCardContent, MatCardHeader, MatCardSubtitle, MatCardTitle} from "@angular/material/card";
import {MatFormField, MatLabel} from "@angular/material/form-field";
import {MatGridList, MatGridTile} from "@angular/material/grid-list";
import {MatInput} from "@angular/material/input";
import {Tool} from "../../tools/tools-interface";

@Component({
  selector: 'app-users-page',
  standalone: true,
  imports: [
    NgForOf,
    MatButton,
    FormsModule,
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
    ReactiveFormsModule
  ],
  templateUrl: './users-page.component.html',
  styleUrl: './users-page.component.scss'
})
export class UsersPageComponent implements OnInit {

  userData: UserData[] = []

  updateUser: UserData = {
    first_name: "",
    last_name: "",
    email: "",
    user_name: ""
  }

  deleteUserId: string = "";

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

  submitUpdateUser(data: UserData): void {
    this.userService.updateUser(data);
  }

  submitDeleteUser(email: string): void {
    console.log("Deleting user with email: ", email);
  }

}
