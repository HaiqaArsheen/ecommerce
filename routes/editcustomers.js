const express = require('express');
const router = express.Router();
const db = require('../database/mysql'); // Adjust the path to your database connection

// Fetch customers
// router.get('/editcustomers', (req, res) => {
//     const sql = 'SELECT * FROM customer';
//     db.query(sql, (err, results) => {
//         if (err) {
//             console.error('Error fetching customers:', err);
//             res.status(500).json({ error: 'Failed to fetch customers' });
//         } else {
//             res.json(results);
//             console.log(results);

//         }
//     });
// });

// Fetch orders for a specific customer
// router.get('/editcustomers/orders/:email', (req, res) => {
//     const email = req.params.email;
   
//     const sql = 'SELECT * FROM orderitem WHERE email = (SELECT email FROM customer WHERE email = ?)';
//     db.query(sql, [email], (err, results) => {
//         if (err) {
//             console.error('Error fetching orders:', err);
//             res.status(500).json({ error: 'Failed to fetch orders' });
//         } else {
          
//             res.json(results);
//             console.log(results);
//         }
//     });
// });


router.get('/editcustomers/orders/:email', (req, res) => {
    const email = req.params.email;

    const customerQuery = 'SELECT * FROM customer WHERE email = ?';
    const ordersQuery = 'SELECT * FROM orderitem WHERE email = ?';

    db.query(customerQuery, [email], (err, customerResults) => {
        if (err) {
            console.error('Error fetching customer details:', err);
            res.status(500).json({ error: 'Failed to fetch customer details' });
            return;
        }

        if (customerResults.length === 0) {
            res.status(404).json({ error: 'Customer not found' });
            return;
        }

        const customer = customerResults[0];

        db.query(ordersQuery, [email], (err, orderResults) => {
            if (err) {
                console.error('Error fetching orders:', err);
                res.status(500).json({ error: 'Failed to fetch orders' });
                return;
            }

            res.json({ customer, orders: orderResults });
        });
    });
});

// router.get('/editcustomers/orders/:email', (req, res) => {
//     const email = req.params.email;
//     const sql = `
//         SELECT o.image, o.name, o.price, o.quantity, c.category 
//         FROM orderitem o 
//         JOIN customer c ON o.email = c.email 
//         WHERE c.email = ?`;
//     db.query(sql, [email], (err, results) => {
//         if (err) {
//             console.error('Error fetching orders:', err);
//             res.status(500).json({ error: 'Failed to fetch orders' });
//         } else {
//             res.json(results);
//             console.log(results);
//         }
//     });
// });

module.exports = router;
