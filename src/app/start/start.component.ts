import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-start',
  templateUrl: './start.component.html',
  styleUrls: ['./start.component.css']
})
export class StartComponent implements OnInit {
  currentUser: any;

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    // Fetch the current user's information when the component initializes
    this.currentUser = this.authService.getCurrentUser();
    console.log("Current user:", this.currentUser);
  }
}
