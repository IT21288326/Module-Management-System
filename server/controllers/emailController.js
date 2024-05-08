
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
