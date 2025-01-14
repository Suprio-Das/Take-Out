const express = require('express');
const database = require('./connect');
const bcrypt = require('bcrypt');
const UserRoutes = express.Router();
const jwt = require('jsonwebtoken')
const jwtSecret = "Thisisacompletemernstackproject@2025@january"

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
            message: 'Account created successfully!',
            userId: result.insertedId,
        });
    } catch (error) {
        console.error('Error creating user:', error);
        res.status(500).json({ message: 'Internal server error.' });
    }
});


UserRoutes.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        const db = await database.getDB();
        const userCollection = await db.collection('users');

        const user = await userCollection.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'User not found.' });
        }

        // Hash the password
        const comparePassword = await bcrypt.compare(password, user.password);

        if (!comparePassword) {
            return res.json({ message: "Invalid password or email" })
        }

        const data = {
            user: {
                id: user._id
            }
        }
        const authToken = jwt.sign(data, jwtSecret)
        res.json({ message: "Login Successful", authToken })

    } catch (error) {
        console.error('Error logging in:', error);
        res.status(500).json({ message: 'Internal server error.' });
    }
});

module.exports = UserRoutes;