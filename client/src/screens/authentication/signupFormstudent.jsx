


import React, { useState } from 'react';
import axios from 'axios';
import PhoneInput from 'react-phone-number-input';
import 'react-phone-number-input/style.css';
import './StudentSignUpForm.css'; // Import CSS file for custom styling
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle, faTimesCircle } from '@fortawesome/free-solid-svg-icons';
import Swal from 'sweetalert2';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';

import backgroundImage from '../../img/back1.jpg'; // Import your background image

const StudentSignUpForm = () => {
  const [formData, setFormData] = useState({
    Email: '',
    Fullname: '',
    firstName: '',
    Nic: '',
    personalEmailAddress: '',
    AddressPer: '',
    Addresstemp: '',
    contactNo: '',
    role:'student',
    GuardianName: '',
    GuardianContactNo: '',
    ALstream: '',
    Password: '',
    ConfirmPassword: ''
  });

  const [formErrors, setFormErrors] = useState({});
  const [passwordValid, setPasswordValid] = useState(false);
  axios.defaults.baseURL = 'http://localhost:3001';
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    if (name === 'Password') {
      validatePassword(value);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm() && passwordValid) {
      try {
        await axios.post('/api/users', formData);
        // Redirect or show success message
        console.log('Student signed up successfully');
  
        // Display SweetAlert success message
        Swal.fire({
          icon: 'success',
          title: 'Sign Up Successful!',
          text: 'You have successfully signed up as a student.',
        });
        window.location.href = 'http://localhost:3000/login';
      } catch (error) {
        console.error('Error signing up student:', error);
        // Handle error
      }
    }
  };
  

  const validateForm = () => {
    let errors = {};
    if (!formData.Email || !formData.Email.trim()) {
      errors.Email = 'Email is required';
    }
    if (formData.Password !== formData.ConfirmPassword) {
      errors.ConfirmPassword = 'Passwords do not match';
    }
    // Add validation rules for other fields
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const validatePassword = (password) => {
    // Regular expressions to check for lowercase, uppercase, special character, and number
    const lowerCaseRegex = /[a-z]/;
    const upperCaseRegex = /[A-Z]/;
    const specialCharRegex = /[!@#$%^&*(),.?":{}|<>]/;
    const numberRegex = /[0-9]/;

    // Check if the password contains at least one lowercase letter
    const containsLowerCase = lowerCaseRegex.test(password);

    // Check if the password contains at least one uppercase letter
    const containsUpperCase = upperCaseRegex.test(password);

    // Check if the password contains at least one special character
    const containsSpecialChar = specialCharRegex.test(password);

    // Check if the password contains at least one number
    const containsNumber = numberRegex.test(password);

    // Check if all conditions are met
    const isValid =
      containsLowerCase &&
      containsUpperCase &&
      containsSpecialChar &&
      containsNumber;

    setPasswordValid(isValid);
  };

  return (
    <div className="container-fluid bg-white py-4"
    style={{
      backgroundImage: `url(${backgroundImage})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      minHeight: '100vh',
      padding: '50px' // Adjust padding instead of margin
      
    }}
    >
      <div className="row justify-content-center">
        <div className="col-md-8">
          <div className="card"  style={{opacity:'0.8'}}>
            <div className="card-body">
              <h2 >Student Sign Up</h2>
              <form onSubmit={handleSubmit}>
                {/* Rest of the form code */}
{/* Left Side Column */}

        
          
              <div className="mb-3">
                <label className="form-group col-md-7">Email:</label>
                <input
                  type="email"
                  name="Email"
                  value={formData.Email}
                  onChange={handleChange}
                  className={`form-control ${formErrors.Email ? 'is-invalid' : ''}`}
                  required
                />
                {formErrors.Email && <div className="invalid-feedback">{formErrors.Email}</div>}
              </div>
              <div  className="form-row ">
              <div className="form-group col-md-6">
                <label className="form-label">Full Name:</label>
                <input
                  type="text"
                  name="Fullname"
                  value={formData.Fullname}
                  onChange={handleChange}
                  className={`form-control ${formErrors.Fullname ? 'is-invalid' : ''}`}
                  required
                />
                {formErrors.Fullname && <div className="invalid-feedback">{formErrors.Fullname}</div>}
              </div>

              <div className="form-group col-md-6">
                <label className="form-label">First Name:</label>
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  className="form-control"
                  required
                />
              </div>
            </div>
            <div  className="form-row ">

              <div className="form-group col-md-6">
                <label className="form-label">Contact No:</label>
                <PhoneInput
                  placeholder="Enter phone number"
                  value={formData.contactNo}
                  onChange={(value) => setFormData({ ...formData, contactNo: value })}
                  className={`form-control ${formErrors.contactNo ? 'is-invalid' : ''}`}
                  required
                />
                {formErrors.contactNo && <div className="invalid-feedback">{formErrors.contactNo}</div>}
              </div>
              <div className="form-group col-md-6">
                <label className="form-label">Personal Email Address:</label>
                <input
                  type="email"
                  name="personalEmailAddress"
                  value={formData.personalEmailAddress}
                  onChange={handleChange}
                  className={`form-control ${formErrors.personalEmailAddress ? 'is-invalid' : ''}`}
                  required
                />
                {formErrors.personalEmailAddress && <div className="invalid-feedback">{formErrors.personalEmailAddress}</div>}
              </div>
              </div>
              <div  className="form-row ">
              <div className="form-group col-md-6">
                <label className="form-label">Permanent Address:</label>
                <input
                  type="text"
                  name="AddressPer"
                  value={formData.AddressPer}
                  onChange={handleChange}
                  className={`form-control ${formErrors.AddressPer ? 'is-invalid' : ''}`}
                  required
                />
                {formErrors.AddressPer && <div className="invalid-feedback">{formErrors.AddressPer}</div>}
              </div>

              <div className="form-group col-md-6">
                <label className="form-label">Temporary Address:</label>
                <input
                  type="text"
                  name="Addresstemp"
                  value={formData.Addresstemp}
                  onChange={handleChange}
                  className={`form-control ${formErrors.Addresstemp ? 'is-invalid' : ''}`}
                  required
                />
                {formErrors.Addresstemp && <div className="invalid-feedback">{formErrors.Addresstemp}</div>}
              </div>
              </div>
              
              <div className="mb-3">
                <label className="form-group col-md-7">NIC:</label>
                <input
                  type="text"
                  name="Nic"
                  value={formData.Nic}
                  onChange={handleChange}
                  className={`form-control ${formErrors.Nic ? 'is-invalid' : ''}`}
                  required
                />
                {formErrors.Nic && <div className="invalid-feedback">{formErrors.Nic}</div>}
              </div>
         

              <div className="mb-3">
                <label className="form-group col-md-7">AL Stream:</label>
                <select
                  name="ALstream"
                  value={formData.ALstream}
                  onChange={handleChange}
                  className={`form-control ${formErrors.ALstream ? 'is-invalid' : ''}`}
                  required
                >
                  <option value="">
                  Select AL Stream</option>
                  <option value="Science Stream (physical)">Science Stream (physical)</option>
                  <option value="Science Stream (Bio)">Science Stream (Bio)</option>
                  <option value="Commerce Stream">Commerce Stream</option>
                  <option value="Tech Stream">Tech Stream</option>
                  <option value="Art Stream">Art Stream</option>
                </select>
                {formErrors.ALstream && <div className="invalid-feedback">{formErrors.ALstream}</div>}
              </div> 

          {/* Right Side Column */}
          
          <div  className="form-row ">
              <div className="form-group col-md-6">
                               <label className="form-label">Guardian Name:</label>
                <input
                  type="text"
                  name="GuardianName"
                  value={formData.GuardianName}
                  onChange={handleChange}
                  className={`form-control ${formErrors.GuardianName ? 'is-invalid': ''}`}
                  required
                />
                {formErrors.GuardianName && <div className="invalid-feedback">{formErrors.GuardianName}</div>}
              </div>

              <div className="form-group col-md-6">
                <label className="form-label">Guardian Contact No:</label>
                <PhoneInput
                  placeholder="Enter phone number"
                  value={formData.GuardianContactNo}
                  onChange={(value) => setFormData({ ...formData, GuardianContactNo: value })}
                  className={`form-control ${formErrors.GuardianContactNo ? 'is-invalid' : ''}`}
                  required
                />
                {formErrors.GuardianContactNo && <div className="invalid-feedback">{formErrors.GuardianContactNo}</div>}
              </div>
</div>
              

              {/* Password */}
              <div className="mb-3">
                <label className="form-label">Password:</label>
                <input
                  type="password"
                  name="Password"
                  value={formData.Password}
                  onChange={handleChange}
                  className={`form-control ${formErrors.Password ? 'is-invalid' : ''}`}
                  required
                />
                {formData.Password && (
                  <FontAwesomeIcon
                    icon={formErrors.Password || !passwordValid ? faTimesCircle : faCheckCircle}
                    className={`password-icon ${formErrors.Password || !passwordValid ? 'invalid' : 'valid'}`}
                  />
                )}
                {formErrors.Password && <div className="invalid-feedback">{formErrors.Password}</div>}
                {formData.Password && (
                  <div className="password-validation">
                    <span className={`password-icon ${passwordValid ? 'valid' : 'invalid'}`}>
                      {passwordValid ? <FontAwesomeIcon icon={faCheckCircle} /> : <FontAwesomeIcon icon={faTimesCircle} />}
                    </span>
                    <span className="password-text">Password must contain at least 8 characters, one number, one special character, one lowercase letter, and one uppercase letter.</span>
                  </div>
                )}
              </div>
              
              {/* Confirm Password */}
              <div className="mb-3">
                <label className="form-label">Confirm Password:</label>
                <input
                  type="password"
                  name="ConfirmPassword"
                  value={formData.ConfirmPassword}
                  onChange={handleChange}
                  className={`form-control ${formErrors.ConfirmPassword ? 'is-invalid' : ''}`}
                  required
                />
                {formErrors.ConfirmPassword && <div className="invalid-feedback">{formErrors.ConfirmPassword}</div>}
              </div>
            
         
      

        {/* Sign Up Button */}
        <Button type="submit" className="btn-primary" style={{width:"430px",marginTop:"30px",marginLeft:'300px'}}>Submit</Button>
         
      </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentSignUpForm;
