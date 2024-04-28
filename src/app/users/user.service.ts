import {Injectable, OnInit} from '@angular/core';

import {HttpClient} from "@angular/common/http";
import {BehaviorSubject, Observable} from "rxjs";
import {UserData} from "./user-interface";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private userData = new BehaviorSubject<UserData[]>([]);
  private userRecipeCount = new BehaviorSubject<string>('');
  activeUser: any;

  constructor(private http: HttpClient) { }

  setActiveUser(user: any): void {
    this.activeUser = user;
    console.log("Active User: " + this.activeUser);
  }

  getActiveUser(): any {
    return this.activeUser;
  }

  createNewUser(data: UserData): Observable<Object> {
    return this.http.post('http://127.0.0.1:8080/users/create-user', data)
  }

  updateUsers(): void {
    this.http.get<UserData[]>('http://127.0.0.1:8080/users/get-users')
      .subscribe(
        data => this.userData.next(data),
        error => console.error('Error updating users', error)
      );
  }

  getUsers(): Observable<UserData[]> {
    return this.userData.asObservable();
  }

  updateUser(data: UserData): void {
    this.http.put('http://127.0.0.1:8080/users/update-user', data)
      .subscribe(
        response => {
          console.log('User updated successfully', response);
          this.updateUsers();
        },
        error => console.error('Error updating user', error)
      );
  }

  getCountUserRecipes(email: string): void {
    this.http.get(`http://127.0.0.1:8080/reports/get-user-recipe-count`, {params: {email: email}})
      .subscribe(
        response => {
          console.log('User recipe count: ', response);
          this.userRecipeCount.next(response.toString());
        },
        error => console.error('Error getting user recipe count', error)
      );
  }

  getUserRecipeCount(): Observable<string> {
    return this.userRecipeCount.asObservable();
  }

  deleteUser(email: string): void {
    this.http.delete(`http://127.0.0.1:8080/users/delete-user`, {params: {email: email}})
      .subscribe(
        response => {
          console.log('User deleted successfully', response);
          this.updateUsers();
        },
        error => console.error('Error deleting user', error)
      )
  }

}
