import React, { useState } from 'react';
import axios from 'axios';
import PhoneInput from 'react-phone-number-input';
import 'react-phone-number-input/style.css';
import './StudentSignUpForm.css'; // Import CSS file for custom styling
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle, faTimesCircle } from '@fortawesome/free-solid-svg-icons';


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
    role:'staffMember',
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
    <div className="container">
      <h2 className="mt-4 mb-4">Student Sign Up</h2>
      <form onSubmit={handleSubmit}>

        {/* Left Side Column */}
        <div className="row">
          <div className="col-md-6">
            <div className="form-column">
              <div className="mb-3">
                <label className="form-label">Email:</label>
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

              <div className="mb-3">
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

              <div className="mb-3">
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

              <div className="mb-3">
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

              <div className="mb-3">
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

              <div className="mb-3">
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

              <div className="mb-3">
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
          </div>

          {/* Right Side Column */}
          <div className="col-md-6">
            <div className="form-column">
              <div className="mb-3">
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

              <div className="mb-3">
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

              <div className="mb-3">
                <label className="form-label">AL Stream:</label>
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
            </div>
          </div>
        </div>

        {/* Sign Up Button */}
        <div className="row justify-content-end mt-3">
          <div className="col-md-6 d-flex justify-content-end align-items-start">
            <button type="submit" className="btn btn-primary btn-lg mt-2">Sign Up</button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default StudentSignUpForm;

