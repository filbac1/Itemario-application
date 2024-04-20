import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service'; // Import AuthService
import { Router } from '@angular/router'; // Import Router

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  currentUser: any;

  constructor(private authService: AuthService, private router: Router) {} // Inject AuthService and Router

  ngOnInit(): void {
    this.currentUser = this.authService.getCurrentUser();
  }

  // Add a logout method
  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']); // Redirect to login page after logout
  }
}
