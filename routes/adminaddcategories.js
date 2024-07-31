const express = require('express');
const router = express.Router();
const db = require('../database/mysql');

// Route to get all table names
router.get('/getTableNames', (req, res) => {
    const query = "SHOW TABLES";
    db.query(query, (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        const tableNames = results.map(row => Object.values(row)[0]);
        res.json(tableNames);
    });
});

module.exports = router;
