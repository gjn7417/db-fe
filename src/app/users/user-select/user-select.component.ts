import {Component, OnInit} from '@angular/core';
import {MatInputModule} from "@angular/material/input";
import {FormsModule} from "@angular/forms";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatSelectModule} from "@angular/material/select";
import {UserData} from "../user-interface";
import {UserService} from "../user.service";

@Component({
  selector: 'app-user-select',
  standalone: true,
  imports: [MatFormFieldModule, MatSelectModule, MatInputModule, FormsModule],
  templateUrl: './user-select.component.html',
  styleUrl: './user-select.component.scss'
})
export class UserSelectComponent implements OnInit {
  users: UserData[] = [];

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.userService.updateUsers();
    this.userService.getUsers().subscribe(data => {
      this.users = data;
    });
  }

  onUserSelect(event: any): void {
    this.userService.setActiveUser(event.value);
  }

  public callUpdateUsers(): void {
    this.userService.updateUsers();
  }

}
