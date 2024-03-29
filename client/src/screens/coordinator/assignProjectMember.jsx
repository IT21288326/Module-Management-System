import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';

const AssignProjectForm = () => {
  const [formData, setFormData] = useState({
    selectedStaff: '',
    role: '',
    task: '',
    designation: '',
    email: ''
  });
  const [staffMembers, setStaffMembers] = useState([]);
  axios.defaults.baseURL = 'http://localhost:3001';

  useEffect(() => {
    // Fetch staff members from the server
    const fetchStaffMembers = async () => {
      try {
        const response = await axios.get('/api/staffMember');
        setStaffMembers(response.data); // Assuming the response contains staff member data
      } catch (error) {
        console.error('Error fetching staff members:', error);
        // Handle error
      }
    };

    fetchStaffMembers();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleStaffSelection = (e) => {
    const selectedStaffId = e.target.value;
    const selectedStaff = staffMembers.find(staff => staff._id === selectedStaffId);

    setFormData({
      ...formData,
      selectedStaff: selectedStaffId,
      designation: selectedStaff.designation,
      email: selectedStaff.Email
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put('/api/update-staff-role', { userId: formData.selectedStaff });
      await axios.post('/api/assign-project', formData);
      // Redirect or show success message
      console.log('Staff member assigned to project successfully');
    } catch (error) {
      console.error('Error assigning staff member to project:', error);
      // Handle error
    }
  };

  return (
    <div className="container" style={{marginLeft:"25%",marginTop:'2%'}}>
      <h2 style={{marginLeft:"20px"}}>Assign Staff Members for Project Roles</h2>
      <br></br>
      <form onSubmit={handleSubmit}>
        <div className="mb-3 col-md-8">
          <label htmlFor="selectedStaff" className="form-label">Select Staff Member:</label>
          <select
            id="selectedStaff"
            name="selectedStaff"
            value={formData.selectedStaff}
            onChange={handleStaffSelection}
            className="form-control"
            required
          >
            <option value="">Select Staff Member</option>
            {staffMembers.map((staff) => (
              <option key={staff._id} value={staff._id} data-designation={staff.designation} data-email={staff.Email}>
                {staff.Fullname}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-3 col-md-8">
          <label htmlFor="designation" className="form-label">Designation:</label>
          <input
            type="text"
            id="designation"
            name="designation"
            value={formData.designation}
            onChange={handleChange}
            className="form-control"
            required
            readOnly
          />
        </div>
        <div className="mb-3 col-md-8">
          <label htmlFor="email" className="form-label">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="form-control"
            required
            readOnly
          />
        </div>
        <div className="mb-3 col-md-8">
          <label htmlFor="role" className="form-label">Role:</label>
          <select
            id="role"
            name="role"
            value={formData.role}
            onChange={handleChange}
            className="form-control"
            required
          >
            <option value="">Select Role</option>
            <option value="Project Member">Project Member</option>
            {/* Add other role options here */}
          </select>
        </div>
        <div  className="form-row col-md-8">
                    <div className="form-group col-md-6">
                    <label htmlFor="inputState">Assigned for semester</label>
            <select name="semester" className="form-control" >
              <option value="" disabled selected hidden>Choose...</option>
              <option>Semester 1</option>
              <option>Semester 2</option>
            </select>
                      </div>
                    <div className="form-group col-md-6" >
                    <label htmlFor="inputState">Assigned for specalization</label>
            <select name="semester" className="form-control" >
              <option value="" disabled selected hidden>Choose...</option>
              <option>IT</option>
              <option>DS</option>
              <option>SE</option>
              <option>CSNE</option>
            </select>
                      </div>
                    
                  </div>
        <div className="mb-3 col-md-8">
          <label htmlFor="task" className="form-label">Task:</label>

<textarea
                id="task"
            name="task"
            value={formData.task}
            onChange={handleChange}
            className="form-control"
            
            style={{height:"150px"}}
            placeholder='Describe the task'
            required
              />

        </div>

        <Button type="submit" className="btn-primary" style={{width:"430px",marginTop:"30px", marginLeft:"150px"}}>Submit</Button>
      </form>
    </div>
  );
};

export default AssignProjectForm;