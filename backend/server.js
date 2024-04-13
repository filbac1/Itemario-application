// Import required modules
const express = require('express');
const mysql = require('mysql');
const cors = require('cors'); // Import CORS middleware

// Create a connection to the database
const connection = mysql.createConnection({
    host: 'localhost',  // Change this to your MySQL host
    user: 'root',       // MySQL username
    password: 'root',   // MySQL password
    database: 'Itemario' // Name of your database
});

// Create an Express application
const app = express();

// Use CORS middleware
app.use(cors());

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

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
