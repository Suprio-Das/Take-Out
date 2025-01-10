const express = require('express');
const database = require('./connect');
const bcrypt = require('bcrypt');

const UserRoutes = express.Router();

UserRoutes.post('/signup', async (req, res) => {
    try {
        const { username, email, password } = req.body;

        // Validate input
        if (!username || !email || !password) {
            return res.status(400).json({ message: 'All fields are required.' });
        }

        const db = database.getDB();
        const userCollection = db.collection('users');

        // Check if the user already exists
        const existingUser = await userCollection.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists.' });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create user object
        const newUser = {
            username,
            email,
            password: hashedPassword,
            createdAt: new Date(),
        };

        // Insert user into the database
        const result = await userCollection.insertOne(newUser);

        res.status(201).json({
            message: 'User created successfully!',
            userId: result.insertedId,
        });
    } catch (error) {
        console.error('Error creating user:', error);
        res.status(500).json({ message: 'Internal server error.' });
    }
});

module.exports = UserRoutes;