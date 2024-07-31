const express = require('express');
const router = express.Router();
const db = require('../database/mysql');
const checkLogin = require('../middleware/checklogin');
const crypto = require('crypto');
const path = require('path');
// Ensure you load the environment variables

// Admin credentials
const adminEmail = 'ecomertceadmin@gmail.com';
const adminPassword = 'haiqa';

router.post('/', checkLogin, (req, res) => {
    const { email, pass } = req.body;

    // Basic validation
    if (!email || !pass) {
        return res.status(400).json({ message: 'Email and password are required', type: 'warning' });
    }

    // Handle the special admin email case
    if (email === adminEmail) {
        // Hash the provided password
        const hash = crypto.createHash('sha256');
        hash.update(pass);
        const hashedPassword = hash.digest('hex');

        // Hash the admin password for comparison
        const hashAdminPassword = crypto.createHash('sha256');
        hashAdminPassword.update(adminPassword);
        const hashedAdminPassword = hashAdminPassword.digest('hex');

        if (hashedPassword !== hashedAdminPassword) {
            return res.status(401).json({ message: 'Incorrect password', type: 'danger' });
        }
        else{
        return res.status(200).json({ message: 'Successfully logged in as admin', redirectTo: '/admin/', type: 'success' });
        }
        // Generate a JWT token for the admin

        // Set the cookie with the JWT token

    }});
    module.exports = router;
