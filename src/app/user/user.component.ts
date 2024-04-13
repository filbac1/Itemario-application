import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service'; // Import your UserService

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  users: any[] = [];

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.userService.getUsers().subscribe((data: any[]) => {
      this.users = data;
    });
  }
}
