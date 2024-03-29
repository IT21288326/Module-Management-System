import React, { useState, useEffect } from 'react';
import { Table, Button } from 'react-bootstrap';
import axios from 'axios';
import { FaEdit } from 'react-icons/fa';
function DisplayMarks() {
  const [reports, setReports] = useState([]);
  axios.defaults.baseURL = 'http://localhost:3001';

  useEffect(() => {
    fetchReports();
  }, []);

  const fetchReports = async () => {
    try {
      const response = await axios.get('submitform/reports');
      setReports(response.data);
    } catch (error) {
      console.error('Error fetching reports:', error);
    }
  };

  const handleEdit = (reportIndex, studentIndex) => {
    // Handle navigation or display another form for co-supervisor to enter marks
    console.log('Edit marks for report:', reports[reportIndex], 'Student:', reports[reportIndex].students[studentIndex]);
  };

  return (
    <div style={{ maxWidth: '70%', margin: '0 auto' }}>
        <h2>Submitted Marks For Reports</h2>
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
                    {studentIndex === 0 ? (
                      <FaEdit/>
                    ) : null}
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
