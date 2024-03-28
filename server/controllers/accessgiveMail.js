// emailRoutes.js
const express = require('express');
const nodemailer = require('nodemailer');
const crypto = require('crypto');
const router = express.Router();

// Generate a unique token
function generateToken() {
  return crypto.randomBytes(20).toString('hex');
}

// Store the generated tokens (in production, you might use a database)
const tokens = {};

// Endpoint to send email with the token/link
router.post('/send-email', async (req, res) => {
  const userEmail = req.body.email; // User's email address
  const token = generateToken();
  tokens[token] = userEmail;

  const transporter = nodemailer.createTransport({
    // Configure your email service
    service: 'gmail',
    auth: {
      user: 'shashi.dharmasena00@gmail.com',
      pass: 'vuzl ocap nibf bcbw'
    }
  });

  const mailOptions = {
    from: 'shashi.dharmasena00@gmail.com',
    to: userEmail,
    subject: 'Invitation to access the system',
    text: `Click on the following link to access the system: http://your-website.com/access?token=${token}`
  };

  try {
    await transporter.sendMail(mailOptions);
    res.status(200).send('Email sent successfully');
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).send('Error sending email');
  }
});

// Endpoint to handle the token/link and grant access to the system
router.get('/access', (req, res) => {
  const token = req.query.token;
  const userEmail = tokens[token];

  if (userEmail) {
    // Grant access to the system
    res.status(200).send('Access granted');
    // You might want to remove the token from the tokens object to prevent reuse
    delete tokens[token];
  } else {
    res.status(401).send('Invalid or expired token');
  }
});

module.exports = router;
