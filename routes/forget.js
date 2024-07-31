const express = require('express');
const router = express.Router();
const db = require('../database/mysql');
const app = express();
app.use(express.json());
const nodemailer = require('nodemailer');                        

const transporter = nodemailer.createTransport({
    service: 'Gmail',
    port: 587,
    auth: {
      user: 'haiqaarsheen2@gmail.com',
      pass: 'xbsv meje hwex jico',
    },
  });
  router.post('/', (req, res) => {
    const { email} = req.body;
   

    // Check if email exists in the database
    const query = 'SELECT * FROM user WHERE email = ?';
    db.query(query, [email], (error, results) => {
        if (error) {
            console.error('Error checking email:', error);
            return res.status(500).json({ message: 'Internal server error', type: 'danger' });
          }

        if (results.length === 0) {
          return res.status(404).json({ message: 'Email not found', type: 'warning' });
        }
        const verificationLink = `http://localhost:3000/reset/reset-password?email=${email}`;
    const mailOptions = {
      from: 'website',
      to: email,
      subject: 'ecommerce',
      html: `<p>Click the following link to verify your email:</p><p><a href="${verificationLink}">${verificationLink}</a></p>`,
    };
  
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        return res.status(500).json({ message: 'Failed to send verification email', type: 'danger' });
        
      } else {
        return res.status(200).json({ message: 'Verification email sent successfully' , type: 'success'});
        console.log("haiqa");
       
      }
    });
    
     
});  
        });
        module.exports = router;





        