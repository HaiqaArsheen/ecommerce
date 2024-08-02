const express = require('express');
const router = express.Router();
const db = require('../database/mysql'); // Adjust the path to your db connection
const verifyToken = require('../middleware/verifyToken');

router.post('/', verifyToken, (req, res) => {
    console.log('Received saveOrder request');
    const { cartItems } = req.body;
    const userEmail = req.email;

    if (!cartItems || !Array.isArray(cartItems)) {
        return res.status(400).json({ type: 'error', message: 'Invalid cart items' });
    }

    // Step 1: Ensure the customer exists
    const getCustomerQuery = 'SELECT id FROM user WHERE email = ?';
    db.query(getCustomerQuery, [userEmail], (err, customerResults) => {
        if (err) {
            console.error('Error fetching user:', err);
            return res.status(500).json({ type: 'error', message: 'Failed to fetch customer' });
        }

        let customerId;

        if (customerResults.length > 0) {
            // Customer exists
            customerId = customerResults[0].id;
            insertOrderItems(customerId);
        } else {
            // Customer does not exist, insert new customer
            console.error('user not found ', err);

        }
    });

    // Step 3: Insert order items
    function insertOrderItems(customerId) {
        const insertOrderItemQuery = 'INSERT INTO orderitem (name, image, quantity, price, user_id,email) VALUES (?, ?, ?, ?, ?,?)';
        cartItems.forEach(item => {
            const { name, image, quantity, price } = item;
            db.query(insertOrderItemQuery, [name, image, quantity, price, customerId,userEmail], (err, results) => {
                if (err) {
                    console.error('Error saving order item:', err);
                    return res.status(500).json({ type: 'error', message: 'Failed to save order item' });
                }
            });
        });
        res.status(200).json({ type: 'success', message: 'Order items saved successfully' ,redirectUrl: '/index' });
    }
});

module.exports = router;
