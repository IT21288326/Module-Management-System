import React, { useState } from "react";
import Swal from "sweetalert2";
import axios from 'axios';
import "./GrpregForm.scss";
import { Link } from 'react-router-dom';

const GrpregForm = ({ onClose }) => {
  const [formData, setFormData] = useState({
    // Existing form data fields...
    photo1: null,
    photo2: null,
    photo3: null,
  });

  const handleChange = (e) => {
    if (e.target.type === "file") {
      setFormData({ ...formData, [e.target.name]: e.target.files[0] });
    } else {
      const { name, value } = e.target;
      setFormData({ ...formData, [name]: value });
    }
  };
  const maxSize = 1 * 1024 * 1024; // 5MB in bytes
  const handledchange = (e) => {
    if (e.target.type === "file") {
      const file = e.target.files[0];
      
      if (file && file.size > maxSize) {
        // File size exceeds the maximum allowed size
        e.target.setCustomValidity("File size exceeds 5MB");
      } else {
        // File size is within the allowed limit
        e.target.setCustomValidity(""); // Clear any previous validation message
      }
      setFormData({ ...formData, [e.target.name]: file });
    } else {
      const { name, value } = e.target;
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      // Check if photo size is valid before submitting
      if (formData.photo1 && formData.photo1.size > maxSize) {
        alert('Please upload a photo less than 5MB');
        return; // Exit function if photo size exceeds limit
      }
  
      const formDataWithFiles = new FormData();
      Object.entries(formData).forEach(([key, value]) => {
        formDataWithFiles.append(key, value);
      });
  
      const response = await axios.post("http://localhost:3001/api/GrpRegistration", formDataWithFiles);
  
      if (response.status === 200) {
        // Reset form data on successful submission
        setFormData({
          photo1: null,  // Reset photo fields
          photo2: null,
          photo3: null,
          // Reset other existing fields...
        });
        onClose();
        Swal.fire("Done", "Registration successful!", "success");
      } else {
        // Handle non-200 status codes with more specific messages
        Swal.fire("Error", `Registration failed: ${response.data.message || 'Please check the server logs for details'}`, "error");
      }
    } catch (error) {
      console.error("Error during registration:", error);
      Swal.fire("Done", "Registration successful", "success");
    }
  };

  
  return (
    <div className="imesh_grpReg">
      <div className="modal-overlay">
        <div className="modal-content">
        <Link
        to="/Registration" className="close-modal-button" onClick={onClose}>&times;</Link>
          <h1 className="imesh_grpReg_form-title">Research Publish</h1>
          <form onSubmit={handleSubmit}>
  {/* Existing form fields... */}
  <div className="imesh_grpReg_main-user-info">
    <div className="column">
      <div className="user-input-box">
        <label htmlFor="leaderName">Group ID *</label>
        <input
          className="form-control"
          id="leaderName"
          name="leaderName"
          value={formData.leaderName}
          onChange={handleChange}
          type="text"
          placeholder="Enter Group ID"
          required
        />
      </div>
      <div className="user-input-box">
        <label htmlFor="leaderName">Title *</label>
        <input
          className="form-control"
          id="leaderName"
          name="leaderName"
          value={formData.leaderName}
          onChange={handleChange}
          type="text"
          placeholder="Enter Title here"
          required
        />
      </div>
      {/* Add asterisks and set input fields as required */}
      <div className="user-input-box">
        <label htmlFor="leaderName">Group Leader Name *</label>
        <input
          className="form-control"
          id="leaderName"
          name="leaderName"
          value={formData.leaderName}
          onChange={handleChange}
          type="text"
          placeholder="Enter Leader Name"
          required
        />
      </div>
      <div className="user-input-box">
        <label htmlFor="leaderName">Supervisor's Name *</label>
        <input
          className="form-control"
          id="leaderName"
          name="leaderName"
          value={formData.leaderName}
          onChange={handleChange}
          type="text"
          placeholder="Enter Supervisor's Name"
          required
        />
      </div>
      <div className="user-input-box">
        <label htmlFor="member2Name">Cosupervisor's Name</label>
        <input
          className="form-control"
          id="member2Name"
          name="member2Name"
          value={formData.member2Name}
          onChange={handleChange}
          type="text"
          placeholder="Enter Cosupervisor's Name"
        />
      </div>
    </div>
    <div className="column">
      {/* Add asterisks and set input fields as required */}
      <div className="user-input-box">
        <label htmlFor="member3Name">Conference Name *</label>
        <input
          className="form-control"
          id="member3Name"
          name="member3Name"
          value={formData.member3Name}
          onChange={handleChange}
          type="text"
          placeholder="Enter Name of the conference"
          required
        />
      </div>
      {/* Add asterisks and set input fields as required */}
      <div className="user-input-box">
        <label htmlFor="member4Name">ISSN (if applicable) *</label>
        <input
          className="form-control"
          id="member4Name"
          name="member4Name"
          value={formData.member4Name}
          onChange={handleChange}
          type="text"
          placeholder="Enter ISSN Number"
          required
        />
      </div>
      <div className="user-input-box">
        <label htmlFor="leaderName">Link to Google Scholar *</label>
        <input
          className="form-control"
          id="leaderName"
          name="leaderName"
          value={formData.leaderName}
          onChange={handleChange}
          type="text"
          placeholder="Paste Link Here"
          required
        />
      </div>
      <div className="user-input-box">
        <label htmlFor="leaderName">Link to the Scopus site *</label>
        <input
          className="form-control"
          id="leaderName"
          name="leaderName"
          value={formData.leaderName}
          onChange={handleChange}
          type="text"
          placeholder="Paste Link Here"
          required
        />
      </div>
      <div className="user-input-box">
        <label htmlFor="leaderName">Area *</label>
        <input
          className="form-control"
          id="leaderName"
          name="leaderName"
          value={formData.leaderName}
          onChange={handleChange}
          type="text"
          placeholder="Enter Research Area"
          required
        />
      </div>
    </div>
  </div>
  {/* Photo inputs */}
  <div className="user-input-box">
    <label htmlFor="photo1">Acceptance Photo *</label>
    <input
      type="file"
      id="photo1"
      name="photo1"
      onChange={handledchange}
      accept="image/*"
      required
    />
    {/* Display validation message */}
    {formData.photo1 && formData.photo1.size > maxSize && (
      <span style={{ color: "red" }}>Error*</span>
    )}
    {formData.photo1 && formData.photo1.size <= maxSize && (
      <span style={{ color: "green" }}>Success</span>
    )}
  </div>
  <div className="user-input-box">
    <label htmlFor="photo2">Confirming Registration Photo *</label>
    <input
      type="file"
      id="photo2"
      name="photo2"
      onChange={handleChange}
      accept="image/*"
      required
    />
    
  </div>
  <div className="user-input-box">
    <label htmlFor="photo3">Payment Slip *</label>
    <input
      type="file"
      id="photo3"
      name="photo3"
      onChange={handleChange}
      accept="image/*"
      required
    />
  </div>
  {/* Submit button */}
  <div className="form-submit-btn" style={{ textAlign: "center" }}>
  <button
  type="submit"
  style={{
    padding: '15px 40px',
    fontSize: '15px', // Increased font size
    fontWeight: 'bold',
    backgroundColor: formData.photo1 && formData.photo1.size <= maxSize ? '#828080' : '#767575', // Change button color based on validation
    border: 'none',
    borderRadius: '10px',
    cursor: 'pointer',
    transition: 'background-color 0.3s',
    outline: 'none',
  }}
  disabled={formData.photo1 && formData.photo1.size > maxSize} // Disable button if photo size exceeds limit
  
>
  REGISTER
</button>

  </div>
</form>

        </div>
      </div>
    </div>
  );
};

export default GrpregForm;

