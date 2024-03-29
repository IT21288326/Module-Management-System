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

    // Helper function to calculate grade based on marks
const calculateGrade = (marks) => {
  if (!marks) {
    return ''; // Return empty string if marks are not available
  }
  if (marks >= 90) {
    return 'A+';
  } else if (marks >= 80) {
    return 'A';
  } else if (marks >= 75) {
    return 'A-';
  }else if (marks >= 70) {
    return 'B+';
  } else if (marks >= 65) {
    return 'B';
  }else if (marks >= 60) {
    return 'B-';
  } else if (marks >= 55) {
    return 'C+';
  }else if (marks >= 45) {
    return 'C';
  } else if (marks >= 40) {
    return 'C-';
  }else if (marks >= 35) {
    return 'D+';
  } else if (marks >= 30) {
    return 'D';
  } else {
    return 'E';
  }
};
const validateMarks = (marks) => {
  return !isNaN(marks) && marks >= 0 && marks <= 100;
};
const handleMarksChange = (index, marks) => {
  if (!validateMarks(marks)) {
    Swal.fire({
      icon: 'error',
      title: 'Error',
      text: 'Marks should be a number between 0 and 100'
    });
    return;
  }
  const updatedStudents = [...students];
  updatedStudents[index].marks = marks;
  setStudents(updatedStudents);
};
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
      const existingRecord = students.some(student => 
        student.presentationTitle === formData.presentationTitle &&
        student.semester === formData.semester &&
        student.groupNumber === groupID
      );

      if (existingRecord) {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'A record with the same title, semester, and group number already exists.'
        });
        return;
      }
      // Extract student names and marks from students state
      const studentData = students.map(student => ({
        name: student.name,
        marks: student.marks ,// Include marks
        grade: calculateGrade(student.marks)
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
      if (error.response && error.response.status === 400) {
        // If the server responds with a 400 status code, display the error message from the server
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: error.response.data.message
        });
      } else {
        // For other errors, show a generic error message
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Failed to submit form.'
        });
      }
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
        <h2>Enter Marks For Reports</h2>
        <br></br>
          <div className="form-group col-md-7">
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
          <div className="form-group col-md-7">
            <label htmlFor="inputState">Semester</label>
            <select name="semester" className="form-control" value={formData.semester} onChange={handleInputChange}>
              <option value="" disabled selected hidden>Choose...</option>
              <option>Semester 1</option>
              <option>Semester 2</option>
            </select>
          </div>


          <div className="form-group col-md-7">
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
                    <div className="form-group col-md-3">
                      <label htmlFor={`s${index + 1}n`}>{`Student ${index + 1} - Name`}</label>
                      <input type="text" className="form-control" id={`s${index + 1}n`} value={student.name} readOnly />
                    </div>
                    <div className="form-group col-md-2">
                      <label htmlFor={`s${index + 1}m`}>{`Marks`}</label>
                      <input type="text" className="form-control" id={`s${index + 1}m`} value={student.marks} onChange={(e) =>handleMarksChange(index, e.target.value) } />
                    </div>
                    <div className="form-group col-md-2">
                      <label htmlFor={`s${index + 1}g`}>{`Grade`}</label>
                      <input type="text" className="form-control" id={`s${index + 1}g`} value={calculateGrade(student.marks)} readOnly />
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
