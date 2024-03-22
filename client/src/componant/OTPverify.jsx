import React, { useState } from 'react';
import Swal from 'sweetalert2';
import axios from 'axios';
import './OTPverify.css';

const EmailVerification = () => {
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [isValidEmail, setIsValidEmail] = useState(true);
  const [isOtpSent, setIsOtpSent] = useState(false);
  axios.defaults.baseURL = 'http://localhost:3001';

  const handleEmailChange = (event) => {
    const { value } = event.target;
    setEmail(value);
    // Validate email format
    const emailRegex = /^[a-zA-Z0-9._%+-]+@(my\.)?sliit\.lk$/;
    setIsValidEmail(emailRegex.test(value));
  };

  const handleOtpChange = (event) => {
    setOtp(event.target.value);
  };

  const handleSendOtp = async () => {
    if (isValidEmail) {
      try {
        await axios.post('/otp/send-otp', { email });
        setIsOtpSent(true);
        Swal.fire({
          icon: 'success',
          title: 'OTP Sent!',
          text: 'An OTP has been sent to your email address.',
        });
      } catch (error) {
        console.error('Error sending OTP:', error);
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Failed to send OTP. Please try again later.',
        });
      }
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await axios.post('/otp/verify-otp', { email, otp });
      Swal.fire({
        icon: 'success',
        text: 'Success',
      });
      // Redirect to registration form or perform other actions upon successful OTP verification
    } catch (error) {
      console.error('Error verifying OTP:', error);
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Failed to verify OTP. Please try again.',
      });
    } finally {
      // Reset form fields
      setEmail('');
      setOtp('');
      setIsOtpSent(false);
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6 ">
          <div className="card " id='shashi_crd1'>
            <div className="card-body">
              <h2 className="card-title text-center mb-4">Email Verification</h2>
              <form id='shashi-form1' onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">Email:</label>
                  <input
                    type="email"
                    id="email"
                    className={`form-control ${isValidEmail ? '' : 'is-invalid'}`}
                    value={email}
                    onChange={handleEmailChange}
                    placeholder="Enter your email"
                    required
                  />
                  {!isValidEmail && <div className="invalid-feedback">Invalid email format</div>}
                </div>
                <div className="mb-3 d-grid">
                  <button id='shashi_btn1'
                    type="button"
                    onClick={handleSendOtp}
                    className="btn btn-primary btn-sm"
                    disabled={!isValidEmail || isOtpSent}
                  >
                    {isOtpSent ? 'Resend OTP' : 'Send OTP'}
                  </button>
                </div>
                {isOtpSent && (
                  <>
                    <div className="mb-3">
                      <label htmlFor="otp" className="form-label">OTP:</label>
                      <input
                        type="text"
                        id="otp"
                        className="form-control"
                        value={otp}
                        onChange={handleOtpChange}
                        placeholder="Enter OTP"
                        required
                      />
                    </div>
                    <button id='shashi_btn2' type="submit" className="btn btn-success btn-block">Submit</button>
                  </>
                )}
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmailVerification;

