import React, { useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2'; // Import sweetalert2
import './ReportMarks.css';

export default function ReportMarks() {
  const [groupID, setGroupID] = useState('');
  const [students, setStudents] = useState([]);
  const [formData, setFormData] = useState({
    reportTitle: '',
    semester: '',
    groupNumber: '',
    students: []
  });

  const axiosInstance = axios.create({
    baseURL: 'http://localhost:3001'
  });

  const handleSearch = async () => {
    try {
      console.log('Search button clicked');
      const response = await axiosInstance.get(`/studentReportid/groupRegistrations/${groupID}`);
      // Add marks to each student object in the response data
      const studentsWithMarks = response.data.map(student => ({
        ...student,// Initialize marks to 0
      }));
      setStudents(studentsWithMarks);
    } catch (error) {
      console.error('Error fetching student data:', error);
      // Show error message using sweetalert2
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Invaild Group Number'
      });
    }
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Extract student names and marks from students state
      const studentData = students.map(student => ({
        name: student.name,
        marks: student.marks // Include marks
      }));
  
      // Include student data in the form data
      const formDataWithStudents = {
        ...formData,
        groupNumber: groupID, // Update groupNumber with groupID
        students: studentData
      };
  
      console.log('Form submitted:', formDataWithStudents);
      const response = await axiosInstance.post('/submitform/submit-form', formDataWithStudents);
      console.log('Form submission response:', response.data);
      // Reset form data after successful submission
      setFormData({
        reportTitle: '',
        semester: '',
        groupNumber: '',
        students: []
      });
      // Show success message using sweetalert2
      Swal.fire({
        icon: 'success',
        title: 'Success',
        text: 'Form submitted successfully'
      }).then(() => {
        // Clear form data after closing the alert
        setGroupID('');
        setStudents([]);
      });
    } catch (error) {
      console.error('Error submitting form:', error);
      // Show error message using sweetalert2
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Failed to submit form'
      });
    }
  };
  

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  return (
    <div>
      <div id='savi_divform1'>
        <form id='savi_form1' onSubmit={handleSubmit}>

          <div className="form-group col-md-6">
            <label htmlFor="inputState">Report title</label>
            <select name="reportTitle" className="form-control" value={formData.reportTitle} onChange={handleInputChange}>
              <option value="" disabled selected hidden>Choose...</option>
              <option>Status document 1</option>
              <option>Log book</option>
              <option>Proposal</option>
              <option>Status document 2</option>
              <option>Final thesis</option>
            </select>
          </div>
          <div className="form-group col-md-6">
            <label htmlFor="inputState">Semester</label>
            <select name="semester" className="form-control" value={formData.semester} onChange={handleInputChange}>
              <option value="" disabled selected hidden>Choose...</option>
              <option>Semester 1</option>
              <option>Semester 2</option>
            </select>
          </div>


          <div className="form-group col-md-6">
            <label htmlFor="s1n">Group number</label>
            <input type="text" name="groupNumber" className="form-control" id="s1n" placeholder='Enter group ID' value={groupID} onChange={(e) => setGroupID(e.target.value)} />
          </div>

          <button type="button" className="btn btn-primary" id='savi_btn2' onClick={handleSearch}>Search</button>
          <div id='savi_div2'>
            {/* Render student details if students array is not empty */}
            {students.length > 0 && (
              <div>
                {students.map((student, index) => (
                  <div key={index} className="form-row">
                    <div className="form-group col-md-4">
                      <label htmlFor={`s${index + 1}n`}>{`Student ${index + 1} - Name`}</label>
                      <input type="text" className="form-control" id={`s${index + 1}n`} value={student.name} readOnly />
                    </div>
                    <div className="form-group col-md-2">
                      <label htmlFor={`s${index + 1}m`}>{`Student ${index + 1} - Marks`}</label>
                      <input type="text" className="form-control" id={`s${index + 1}m`} value={student.marks} onChange={(e) => {
                        const updatedStudents = [...students];
                        updatedStudents[index].marks = e.target.value;
                        setStudents(updatedStudents);
                      }} />
                    </div>
                  </div>
                ))}
                {/* "Enter" button */}
                <button type="submit" className="btn btn-primary" id='savi_btn1'>Submit</button>
              </div>
            )}
          </div>

        </form>
      </div>
    </div>
  );
}
