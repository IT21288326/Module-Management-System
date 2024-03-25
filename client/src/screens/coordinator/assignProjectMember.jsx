import React, { useState, useEffect } from 'react';
import axios from 'axios';

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
    <div className="container">
      <h2>Assign Staff Members for Project Roles</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
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
        <div className="mb-3">
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
        <div className="mb-3">
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
        <div className="mb-3">
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
        <div className="mb-3">
          <label htmlFor="task" className="form-label">Task:</label>
          <input
            type="text"
            id="task"
            name="task"
            value={formData.task}
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">Assign</button>
      </form>
    </div>
  );
};

export default AssignProjectForm;