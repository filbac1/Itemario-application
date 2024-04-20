import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {
  username: string = '';
  email: string = '';
  password: string = '';
  repeatPassword: string = '';
  errorMessage: string = '';

  constructor(private http: HttpClient) {}

  onSubmit(): void {
    // Validate username length
    if (this.username.length < 4 || this.username.length > 20) {
      this.errorMessage = 'Username must be between 4 and 20 characters.';
      return;
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(this.email)) {
      this.errorMessage = 'Invalid email format.';
      return;
    }

    // Validate password length and complexity
    const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}$/;
    if (!passwordRegex.test(this.password)) {
      this.errorMessage = 'Password must be at least 6 characters long and contain at least one lowercase letter, one uppercase letter, and one number.';
      return;
    }

    // Validate password match
    if (this.password !== this.repeatPassword) {
      this.errorMessage = 'Passwords do not match.';
      return;
    }

    const newUser = {
      username: this.username,
      email: this.email,
      password: this.password
    };

    this.http.post<any>('http://localhost:3000/api/signup', newUser).subscribe(
      (response) => {
        console.log(response);
        alert('User signed up successfully!');
      },
      (error) => {
        console.error('Error:', error);
        alert('An error occurred. Please try again.');
      }
    );
  }
}
