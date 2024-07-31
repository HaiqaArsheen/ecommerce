const express = require('express');
const path = require('path');
const router = express.Router();
const db = require('../database/mysql');
const bodyParser = require('body-parser');

router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

// Serve the reset password form when the user clicks on the verification link
router.get('/reset-password', (req, res) => {
    const { email } = req.query;

    // Validate the email (e.g., check if it's a valid email address format)
    if (!email) {
        return res.status(404).json({ message: 'Email are required', type: 'warning' });

        // return res.status(400).send('Email parameter is missing');
    }

    // Serve the reset.html file
    res.sendFile(path.join(__dirname, '../public/reset.html'));
});

// Handle the form submission and update the password in the database
router.post('/reset-password', (req, res) => {
    const { email, pass, passconfirm } = req.body;

    // Validate passwords
    if (pass !== passconfirm) {
        return res.status(404).json({ message: 'Passwords do not match.', type: 'warning' });

        // return res.status(400).send('Passwords do not match');
    }

    // Update the password in the database
    const updateQuery = 'UPDATE user SET password = ? WHERE email = ?';
    db.query(updateQuery, [pass, email], (error, results) => {
        if (error) {
            console.error('Error updating password:', error);
            return res.status(500).json({ message: 'Internal server error', type: 'danger' });

            // return res.status(500).send('Internal server error');
        }

        // Check if any rows were affected (i.e., if the email exists in the database)
        if (results.affectedRows === 0) {
            return res.status(404).json({ message: 'Email not found in the database.', type: 'warning' });

            // return res.status(404).send('Email not found in the database');
        }
        return res.status(200).json({ message: 'Password updated successfully' , type: 'success'});


        // return res.status(200).send('Password updated successfully');
    });
});

module.exports = router;
