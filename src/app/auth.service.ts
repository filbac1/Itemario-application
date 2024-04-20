import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUserKey = 'currentUser'; // Key to store user in local storage

  constructor() {}

  logout(): void {
    // Clear the stored user information from local storage
    localStorage.removeItem(this.currentUserKey);
  }

  login(user: any): void {
    if (!user) {
      console.error('Invalid user:', user);
      return;
    }
    // Store the logged-in user information in local storage
    console.log("Logging in user:", user);
    localStorage.setItem(this.currentUserKey, JSON.stringify(user));
  }
  
  getCurrentUser(): any {
    // Retrieve the currently logged-in user information from local storage
    const userString = localStorage.getItem(this.currentUserKey);
    console.log("Retrieved userString:", userString);
    if (userString === null || userString === "undefined") {
      console.error('No user information found in local storage');
      return null;
    }
    try {
      // Parse the user information from JSON
      return JSON.parse(userString);
    } catch (error) {
      console.error('Error parsing user information:', error);
      return null;
    }
  }
  
  

  isLoggedIn(): boolean {
    // Check if a user is logged in
    return !!this.getCurrentUser();
  }
}
