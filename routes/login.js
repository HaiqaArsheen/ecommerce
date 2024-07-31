const express = require('express');
const router = express.Router();
const db = require('../database/mysql');

const checkLogin = require('../middleware/checklogin');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');

router.post('/', checkLogin, (req, res) => {
    const { email, pass } = req.body;

    // Basic validation
    if (!email || !pass) {
        return res.status(404).json({ message: 'Email and password are required', type: 'warning' });
    }

    const query = 'SELECT * FROM user WHERE email = ?';

    db.query(query, [email], (error, results) => {
        if (error) {
            console.error('Error checking email:', error);
            return res.status(500).json({ message: 'Internal server error', type: 'danger' });
        }

        if (results.length === 0) {
            return res.status(404).json({ message: 'Email not found, please register first.', type: 'warning' });
        }

        const user = results[0];
        const hash = crypto.createHash('sha256');
        hash.update(pass);
        const hashedPassword = hash.digest('hex');
        if (user.Password !== hashedPassword) {
            return res.status(401).json({ message: 'Incorrect password', type: 'danger' });
        }

        // Generate a JWT token
        const token = jwt.sign({ id: user.Id, email: user.Email, name: user.Name }, process.env.JWT_SECRET, { expiresIn: '1h' });

        // Set the cookie with the JWT token
        res.cookie('token', token, { maxAge: 3600000, httpOnly: false, path: '/' });
        console.log('Token set in cookie:', token);

        return res.status(200).json({ message: 'Successfully logged in', type: 'success' });
    });
});

module.exports = router;
