import React, { useState } from 'react';
import Swal from 'sweetalert2';
import axios from 'axios';
import './OTPverify.css';
import backgroundImage from '../img/back1.jpg'; // Import your background image
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
        // Show loading message while waiting for OTP to be sent
        Swal.fire({
          icon: 'info',
          title: 'Please wait...',
          text: 'Sending OTP...',
          showConfirmButton: false,
          allowOutsideClick: false,
        });
  
        // Simulate delay for demo purposes (remove in production)
        await new Promise(resolve => setTimeout(resolve, 2000));
  
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

      // Extract domain from the email address
      const domain = email.split('@')[1];
      if (domain === 'my.sliit.lk') {
        // Redirect to student signup form
        window.location.href = '/signUp-student';
      } else if (domain === 'sliit.lk') {
        // Redirect to staff member signup form
        window.location.href = '/signUp-staff';
      } else {
        // Unknown domain, handle appropriately
        console.log('Unknown domain');
      }

      Swal.fire({
        icon: 'success',
        text: 'Success',
      });
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
<div 
style={{
  // backgroundImage: `url(${backgroundImage})`,
  // backgroundSize: 'cover',
  // backgroundPosition: 'center',
  // minHeight: '100vh',
  // padding: '50px' // Adjust padding instead of margin
  height:'900px'
}}
>
  <div className="row justify-content-center">
    <div >
      <div className="card" id='shashi_crd1'>
        <div className="card-body">
          <h2 className="card-title text-center mb-2">Welcome</h2>
          <h3 className="card-title text-center mb-4">Verify your email to enroll the Module</h3> {/* Smaller heading */}
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
