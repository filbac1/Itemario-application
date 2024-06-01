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
      return;
    }
    localStorage.setItem(this.currentUserKey, JSON.stringify(user));
  }
  
  getCurrentUser(): any {
    const userString = localStorage.getItem(this.currentUserKey);
    if (userString === null || userString === "undefined") {
      return null;
    }
    try {
      return JSON.parse(userString);
    } catch (error) {
      return null;
    }
  }
  
  isLoggedIn(): boolean {
    return !!this.getCurrentUser();
  }
}
