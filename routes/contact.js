const express = require('express');
const nodemailer = require('nodemailer');
const router = express.Router();

router.post('/', (req, res) => {
  const { name, email, address, phone, subject, message } = req.body;

  const output = `
    <p>You have a new contact request</p>
    <h3>Contact Details</h3>
    <ul>
      <li>Name: ${name}</li>
      <li>Email: ${email}</li>
      <li>Address: ${address}</li>
      <li>Phone: ${phone}</li>
      <li>Subject: ${subject}</li>
      <li>Message: ${message}</li>
    </ul>
  `;

  let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'haiqaarsheen2@gmail.com', // Your email
      pass: 'xbsv meje hwex jico',  // Your email password
    },
  });

  let mailOptions = {
    from: email,
    to: 'haiqaarsheen2@gmail.com',
    subject: 'New Contact Request',
    html: output,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
      return res.status(500).send('Error while sending email.');
    }
    console.log('Message sent: %s', info.messageId);
    res.status(200).json({ message: 'Your message has been sent to the admin.' });
  });
});

module.exports = router;
