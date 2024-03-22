import OTP from '../models/otpModel.js';
import jwt from 'jsonwebtoken';
import nodemailer from 'nodemailer';

export const sendOTP = async (req, res) => {
  const { email } = req.body;

  // Generate OTP
  const otp = Math.floor(100000 + Math.random() * 900000); // Generate a 6-digit OTP

  try {
    // Save OTP to the database
    await OTP.findOneAndUpdate({ email }, { otp }, { upsert: true, new: true });

    // Send OTP via email
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'shashi.dharmasena00@gmail.com', // Replace with your email address
        pass: 'vuzl ocap nibf bcbw' // Replace with your email password
      }
    });

    const mailOptions = {
      from: 'shashi.dharmasena00@gmail.com', // Replace with your email address
      to: email,
      subject: 'OTP Verification',
      text: `Your OTP is: ${otp}`
    };

    await transporter.sendMail(mailOptions);

    res.status(200).json({ success: true, message: 'OTP sent successfully' });
  } catch (error) {
    console.error('Error sending OTP:', error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
};

export const verifyOTP = async (req, res) => {
  const { email, otp } = req.body;

  try {
    // Find the OTP from the database
    const otpData = await OTP.findOne({ email });

    // Check if OTP exists in the database
    if (!otpData) {
      return res.status(400).json({ success: false, message: 'OTP not found or expired' });
    }

    // Check if provided OTP matches the stored OTP
    if (otp !== otpData.otp.toString()) {
      return res.status(401).json({ success: false, message: 'Invalid OTP' });
    }

    // OTP is valid, generate JWT token
    const token = jwt.sign({ email }, 'a9622be0e1ae0db6e1d8d34c1ea05072b29e22286e667d1638829dc52b2e20d0', { expiresIn: '1h' });

    // Delete the OTP from the database
    await OTP.findOneAndDelete({ email });

    res.status(200).json({ success: true, message: 'OTP verified successfully', token });
  } catch (error) {
    console.error('Error verifying OTP:', error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
};
