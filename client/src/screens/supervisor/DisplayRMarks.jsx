import React, { useState, useEffect } from 'react';
import { Table, Form } from 'react-bootstrap';
import axios from 'axios';

function ReportsTable() {
  const [reports, setReports] = useState([]);
  const [filterGroupId, setFilterGroupId] = useState('');
  const [filterReportTitle, setFilterReportTitle] = useState('');
  const [filterSemester, setFilterSemester] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

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

  const filteredReports = reports.filter(report => {
    return (
      (report.groupId?.includes(filterGroupId) || filterGroupId === '') &&
      (report.reportTitle?.toLowerCase().includes(filterReportTitle.toLowerCase()) || filterReportTitle === '') &&
      (report.semester?.includes(filterSemester) || filterSemester === '') &&
      (report.students.some(student => student.name.toLowerCase().includes(searchTerm.toLowerCase())) || searchTerm === '')
    );
  });
  
  

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto' }}>
      <h2>Submitted Reports</h2>
      <Form id='savi_filterForm' style={{ marginTop:'5%',marginBottom:'5%'}}>
  <div className="row">
    <div className="col">
      <Form.Group controlId="formGroupId">
        <Form.Label>Filter by Group ID</Form.Label>
        <Form.Control
          type="text"
          value={filterGroupId}
          onChange={e => setFilterGroupId(e.target.value)}
        />
      </Form.Group>
    </div>
    <div className="col">
      <Form.Group controlId="formReportTitle">
        <Form.Label>Filter by Report Title</Form.Label>
        <Form.Control
          type="text"
          value={filterReportTitle}
          onChange={e => setFilterReportTitle(e.target.value)}
        />
      </Form.Group>
    </div>
    <div className="col">
      <Form.Group controlId="formSemester">
        <Form.Label>Filter by Semester</Form.Label>
        <Form.Control
          type="text"
          value={filterSemester}
          onChange={e => setFilterSemester(e.target.value)}
        />
      </Form.Group>
    </div>
    <div className="col">
      <Form.Group controlId="formSearch">
        <Form.Label>Filter by Name</Form.Label>
        <Form.Control
          type="text"
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
        />
      </Form.Group>
    </div>
  </div>
</Form>


      <Table striped bordered hover style={{ width: '100%' }}>
        <thead>
          <tr>
            <th style={{ width: '15%' }}>Report Title</th>
            <th style={{ width: '15%' }}>Semester</th>
            <th style={{ width: '15%' }}>Group Number</th>
            <th style={{ width: '25%' }}>Student Name</th>
            <th style={{ width: '15%' }}>Student Mark</th>
          </tr>
        </thead>
        <tbody>
          {filteredReports.map((report, reportIndex) => (
            <React.Fragment key={reportIndex}>
              {report.students.map((student, studentIndex) => (
                <tr key={`${reportIndex}-${studentIndex}`}>
                  <td>{studentIndex === 0 ? report.reportTitle : null}</td>
                  <td>{studentIndex === 0 ? report.semester : null}</td>
                  <td>{studentIndex === 0 ? report.groupNumber : null}</td>
                  <td>{student.name}</td>
                  <td>{student.marks}</td>
                </tr>
              ))}
            </React.Fragment>
          ))}
        </tbody>
      </Table>
    </div>
  );
}

export default ReportsTable;
