import {Component, Inject} from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef, MatDialogTitle
} from "@angular/material/dialog";
import {MatFormField, MatLabel} from "@angular/material/form-field";
import {MatButton} from "@angular/material/button";
import {MatInput} from "@angular/material/input";
import {FormsModule} from "@angular/forms";
import {UserService} from "../user.service";
import {UserData} from "../user-interface";

@Component({
  selector: 'app-user-create-modal',
  standalone: true,
  imports: [
    MatDialogContent,
    MatFormField,
    MatDialogActions,
    MatDialogClose,
    MatButton,
    MatInput,
    MatDialogTitle,
    FormsModule,
    MatLabel
  ],
  templateUrl: './user-create-modal.component.html',
  styleUrl: './user-create-modal.component.scss'
})
export class UserCreateModalComponent {
  constructor(
    private userService: UserService,
    public dialogRef: MatDialogRef<UserCreateModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: UserData,
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  onCreateUserClick(): void {
    this.userService.createNewUser(this.data)
      .subscribe(
        response => {
          console.log('User Created Successfully', response);
          this.dialogRef.close();
        },
        error => console.error('Error creating user', error)
      );
  }

}
