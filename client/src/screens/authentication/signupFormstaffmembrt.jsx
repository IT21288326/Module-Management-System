import React, { useState } from 'react';
import axios from 'axios';
import PhoneInput from 'react-phone-number-input';
import 'react-phone-number-input/style.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle, faTimesCircle } from '@fortawesome/free-solid-svg-icons';
import Swal from 'sweetalert2';
import './StudentSignUpForm.css'; // Import CSS file for custom styling
import { Container, Row, Col, Card, Button } from 'react-bootstrap';

const StaffSignUpForm = () => {
  const [formData, setFormData] = useState({
    Email: '',
    Fullname: '',
    Nic: '',
    personalEmailAddress: '',
    AddressPer: '',
    Addresstemp: '',
    contactNo: '',
    role: 'staffMember',
    designation: '',
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
        console.log('Staff Member signed up successfully');
        Swal.fire({
          icon: 'success',
          title: 'Sign Up Successful!',
          text: 'You have successfully signed up as a staff.',
          
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
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const validatePassword = (password) => {
    const lowerCaseRegex = /[a-z]/;
    const upperCaseRegex = /[A-Z]/;
    const specialCharRegex = /[!@#$%^&*(),.?":{}|<>]/;
    const numberRegex = /[0-9]/;

    const containsLowerCase = lowerCaseRegex.test(password);
    const containsUpperCase = upperCaseRegex.test(password);
    const containsSpecialChar = specialCharRegex.test(password);
    const containsNumber = numberRegex.test(password);

    const isValid =
      containsLowerCase &&
      containsUpperCase &&
      containsSpecialChar &&
      containsNumber;

    setPasswordValid(isValid);
  };

  return (
    <div className="container" style={{ backgroundColor: '#ffffff', maxWidth: '800px', padding: '20px' }}>
      <h2 className="mt-4 mb-4">Staff Member Sign Up</h2>
      <form onSubmit={handleSubmit}>
       
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

            {/* Full Name */}
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

            {/* First Name */}
            <div className="form-group col-md-6">
              <label className="form-label">First Name:</label>
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                className={`form-control ${formErrors.firstName ? 'is-invalid' : ''}`}
                required
              />
              {formErrors.firstName && <div className="invalid-feedback">{formErrors.firstName}</div>}
            </div>
        </div>
            
            <div className="mb-3">
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
          {/* </div> */}
{/* NIC */}
<div  className="form-row ">
            <div className="form-group col-md-6">
              <label className="form-label">NIC:</label>
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
            {/* Contact No */}
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
            </div>
            {/* Personal Email Address */}


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

            {/* Contact No */}
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

          {/* Right Side Form Fields */}
          {/* <div className="col-md-6"> */}
            {/* Permanent Address */}
            
            {/* Temporary Address */}
            

            

            {/* Designation */}
            
            <div className="mb-3">
              <label className="form-label">Designation:</label>
              <select
                name="designation"
                value={formData.designation}
                onChange={handleChange}
                className={`form-control ${formErrors.designation ? 'is-invalid' : ''}`}
                required
              >
                <option value="">Select Designation</option>
                <option>Instructor</option>
                <option>Asst. Lec-temp</option>
                <option>Asst. Lec</option>
                <option>Lecturer -probation</option>
                <option>Lecturer</option>
                <option>Senior Lecturer</option>
                <option>Senior Lecturer(Higher Grade)</option>
                <option>Asst. Professor</option>
                <option>Professor</option>
              </select>
              {formErrors.designation && <div className="invalid-feedback">{formErrors.designation}</div>}
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
                  icon={formErrors.Password ? faTimesCircle : faCheckCircle}
                  className={`password-icon ${formErrors.Password ? 'invalid' : 'valid'}`}
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
            {/* </div> */}
          {/* </div> */}
  
          {/* Submit Button */}
          
           
              {/* <button type="submit" className="btn-primary" style={{width:"430px",marginTop:"30px"}}>Sign Up</button> */}
              <Button type="submit" className="btn-primary" style={{width:"430px",marginTop:"30px",marginLeft:'150px'}}>Submit</Button>
         
        </form>
      </div>
    );
  };
  
  export default StaffSignUpForm;
  