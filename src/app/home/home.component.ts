import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  currentUser: any;

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    // Fetch the current user's information when the component initializes
    this.currentUser = this.authService.getCurrentUser();
    console.log("Current user:", this.currentUser);
  }
}
