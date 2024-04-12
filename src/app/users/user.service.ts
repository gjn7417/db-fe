import {Injectable, OnInit} from '@angular/core';

import {HttpClient} from "@angular/common/http";
import {BehaviorSubject, Observable} from "rxjs";
import {UserData} from "./user-interface";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private userData = new BehaviorSubject<UserData[]>([]);
  constructor(private http: HttpClient) { }


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

}
