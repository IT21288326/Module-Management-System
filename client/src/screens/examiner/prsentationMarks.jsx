
import React, { useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import './prsentationMarks.css';

export default function PrsentationMarks() {
  const [groupID, setGroupID] = useState('');
  const [students, setStudents] = useState([]);
  const [formData, setFormData] = useState({
    presentationTitle: '',
    semester: '',
    groupNumber: '',
    students: []
  });

  const axiosInstance = axios.create({
    baseURL: 'http://localhost:3001'
  });

  const calculateGrade = (marks) => {
    if (!marks) {
      return '';
    }
    if (marks >= 90) {
      return 'A+';
    } else if (marks >= 80) {
      return 'A';
    } else if (marks >= 75) {
      return 'A-';
    } else if (marks >= 70) {
      return 'B+';
    } else if (marks >= 65) {
      return 'B';
    } else if (marks >= 60) {
      return 'B-';
    } else if (marks >= 55) {
      return 'C+';
    } else if (marks >= 45) {
      return 'C';
    } else if (marks >= 40) {
      return 'C-';
    } else if (marks >= 35) {
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

      // Include student data in the form data
      const studentData = students.map(student => ({
        name: student.name,
        marks: student.marks,
        grade: calculateGrade(student.marks)
      }));

      const formDataWithStudents = {
        ...formData,
        groupNumber: groupID,
        students: studentData
      };

      // Send form data to the server
      const response = await axiosInstance.post('/submitPresentation/submit-form', formDataWithStudents);

      // Reset form data after successful submission
      setFormData({
        presentationTitle: '',
        semester: '',
        groupNumber: '',
        students: []
      });
      setGroupID('');
      setStudents([]);

      Swal.fire({
        icon: 'success',
        title: 'Success',
        text: 'Form submitted successfully.'
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
      const response = await axiosInstance.get(`/studentReportid/groupRegistrations/${groupID}`);
      const studentsWithMarks = response.data.map(student => ({
        ...student,
      }));
      setStudents(studentsWithMarks);
    } catch (error) {
      console.error('Error fetching student data:', error);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Invalid Group Number'
      });
    }
  };

  return (
    <div>
      <div id='savi_divform1'>
        <form id='savi_form1' onSubmit={handleSubmit}>
        <h2>Enter Marks For Presentation</h2>
        <br></br>
          <div className="form-group  col-md-7">
            <label htmlFor="inputState">Presentation title</label>
            <select name="presentationTitle" className="form-control" value={formData.presentationTitle} onChange={handleInputChange}>
              <option value="" disabled selected hidden>Choose...</option>
              <option>Proposal</option>
              <option>Progress 1</option>
              <option>Progress 2</option>
              <option>Final presentations</option>
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
                      <input type="text" className="form-control" id={`s${index + 1}m`} value={student.marks} onChange={(e) => handleMarksChange(index, e.target.value)} />
                    </div>
                    <div className="form-group col-md-2">
                      <label htmlFor={`s${index + 1}g`}>{`Grade`}</label>
                      <input type="text" className="form-control" id={`s${index + 1}g`} value={calculateGrade(student.marks)} readOnly />
                    </div>
                  </div>
                ))}
                <button type="submit" className="btn btn-primary" id='savi_btn1'>Submit</button>
              </div>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}




