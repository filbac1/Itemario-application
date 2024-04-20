import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router'; // Import the Router
import { AuthService } from '../auth.service'; // Import the AuthService

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
    private authService: AuthService // Inject AuthService
  ) {}

  onSubmit(): void {
    // Perform login authentication logic here
    // Example: You can send a POST request to your backend to authenticate the user
    const credentials = {
      username: this.username,
      password: this.password
    };

    // Example: Send login request to backend
    this.http.post<any>('http://localhost:3000/api/login', credentials).subscribe(
      (response) => {
        console.log(response);
        // Store the logged-in user information in AuthService
        this.authService.login(response.user); // Assuming response contains user information
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
