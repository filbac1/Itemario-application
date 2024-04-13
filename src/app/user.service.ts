import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  getUsers() {
    // Replace 'http://localhost:3000/api/users' with the actual endpoint of your backend API
    return this.http.get<any[]>('http://localhost:3000/api/users');
  }
}
