import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { HttpClient } from '@angular/common/http'; 

@Component({
  selector: 'app-start',
  templateUrl: './start.component.html',
  styleUrls: ['./start.component.css']
})
export class StartComponent implements OnInit {
  currentUser: any;

  constructor(private authService: AuthService, private http: HttpClient) { } 

  ngOnInit(): void {
    this.currentUser = this.authService.getCurrentUser();
    console.log("Current user:", this.currentUser); 
  }

}
