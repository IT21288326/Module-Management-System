// otpModel.js
import mongoose from 'mongoose';

const otpSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true
  },
  otp: {
    type: Number,
    required: true
  }
});

export default mongoose.model('OTP', otpSchema);