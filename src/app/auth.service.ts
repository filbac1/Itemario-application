import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUser: any; // You can define a more specific type for user information

  constructor() {}

  login(user: any): void {
    // Store the logged-in user information in local storage or a service
    this.currentUser = user;
  }

  logout(): void {
    // Clear the stored user information
    this.currentUser = null;
  }

  getCurrentUser(): any {
    // Retrieve the currently logged-in user information
    return this.currentUser;
  }

  isLoggedIn(): boolean {
    // Check if a user is logged in
    return !!this.currentUser;
  }
}
