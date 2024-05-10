import React, { useState } from "react";
import Swal from "sweetalert2";
import axios from 'axios';
import "./GrpregForm.scss";

const GrpregForm = ({ onClose }) => {
  const [formData, setFormData] = useState({
    batch: "",
    specialization: "",
    leadersRegistrationNO: "",
    leaderName: "",
    leaderContactNo: "",
    leaderEmailAddress: "",
    member2RegistrationNO: "",
    member2Name: "",
    member2ContactNo: "",
    member2EmailAddress: "",
    member3RegistrationNO: "",
    member3Name: "",
    member3ContactNo: "",
    member3EmailAddress: "",
    member4RegistrationNO: "",
    member4Name: "",
    member4ContactNo: "",
    member4EmailAddress: "",
    title: "",
    area: "",
    supervisor: "",
    cosupervisor: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:3001/api/GrpRegistration", formData);

      if (response.status === 200) {
        // Reset form data on successful submission
        setFormData({
          batch: "",
          specialization: "",
          leadersRegistrationNO: "",
          leaderName: "",
          leaderContactNo: "",
          leaderEmailAddress: "",
          member2RegistrationNO: "",
          member2Name: "",
          member2ContactNo: "",
          member2EmailAddress: "",
          member3RegistrationNO: "",
          member3Name: "",
          member3ContactNo: "",
          member3EmailAddress: "",
          member4RegistrationNO: "",
          member4Name: "",
          member4ContactNo: "",
          member4EmailAddress: "",
          title: "",
          area: "",
          supervisor: "",
          cosupervisor: "",
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
          <button className="close-modal-button" onClick={onClose}>&times;</button>
          <h1 className="imesh_grpReg_form-title">Group Registration</h1>
          <form onSubmit={handleSubmit}>
            <div className="imesh_grpReg_main-user-info">
              <div className="user-input-box">
                <label htmlFor="batch">Batch</label>
                <input
                  type="text"
                  className="form-control"
                  id="batch"
                  name="batch"
                  value={formData.batch}
                  onChange={handleChange}
                  placeholder="Enter your Batch"
                  required
                />
              </div>
              <div className="user-input-box">
                <label htmlFor="spec">Specialization</label>
                <input
                  className="form-control"
                  id="spec"
                  name="specialization"
                  value={formData.specialization}
                  onChange={handleChange}
                  type="text"
                  placeholder="Enter a Specialization"
                  required
                />
              </div>
            

                    <div className="user-input-box">
                        <label htmlFor="title">Title</label>
                        <input
                        className="form-control"
                        id="title"
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                        type="text"
                        placeholder="Enter the Title"          
                        />   
                    </div>

                    <div className="user-input-box">
                        <label htmlFor="area">Area</label>
                        <input
                        className="form-control"
                        id="area"
                        name="area"
                        value={formData.area}
                        onChange={handleChange}
                        type="text"
                        placeholder="Enter the Area"                   
                        />   
                    </div>

                    <div className="user-input-box">
                        <label htmlFor="leaderRegNo">Leader Registration No</label>
                        <input
                            className="form-control"
                            id="leadersRegistrationNO"
                            name="leadersRegistrationNO" 
                            value={formData.leadersRegistrationNO} 
                            onChange={handleChange}
                            type="text"
                            placeholder="Enter Leader Registration No"
                        />
                    </div>

                    <div className="user-input-box">
                        <label htmlFor="leaderName">Leader Name:</label>
                        <input
                            className="form-control"
                            id="leaderName"
                            name="leaderName"
                            value={formData.leaderName}
                            onChange={handleChange}
                            type="text"
                            placeholder="Enter Leader Name"
                        />
                    </div>

                    <div className="user-input-box">
                        <label htmlFor="leaderContact">Leader Contact No:</label>
                        <input
                            className="form-control"
                            id="leaderContact"
                            name="leaderContactNo" 
                            value={formData.leaderContactNo}
                            onChange={handleChange}
                            type="text"
                            placeholder="Enter Leader Contact No"
                        />
                    </div>

                    <div className="user-input-box">
                        <label htmlFor="leaderemail">Leader Email Address:</label>
                        <input
                            className="form-control"
                            id="leaderEmailAddress"
                            name="leaderEmailAddress" 
                            value={formData.leaderEmailAddress}
                            onChange={handleChange}
                            type="text"
                            placeholder="Enter Leader Email Address"
                        />
                    </div>       

                    <div className="user-input-box">
                        <label htmlFor="m2RegNo">Member 2 Registration No:</label>
                        <input
                            className="form-control"
                            id="member2RegistrationNO"
                            name="member2RegistrationNO" 
                            value={formData.member2RegistrationNO} 
                            onChange={handleChange}
                            type="text"
                            placeholder="Enter Member 2 Registration No"
                        />
                    </div>

                    <div className="user-input-box">
                        <label htmlFor="m2Name">Member 2 Name:</label>
                        <input
                            className="form-control"
                            id="member2Name"
                            name="member2Name"
                            value={formData.member2Name}
                            onChange={handleChange}
                            type="text"
                            placeholder="Enter Member 2 Name"
                        />
                    </div>

                    <div className="user-input-box">
                        <label htmlFor="m2Contact">Member 2 Contact No:</label>
                        <input
                            className="form-control"
                            id="member2ContactNo"
                            name="member2ContactNo" 
                            value={formData.member2ContactNo}
                            onChange={handleChange}
                            type="text"
                            placeholder="Enter Member 2 Contact No"
                        />
                    </div>

                    <div className="user-input-box">
                        <label htmlFor="m2Email">Member 2 Email Address:</label>
                        <input
                            className="form-control"
                            id="member2EmailAddress"
                            name="member2EmailAddress" 
                            value={formData.member2EmailAddress}
                            onChange={handleChange}
                            type="text"
                            placeholder="Enter Member 2 Email Address"
                        />
                    </div>

                    <div className="user-input-box">
                        <label htmlFor="m3RegNo">Member 3 Registration No:</label>
                        <input
                            className="form-control"
                            id="member3RegistrationNO"
                            name="member3RegistrationNO" 
                            value={formData.member3RegistrationNO} 
                            onChange={handleChange}
                            type="text"
                            placeholder="Enter Member 3 Registration No"
                        />
                    </div>

                    <div className="user-input-box">
                        <label htmlFor="m3Name">Member 3 Name:</label>
                        <input
                            className="form-control"
                            id="member3Name"
                            name="member3Name"
                            value={formData.member3Name}
                            onChange={handleChange}
                            type="text"
                            placeholder="Enter Member 3 Name"
                        />
                    </div>

                    <div className="user-input-box">
                        <label htmlFor="m3Contact">Member 3 Contact No:</label>
                        <input
                            className="form-control"
                            id="member3ContactNo"
                            name="member3ContactNo" 
                            value={formData.member3ContactNo}
                            onChange={handleChange}
                            type="text"
                            placeholder="Enter Member 3 Contact No"
                        />
                    </div>

                    <div className="user-input-box">
                        <label htmlFor="m3Email">Member 3 Email Address:</label>
                        <input
                            className="form-control"
                            id="member3EmailAddress"
                            name="member3EmailAddress" 
                            value={formData.member3EmailAddress}
                            onChange={handleChange}
                            type="text"
                            placeholder="Enter Member 3 Email Address"
                        />
                    </div>

                    <div className="user-input-box">
                        <label htmlFor="m4RegNo">Member 4 Registration No:</label>
                        <input
                            className="form-control"
                            id="member4RegistrationNO"
                            name="member4RegistrationNO" 
                            value={formData.member4RegistrationNO} 
                            onChange={handleChange}
                            type="text"
                            placeholder="Enter Member 4 Registration No"
                        />
                    </div>


                    <div className="user-input-box">
                        <label htmlFor="m4Name">Member 4 Name:</label>
                        <input
                            className="form-control"
                            id="member4Name"
                            name="member4Name" 
                            value={formData.member4Name}
                            onChange={handleChange}
                            type="text"
                            placeholder="Enter Member 4 Name"
                        />   
                    </div>

                    <div className="user-input-box">
                        <label htmlFor="m4Contact">Member 4 Contact No:</label>
                        <input
                            className="form-control"
                            id="member4ContactNo"
                            name="member4ContactNo" 
                            value={formData.member4ContactNo}
                            onChange={handleChange}
                            type="text"
                            placeholder="Enter Member 4 Contact No"
                        />   
                    </div>

                    <div className="user-input-box">
                        <label htmlFor="m4Email">Member 4 Email Address:</label>
                        <input
                            className="form-control"
                            id="member4EmailAddress"
                            name="member4EmailAddress" 
                            value={formData.member4EmailAddress}
                            onChange={handleChange}
                            type="text"
                            placeholder="Enter Member 4 Email Address"
                        />   
                    </div>

                    <div className="user-input-box">
                        <label htmlFor="supervisor">Supervisor</label>
                        <select id="supervisor"
                        name="supervisor"
                        value={formData.supervisor}
                        onChange={handleChange}
                        >
                        <option value="">Select Supervisor </option>
                        <option value="supervisor1">supervisor 1</option>
                        <option value="supervisor2">supervisor 2</option>
                        <option value="supervisor3">supervisor 3</option>
                        </select>
                    </div>

                    <div className="user-input-box">
                        <label htmlFor="coSupervisor">Co-Supervisor</label>
                        <select id="cosupervisor"
                        name="cosupervisor"
                        value={formData.cosupervisor}
                        onChange={handleChange}
                        >
                        <option value="">Select Supervisor </option>
                        <option value="coSupervisor1">Co-Supervisor 1</option>
                        <option value="coSupervisor2">Co-Supervisor 2</option>
                        <option value="coSupervisor3">Co-Supervisor 3</option>
                        </select>
                    </div>
                </div>
            <div className="form-submit-btn">
              <button type="submit" style={{
    padding: '15px 40px',
    fontSize: '15px', // Increased font size
    fontWeight: 'bold',
    border: 'none',
    borderRadius: '10px',
    cursor: 'pointer',
    transition: 'background-color 0.3s',
    outline: 'none',
  }}>REGISTER</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default GrpregForm;


