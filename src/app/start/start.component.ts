import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { HttpClient } from '@angular/common/http'; // Import HttpClient

@Component({
  selector: 'app-start',
  templateUrl: './start.component.html',
  styleUrls: ['./start.component.css']
})
export class StartComponent implements OnInit {
  currentUser: any;

  constructor(private authService: AuthService, private http: HttpClient) { } // Inject HttpClient and AuthService

  ngOnInit(): void {
    // Fetch the current user's information when the component initializes
    this.currentUser = this.authService.getCurrentUser();
    console.log("Current user:", this.currentUser); // Log the current user
  }

}
