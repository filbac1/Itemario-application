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
    const { username, email, password } = req.body;
    bcrypt.hash(password, 10, (err, hashedPassword) => {
        if (err) {
            console.error('Error hashing password:', err);
            res.status(500).json({ error: 'Error hashing password' });
            return;
        }
        const insertUserQuery = 'INSERT INTO user (username, email, hashedPassword, active, role) VALUES (?, ?, ?, 1, "user")';
        connection.query(insertUserQuery, [username, email, hashedPassword], (err, result) => {
            if (err) {
                console.error('Error inserting user:', err);
                res.status(500).json({ error: 'Error inserting user' });
                return;
            }
            console.log('User inserted successfully');
            const user = {
                id: result.insertId,
                username: username,
                email: email,
                active: 1,
                role: "user"
            };
            res.json({ message: 'User inserted successfully', user: user });
        });
    });
});

app.post('/api/login', (req, res) => {
    const { username, password } = req.body;
    const getUserQuery = 'SELECT * FROM user WHERE username = ?';
    connection.query(getUserQuery, [username], (err, results) => {
        if (err) {
            console.error('Error executing query: ', err);
            res.status(500).json({ error: 'Error executing query' });
            return;
        }
        if (results.length === 0) {
            res.status(401).json({ error: 'Invalid username or password' });
            return;
        }
        bcrypt.compare(password, results[0].hashedPassword, (err, passwordMatch) => {
            if (err) {
                console.error('Error comparing passwords: ', err);
                res.status(500).json({ error: 'Error comparing passwords' });
                return;
            }
            if (passwordMatch) {
                const user = {
                    id: results[0].id,
                    username: results[0].username,
                    email: results[0].email,
                    active: results[0].active,
                    role: results[0].role
                };
                res.json({ message: 'Authentication successful', user: user });
            } else {
                res.status(401).json({ error: 'Invalid username or password' });
            }
        });
    });
});

// Route to fetch all products
app.get('/api/products', (req, res) => {
    // Query to retrieve all products from the product table
    const getProductsQuery = 'SELECT * FROM product';

    // Execute the query
    connection.query(getProductsQuery, (err, results) => {
        if (err) {
            console.error('Error executing query: ', err);
            res.status(500).json({ error: 'Error executing query' });
            return;
        }
        // Send the products data as JSON response
        res.json(results);
    });
});

// Route to add a new product
app.post('/api/products', (req, res) => {
    const { name, store, price, date } = req.body;
    const insertProductQuery = 'INSERT INTO product (name, store, price, date) VALUES (?, ?, ?, ?)';
    connection.query(insertProductQuery, [name, store, price, date], (err, result) => {
        if (err) {
            console.error('Error inserting product:', err);
            res.status(500).json({ error: 'Error inserting product' });
            return;
        }
        console.log('Product inserted successfully');
        const product = {
            id: result.insertId,
            name: name,
            store: store,
            price: price,
            date: date
        };
        res.json({ message: 'Product inserted successfully', product: product });
    });
});

// Route to update a product
app.put('/api/products/:id', (req, res) => {
    const productId = req.params.id;
    const { name, store, price, date } = req.body;
    const updateProductQuery = 'UPDATE product SET name = ?, store = ?, price = ?, date = ? WHERE id = ?';
    connection.query(updateProductQuery, [name, store, price, date, productId], (err, result) => {
        if (err) {
            console.error('Error updating product:', err);
            res.status(500).json({ error: 'Error updating product' });
            return;
        }
        console.log('Product updated successfully');
        res.json({ message: 'Product updated successfully' });
    });
});

// Route to delete a product
app.delete('/api/products/:id', (req, res) => {
    const productId = req.params.id;
    const deleteProductQuery = 'DELETE FROM product WHERE id = ?';
    connection.query(deleteProductQuery, [productId], (err, result) => {
        if (err) {
            console.error('Error deleting product:', err);
            res.status(500).json({ error: 'Error deleting product' });
            return;
        }
        console.log('Product deleted successfully');
        res.json({ message: 'Product deleted successfully' });
    });
});



// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
