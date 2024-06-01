import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUserKey = 'currentUser'; 

  constructor() {}

  logout(): void {
    localStorage.removeItem(this.currentUserKey);
  }

  login(user: any): void {
    if (!user) {
      console.error('Invalid user:', user);
      return;
    }
    console.log("Logging in user:", user);
    localStorage.setItem(this.currentUserKey, JSON.stringify(user));
  }
  
  getCurrentUser(): any {
    const userString = localStorage.getItem(this.currentUserKey);
    console.log("Retrieved userString:", userString);
    if (userString === null || userString === "undefined") {
      console.error('No user information found in local storage');
      return null;
    }
    try {
      return JSON.parse(userString);
    } catch (error) {
      console.error('Error parsing user information:', error);
      return null;
    }
  }
  
  

  isLoggedIn(): boolean {
    return !!this.getCurrentUser();
  }
}
