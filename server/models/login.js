const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const MongoClient = require('mongodb').MongoClient;
const User = require('../models/user'); // Make sure path is correct based on your folder structure

const router = express.Router();

router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) return res.status(400).json({ error: 'User not found' });

        //const isPasswordValid = await bcrypt.compare(password, user.password);
        const isPasswordValid = compare(password, user.password);
        if (!isPasswordValid) return res.status(400).json({ error: 'Invalid password' });

        const token = jwt.sign({ id: user._id }, 'your_jwt_secret', { expiresIn: '1h' });
        res.json({ token,
            name: user.name,
            userId: user._id
         });
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ error: 'Error logging in' });
    }
});

module.exports = router;