import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router'; 
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  username: string = '';
  password: string = '';
  errorMessage: string = '';

  constructor(
    private http: HttpClient,
    private router: Router,
    private authService: AuthService 
  ) {}

  onSubmit(): void {
    const credentials = {
      username: this.username,
      password: this.password
    };

    this.http.post<any>('http://localhost:3000/api/login', credentials).subscribe(
      (response) => {
        console.log(response);
        this.authService.login(response.user); 
        alert('User logged in successfully!');
        this.router.navigate(['/start']);
      },
      (error) => {
        console.error('Error:', error);
        this.errorMessage = 'Invalid username or password. Please try again.';
      }
    );
  }
}
