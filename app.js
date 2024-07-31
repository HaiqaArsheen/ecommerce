const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser'); 
const path = require('path');

const db = require('./database/mysql');
const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json()); // Adjust the path as needed
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});
app.post('/checkout', async (req, res) => {
    const { fullName, email, phoneNumber, state, city, address, zipCode, orderNotes, cartItems } = req.body;

    if (!fullName || !email || !phoneNumber || !state || !city || !address || !zipCode || !orderNotes || !cartItems) {
        return res.status(400).send('All fields are required');
    }

    db.query('SELECT id FROM customer WHERE email = ?', [email], (err, results) => {
        if (err) {
            console.error('Database selection error:', err);
            return res.status(500).send('Internal server error');
        }

        let customerId;
        if (results.length > 0) {
            customerId = results[0].id;
        } else {
            const insertCustomerQuery = 'INSERT INTO customer (fullName, email, phoneNumber, state, city, address, zipCode, orderNotes) VALUES (?, ?, ?, ?, ?, ?, ?, ?)';
            db.query(insertCustomerQuery, [fullName, email, phoneNumber, state, city, address, zipCode, orderNotes], (err, result) => {
                if (err) {
                    console.error('Database insertion error:', err);
                    return res.status(500).send('Internal server error');
                }
                customerId = result.insertId;
                saveOrderItems(customerId, cartItems, res);
            });
        }

        if (customerId) {
            saveOrderItems(customerId, cartItems, res);
        }
    });
});

function saveOrderItems(customerId, cartItems, res) {
    const insertOrderItemQuery = 'INSERT INTO orderitem (customer_id, name, price, quantity, image) VALUES ?';
    const orderItemsValues = cartItems.map(item => [customerId, item.name, item.price, item.quantity, item.image]);

    db.query(insertOrderItemQuery, [orderItemsValues], (err, result) => {
        if (err) {
            console.error('Database insertion error:', err);
            return res.status(500).send('Internal server error');
        }
        console.log('Order items saved to database.');
        res.status(200).send({ message: 'Order processed successfully' });
    });
}

app.listen(3000, () => { 
})