const express = require('express');
const router = express.Router();
const db = require('../database/mysql');
const crypto = require('crypto');

const app = express();
app.use(express.json());
router.post('/', (req, res) => {
    // const name=req.body;
    // const email=req.body;
    // const pass=req.body;
    const{name,email,pass}=req.body;
  
    // Basic validation
    if (!name ||!pass ||!email) {
      console.log(name,email,pass);
      return res.status(404).json({ message: 'Email and password are required', type: 'warning' });

      // return res.status(400).send('Name, email, and password are required.');
    }
    const hash = crypto.createHash('sha256');
    hash.update(pass);
    const hashedPassword = hash.digest('hex');
    const query = 'SELECT COUNT(*) AS count FROM user WHERE email = ?';

    db.query(query, [email], (error, results) => {
      if (error) {
        console.error('Error checking email:', error);
        return res.status(500).json({ message: 'Internal server error', type: 'danger' });

        // return res.status(500).send('Internal server error');
      }
  
      const count = results[0].count;
      if (count > 0) {
        return res.status(409).json({ message: 'Emai  exists in the database.', type: 'warning' });

        // return res.status(409).send('Emai  exists in the database');
            }

      const sql = 'INSERT INTO user (Name, Email, Password) VALUES (?, ?, ?)';
      db.query(sql, [name, email, hashedPassword], (err, result) => {
        if (err) {
          console.error('Error saving user to the database:', err);
          return res.status(500).json({ message: 'Server error,Please try again later.', type: 'danger' });

          // return res.status(500).send('Server error. Please try again later.');
        }
        return res.status(200).json({ message: 'User registered successfully' , type: 'success'});

        // res.status(200).send('User registered successfully');
    });
  });
  
  
  
   
    });
  

module.exports = router;
