// import express from 'express';
// import nodemailer from 'nodemailer';
// import crypto from 'crypto';

// const router = express.Router();

// // Generate a unique token
// function generateToken() {
//   return crypto.randomBytes(20).toString('hex');
// }

// // Store the generated tokens (in production, you might use a database)
// const tokens = {};

// // Endpoint to send email with the token/link
// router.post('/send-email', async (req, res) => {
//   const userEmail = req.body.email; // User's email address
//   const token = generateToken();
//   tokens[token] = userEmail;

//   const transporter = nodemailer.createTransport({
//     // Configure your email service
//     service: 'gmail',
//     auth: {
//       user: 'shashi.dharmasena00@gmail.com',
//       pass: 'vuzl ocap nibf bcbw'
//     }
//   });

//   const mailOptions = {
//     from: 'shashi.dharmasena00@gmail.com',
//     to: userEmail,
//     subject: 'Invitation to access the system',
//     text: `Click on the following link to access the system: http://your-website.com/access?token=${token}`
//   };

//   try {
//     await transporter.sendMail(mailOptions);
//     res.status(200).send('Email sent successfully');
//   } catch (error) {
//     console.error('Error sending email:', error);
//     res.status(500).send('Error sending email');
//   }
// });

// // Endpoint to handle the token/link and grant access to the system
// router.get('/access', (req, res) => {
//   const token = req.query.token;
//   const userEmail = tokens[token];

//   if (userEmail) {
//     // Grant access to the system
//     res.status(200).send('Access granted');
//     // You might want to remove the token from the tokens object to prevent reuse
//     delete tokens[token];
//   } else {
//     res.status(401).send('Invalid or expired token');
//   }
// });


// // export default router;
// import nodemailer from 'nodemailer';
// //import dotenv from 'dotenv';
// import { generateToken, storeToken, getEmailByToken, deleteToken } from '../models/tokenModel.js';
// import Token from '../models/tokenModel.js';
// // Load environment variables
// //dotenv.config();

// // Create a transporter for sending emails
// const transporter = nodemailer.createTransport({
//     service: 'gmail', // Change this if you use a different provider
//     auth: {
//         user: 'shashi.dharmasena00@gmail.com', // Your email address
//         pass: 'vuzl ocap nibf bcbw', // Your app password
//     },
// });

// // Function to handle sending emails
// export async function sendEmail(req, res) {
//     const { email: userEmail } = req.body;

//     // Generate a token and store it
//     const token = generateToken();
//     await storeToken(token, userEmail);

//     // Define mail options
//     const mailOptions = {
//         from: process.env.EMAIL_USER, // Your email address
//         to: userEmail, // Recipient's email
//         subject: 'Invitation to access the system',
//         text: `Click on the following link to access the system: http://your-website.com/access?token=${token}`
//     };

//     try {
//         // Send the email
//         await transporter.sendMail(mailOptions);
//         res.status(200).json({ message: 'Email sent successfully' });
//     } catch (error) {
//         console.error('Error sending email:', error);
//         res.status(500).json({ error: 'Error sending email' });
//     }
// }

// // Function to handle access based on the token
// export async function grantAccess(req, res) {
//     const token = req.query.token;
//     const userEmail = await getEmailByToken(token);

//     if (userEmail) {
//         // Grant access and send success response
//         res.status(200).json({ message: 'Access granted' });
//         // Delete the token from storage to prevent reuse
//         await deleteToken(token);
//     } else {
//         // Send an error response for invalid or expired token
//         res.status(401).json({ error: 'Invalid or expired token' });
//     }
// }
// Import the necessary dependencies
// import Token from '../models/tokenModel.js'; // Adjust the path as necessary
// import { generateToken, storeToken, getEmailByToken, deleteToken } from '../models/tokenModel.js';

// // Import other dependencies (if needed)
// import nodemailer from 'nodemailer';
// import crypto from 'crypto';

// // Create a transporter for sending emails
// const transporter = nodemailer.createTransport({
//     service: 'gmail',
//     auth: {
//         user: 'shashi.dharmasena00@gmail.com', // Your email address
//         pass: 'vuzl ocap nibf bcbw', // Your app password
//     },
// });

// // Define a function to handle sending emails
// export async function sendEmail(req, res) {
//     const { email: userEmail } = req.body;

//     // Check if email is provided
//     if (!userEmail) {
//         res.status(400).json({ error: 'Email is required.' });
//         return;
//     }

//     // Proceed with generating a token
//     const token = generateToken();

//     // Create a new Token instance and save it
//     try {
//         const newToken = new Token({ token, email: userEmail });
//         await newToken.save();
//         console.log('Request body:', req.body);
//         // Define mail options
//         const mailOptions = {
//             from: 'shashi.dharmasena00@gmail.com', // Your email address
//             to: userEmail, // Recipient's email
//             subject: 'Invitation to access the system',
//             text: `Click on the following link to access the system: http://your-website.com/access?token=${token}`
//         };

//         // Send the email
//         await transporter.sendMail(mailOptions);
//         res.status(200).json({ message: 'Email sent successfully' });
//     } catch (error) {
//         console.error('Error sending email:', error);
//         res.status(500).json({ error: 'Error sending email' });
//     }
// }


// // Define a function to handle access based on the token
// export async function grantAccess(req, res) {
//     const token = req.query.token; // Get the token from the query parameters
//     const tokenRecord = await Token.findOne({ token }); // Find the token record in the database

//     if (tokenRecord) {
//         // If the token is found, grant access and send a success response
//         res.status(200).json({ message: 'Access granted' });
//         // Delete the token from storage to prevent reuse
//         await Token.deleteOne({ token });
//     } else {
//         // Send an error response for invalid or expired tokens
//         res.status(401).json({ error: 'Invalid or expired token' });
//     }
// }
import { generateToken, storeToken, getEmailByToken, deleteToken } from '../models/tokenModel.js';
import nodemailer from 'nodemailer';

// Create a transporter for sending emails
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'shashi.dharmasena00@gmail.com', // Your email address
        pass: 'vuzl ocap nibf bcbw', // Your app password (ensure this is secure and private)
    },
});

// Function to handle sending emails
export async function sendEmail(req, res) {
    const { email: userEmail } = req.body;

    // Check if email is provided
    if (!userEmail) {
        res.status(400).json({ error: 'Email is required.' });
        return;
    }

    // Proceed with generating a token
    const token = generateToken();

    try {
        await storeToken(token, userEmail);

        // Define mail options
        const mailOptions = {
            from: 'shashi.dharmasena00@gmail.com', // Your email address
            to: userEmail, // Recipient's email
            subject: 'Invitation to access the system',
            text: `Click on the following link to access the system: http://your-website.com/access?token=${token}`
        };

        // Send the email
        await transporter.sendMail(mailOptions);
        res.status(200).json({ message: 'Email sent successfully' });
    } catch (error) {
        // Provide a more descriptive error message
        console.error(`Error sending email to ${userEmail}:`, error);
        res.status(500).json({ error: `Error sending email to ${userEmail}: ${error.message}` });
    }
}

// Function to handle access based on the token
export async function grantAccess(req, res) {
    const token = req.query.token;

    if (!token) {
        res.status(400).json({ error: 'Token is required.' });
        return;
    }

    try {
        const userEmail = await getEmailByToken(token);

        if (userEmail) {
            // Grant access and send a success response
            res.status(200).json({ message: 'Access granted' });
            // Delete the token from storage to prevent reuse
            await deleteToken(token);
        } else {
            // Send an error response for invalid or expired token
            res.status(401).json({ error: 'Invalid or expired token.' });
        }
    } catch (error) {
        // Provide a more descriptive error message
        console.error(`Error handling access with token ${token}:`, error);
        res.status(500).json({ error: `Error handling access with token ${token}: ${error.message}` });
    }
}
