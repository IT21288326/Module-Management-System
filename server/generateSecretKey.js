import { randomBytes } from 'crypto';

// Generate a random string of 64 characters
const secretKey = randomBytes(32).toString('hex');
console.log(secretKey);
