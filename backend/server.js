// Import required modules
const express = require('express');
const mysql = require('mysql');
const cors = require('cors'); // Import CORS middleware
const bcrypt = require('bcrypt');

// Create a connection to the database
const connection = mysql.createConnection({
    host: 'localhost',  // Change this to your MySQL host
    user: 'root',       // MySQL username
    password: 'root',   // MySQL password
    database: 'itemario' // Name of your database
});

// Create an Express application
const app = express();

// Use CORS middleware
app.use(cors());

// Add middleware to parse JSON bodies
app.use(express.json());

// Define a route to fetch users
app.get('/api/users', (req, res) => {
    // Query to retrieve all users from the user table
    const getUsersQuery = 'SELECT * FROM user';

    // Execute the query
    connection.query(getUsersQuery, (err, results) => {
        if (err) {
            console.error('Error executing query: ', err);
            res.status(500).json({ error: 'Error executing query' });
            return;
        }
        // Send the users data as JSON response
        res.json(results);
    });
});

app.post('/api/signup', (req, res) => {
    const { username, email, password } = req.body; // Extract username, email, and password from request body

    // Hash the password
    bcrypt.hash(password, 10, (err, hashedPassword) => {
        if (err) {
            console.error('Error hashing password:', err);
            res.status(500).json({ error: 'Error hashing password' });
            return;
        }

        const insertUserQuery = 'INSERT INTO user (username, email, password, hashedPassword, active, role) VALUES (?, ?, ?, ?, 1, "user")'; // Modify query to include email
        connection.query(insertUserQuery, [username, email, password, hashedPassword], (err, result) => {
            if (err) {
                console.error('Error inserting user:', err);
                res.status(500).json({ error: 'Error inserting user' });
                return;
            }
            console.log('User inserted successfully');
            res.json({ message: 'User inserted successfully' });
        });
    });
});

// Define a route for login
app.post('/api/login', (req, res) => {
    const { username, password } = req.body;

    // Query to retrieve user from the database based on username
    const getUserQuery = 'SELECT * FROM user WHERE username = ?';

    // Execute the query to fetch user data
    connection.query(getUserQuery, [username], (err, results) => {
        if (err) {
            console.error('Error executing query: ', err);
            res.status(500).json({ error: 'Error executing query' });
            return;
        }

        // Check if user with the provided username exists
        if (results.length === 0) {
            res.status(401).json({ error: 'Invalid username or password' });
            return;
        }

        // Verify the password using bcrypt
        bcrypt.compare(password, results[0].hashedPassword, (err, passwordMatch) => {
            if (err) {
                console.error('Error comparing passwords: ', err);
                res.status(500).json({ error: 'Error comparing passwords' });
                return;
            }

            // If passwords match, authentication successful
            if (passwordMatch) {
                res.json({ message: 'Authentication successful' });
            } else {
                // If passwords don't match, authentication failed
                res.status(401).json({ error: 'Invalid username or password' });
            }
        });
    });
});


// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
