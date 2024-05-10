import mongoose from 'mongoose';
import crypto from 'crypto';

// Define a schema for storing tokens
const tokenSchema = new mongoose.Schema({
    token: {
        type: String,
        required: true,
        unique: true,
    },
    email: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
        expires: '1h', // Automatically remove tokens older than 1 hour
    },
});

// Create a Mongoose model
const Token = mongoose.model('Token', tokenSchema);

// Function to generate a new token
export function generateToken() {
    return crypto.randomBytes(20).toString('hex');
}

// Function to store a token and email
export async function storeToken(token, email) {
    const newToken = new Token({ token, email });
    await newToken.save();
}

// Function to get email by token
export async function getEmailByToken(token) {
    const tokenRecord = await Token.findOne({ token });
    return tokenRecord ? tokenRecord.email : null;
}

// Function to delete a token
export async function deleteToken(token) {
    await Token.deleteOne({ token });
}

export default Token;
