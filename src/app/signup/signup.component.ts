import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {
  username: string = '';
  email: string = ''; // Define email variable
  password: string = '';
  repeatPassword: string = ''; // Define repeatPassword variable

  constructor(private http: HttpClient) {}

  onSubmit(): void {
    if (this.password !== this.repeatPassword) {
      alert('Passwords do not match. Please try again.');
      return;
    }

    const newUser = {
      username: this.username,
      email: this.email, // Add email to user object
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
