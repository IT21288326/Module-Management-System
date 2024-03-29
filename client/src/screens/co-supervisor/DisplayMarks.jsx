import React, { useState, useEffect } from 'react';
import { Table, Button, Form } from 'react-bootstrap';
import axios from 'axios';
import { useHistory } from 'react-router-dom'; // Import useHistory hook from react-router-dom

function DisplayMarks() {
  const [reports, setReports] = useState([]);
  const history = useHistory(); // Initialize useHistory hook

  useEffect(() => {
    fetchReports();
  }, []);

  const fetchReports = async () => {
    try {
      const response = await axios.get('http://localhost:3001/submitform/reports');
      setReports(response.data);
    } catch (error) {
      console.error('Error fetching reports:', error);
    }
  };

  // Function to handle edit button click
  const handleEdit = (reportIndex, studentIndex) => {
    const groupID = reports[reportIndex].groupNumber; // Get group ID
    const student = reports[reportIndex].students[studentIndex]; // Get student details

    // Navigate to the form and pass necessary data as query parameters
    history.push(`/edit-form?groupID=${groupID}&studentIndex=${studentIndex}&name=${student.name}&marks=${student.marks}&grade=${student.grade}`);
  };

  return (
    <div style={{ maxWidth: '70%', margin: '0 auto' }}>
      <Table striped bordered hover style={{ width: '100%' }}>
        <thead>
          <tr>
            <th style={{ width: '15%' }}>Report Title</th>
            <th style={{ width: '15%' }}>Semester</th>
            <th style={{ width: '15%' }}>Group Number</th>
            <th style={{ width: '25%' }}>Student Name</th>
            <th style={{ width: '15%' }}>Student Mark</th>
            <th style={{ width: '15%' }}>Co-supervisor Mark</th>
          </tr>
        </thead>
        <tbody>
          {reports.map((report, reportIndex) => (
            <React.Fragment key={reportIndex}>
              {report.students.map((student, studentIndex) => (
                <tr key={`${reportIndex}-${studentIndex}`}>
                  <td>{studentIndex === 0 ? report.reportTitle : null}</td>
                  <td>{studentIndex === 0 ? report.semester : null}</td>
                  <td>{studentIndex === 0 ? report.groupNumber : null}</td>
                  <td>{student.name}</td>
                  <td>{student.marks}</td>
                  <td>
                    {studentIndex === 0 && !student.coSupervisorMarks ? (
                      <Button variant="primary" onClick={() => handleEdit(reportIndex, studentIndex)}>
                        Edit
                      </Button>
                    ) : (
                      student.coSupervisorMarks
                    )}
                  </td>
                </tr>
              ))}
            </React.Fragment>
          ))}
        </tbody>
      </Table>
    </div>
  );
}

export default DisplayMarks;
