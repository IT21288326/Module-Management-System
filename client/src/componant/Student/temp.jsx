import React, { useState } from "react";
import Swal from "sweetalert2";
import axios from 'axios';
import "./GrpregForm.scss";

const GroupRegistrationForm = ({ onClose }) => {
  const [formData, setFormData] = useState({
    batch: "",
    specialization: "",
    leadersRegistrationNO: "",
    leaderName: "",
    leaderContactNo: "",
    leaderEmailAddress: "",
    member1RegistrationNO: "",
    member1Name: "",
    member1ContactNo: "",
    member1EmailAddress: "",
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
      const response = await axios.post("http://localhost:3001/api/GrpRergistration", formData);
      if (response.status === 200) {
        setFormData({
          batch: "",
          specialization: "",
          leadersRegistrationNO: "",
          leaderName: "",
          leaderContactNo: "",
          leaderEmailAddress: "",
          member1RegistrationNO: "",
          member1Name: "",
          member1ContactNo: "",
          member1EmailAddress: "",
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
        Swal.fire("Error", "Registration failed. Please try again!", "error");
      }
    } catch (error) {
      console.error("Error during registration:", error);
      Swal.fire("Error", "Registration failed. Please try again!", "error");
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
                    {/* Render form inputs */}
                    {/* Example: Batch */}
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
                        name="spec"
                        value={formData.specialization}
                        onChange={handleChange}
                        type="text"
                        placeholder="Enter a Specialization"
                        />                 
                    </div>
                    <div className="user-input-box">
                        <label htmlFor="title">Title:</label>
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
                        id="leaderRegNo"
                        name="leaderRegistrationNo"
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
                        name="Leader Name"
                        value={formData.leaderName}
                        onChange={handleChange}
                        type="text"
                        placeholder="Enter leader Name"
                        />                 
                    </div>

                    <div className="user-input-box">
                        <label htmlFor="leaderContact">Leader Contact No:</label>
                        <input
                        className="form-control"
                        id="leaderContact"
                        name="leader Contact No"
                        value={formData.leaderContactNo}
                        onChange={handleChange}
                        type="text"
                        placeholder="Enter leader Contact No"
                        />   
                    </div>

                    <div className="user-input-box">
                        <label htmlFor="leaderemail">Leader Email Address:</label>
                        <input
                        className="form-control"
                        id="leaderemail"
                        name="leaderemail"
                        value={formData.leaderEmailAddress}
                        onChange={handleChange}
                        type="text"
                        placeholder="Enter a leader Email Address"
                        />   
                    </div>

                    <div className="user-input-box">
                        <label htmlFor="m1RegNo">member 1 Registration No:</label>
                        <input
                        className="form-control"
                        id="m1RegNo"
                        name="member 1 Registration No"
                        value={formData.member1RegistrationNO}
                        onChange={handleChange}
                        type="text"
                        placeholder="Enter a member 1 Registration No"
                        />   
                    </div>

                    <div className="user-input-box">
                        <label htmlFor="m1Name">member 1 Name:</label>
                        <input
                        className="form-control"
                        id="m1Name"
                        name="member 1 Name"
                        value={formData.member1Name}
                        onChange={handleChange}
                        type="text"
                        placeholder="Enter a member 1 Name"
                        />   
                    </div>

                    <div className="user-input-box">
                        <label htmlFor="m1Contact">member 1 Contact No:</label>
                        <input
                        className="form-control"
                        id="m1Contact"
                        name="member 1 Contact No"
                        value={formData.member1ContactNo}
                        onChange={handleChange}
                        type="text"
                        placeholder="Enter a member 1 Contact No"
                        />   
                    </div>

                    <div className="user-input-box">
                        <label htmlFor="m1Email">member 1 Email Address:</label>
                        <input
                        className="form-control"
                        id="m1Email"
                        name="member 1 Email Address"
                        value={formData.member1EmailAddress}
                        onChange={handleChange}
                        type="text"
                        placeholder="Enter a member 1 Email Address"
                        />   
                    </div>

                    <div className="user-input-box">
                        <label htmlFor="m2RegNo">member 2 Registration No:</label>
                        <input
                        className="form-control"
                        id="m2RegNo"
                        name="member 2 Registration No"
                        value={formData.member2EmailAddress}
                        onChange={handleChange}
                        type="text"
                        placeholder="Enter a member 2 Registration No"
                        />   
                    </div>

                    <div className="user-input-box">
                        <label htmlFor="m2Name">member 2 Name:</label>
                        <input
                        className="form-control"
                        id="m2Name"
                        name="member 2 Name"
                        value={formData.member2Name}
                        onChange={handleChange}
                        type="text"
                        placeholder="Enter a member 2 Name"
                        />   
                    </div>

                    <div className="user-input-box">
                        <label htmlFor="m2Contact">member 2 Contact No:</label>
                        <input
                        className="form-control"
                        id="m2Contact"
                        name="member 2 Contact No"
                        value={formData.member2ContactNo}
                        onChange={handleChange}
                        type="text"
                        placeholder="Enter a member 2 Contact No"
                        />   
                    </div>

                    <div className="user-input-box">
                        <label htmlFor="m2Email">member 2 Email Address:</label>
                        <input
                        className="form-control"
                        id="m2Email"
                        name="member 2 Email Address"
                        value={formData.member2EmailAddress}
                        onChange={handleChange}
                        type="text"
                        placeholder="Enter a member 2 Email Address"
                        />   
                    </div>

                    <div className="user-input-box">
                        <label htmlFor="m3RegNo">member 3 Registration No:</label>
                        <input
                        className="form-control"
                        id="m3RegNo"
                        name="member 3 Registration No"
                        value={formData.member3RegistrationNO}
                        onChange={handleChange}
                        type="text"
                        placeholder="Enter a member 3 Registration No"
                        />   
                    </div>

                    <div className="user-input-box">
                        <label htmlFor="m3Name">member 3 Name:</label>
                        <input
                        className="form-control"
                        id="m3Name"
                        name="member 3 Name"
                        value={formData.member3Name}
                        onChange={handleChange}
                        type="text"
                        placeholder="Enter a member 3 Name"
                        />   
                    </div>

                    <div className="user-input-box">
                        <label htmlFor="m3Contact">member 3 Contact No:</label>
                        <input
                        className="form-control"
                        id="m3Contact"
                        name="member 3 Contact No"
                        value={formData.member3ContactNo}
                        onChange={handleChange}
                        type="text"
                        placeholder="Enter a member 3 Contact No"
                        />   
                    </div>

                    <div className="user-input-box">
                        <label htmlFor="m3Email">member 3 Email Address:</label>
                        <input
                        className="form-control"
                        id="m3Email"
                        name="member 3 Email Address"
                        value={formData.member3EmailAddress}
                        onChange={handleChange}
                        type="text"
                        placeholder="Enter a member 3 Email Address"
                        />   
                    </div>

                    <div className="user-input-box">
                        <label htmlFor="m4RegNo">member 4 Registration No:</label>
                        <input
                        className="form-control"
                        id="m4RegNo"
                        name="member 4 Registration No"
                        value={formData.member4RegistrationNO}
                        onChange={handleChange}
                        type="text"
                        placeholder="Enter a member 4 Registration No"
                        />   
                    </div>

                    <div className="user-input-box">
                        <label htmlFor="m4Name">member 4 Name:</label>
                        <input
                        className="form-control"
                        id="m4Name"
                        name="member 4 Name"
                        value={formData.member4Name}
                        onChange={handleChange}
                        type="text"
                        placeholder="Enter a member 4 Name"
                        />   
                    </div>

                    <div className="user-input-box">
                        <label htmlFor="m4Contact">member 4 Contact No:</label>
                        <input
                        className="form-control"
                        id="m4Contact"
                        name="member 4 Contact No"
                        value={formData.member4ContactNo}
                        onChange={handleChange}
                        type="text"
                        placeholder="Enter a member 4 Contact No"
                        />   
                    </div>

                    <div className="user-input-box">
                        <label htmlFor="m4Email">member 4 Email Address:</label>
                        <input
                        className="form-control"
                        id="m4Email"
                        name="member 4 Email Address"
                        value={formData.member4EmailAddress}
                        onChange={handleChange}
                        type="text"
                        placeholder="Enter a member 4 Email Address"
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
                        <select id="coSupervisor"
                        name="coSupervisor"
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
            {/* Add similar inputs for other fields */}
            <div className="form-submit-btn">
              <button type="submit">REGISTER</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default GroupRegistrationForm;
