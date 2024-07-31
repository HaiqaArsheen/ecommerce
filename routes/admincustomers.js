const express = require('express');
const router = express.Router();
const path = require('path');
const fs = require('fs');
const db = require('../database/mysql');






router.get('/', (req, res) => {
  const sql = 'SELECT * FROM customer';
  db.query(sql, (err, results) => {
    if (err) throw err;
    res.json(results);
  });
});
// Route to get a single product by ID


// Route to handle updating a product


// Route to delete a product by ID

module.exports = router;
