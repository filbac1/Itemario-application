import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http'; // Import HttpClient

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {
  username: string = ''; // Define username variable
  password: string = ''; // Define password variable

  constructor(private http: HttpClient) {} // Inject HttpClient

  onSubmit(): void {
    const newUser = { username: this.username, password: this.password }; // Create user object

    // Send POST request to server endpoint
    this.http.post<any>('http://localhost:3000/api/signup', newUser).subscribe(
      (response) => {
        console.log(response); // Log response from server
        alert('User signed up successfully!'); // Display success message
      },
      (error) => {
        console.error('Error:', error); // Log error
        alert('An error occurred. Please try again.'); // Display error message
      }
    );
  }
}
