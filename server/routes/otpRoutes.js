// otpRoutes.js
import { Router } from 'express';
const router = Router();
import { sendOTP, verifyOTP } from '../controllers/otpController.js';

// Route to send OTP
router.post('/send-otp', sendOTP);

// Route to verify OTP
router.post('/verify-otp', verifyOTP);

export default router;
