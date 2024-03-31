import React, { useState, useEffect } from 'react';
import { Table, Form } from 'react-bootstrap';
import axios from 'axios';

function PresentationsTable() {
  const [presentations, setpresentations] = useState([]);
  const [filterGroupId, setFilterGroupId] = useState('');
  const [filterpresentationTitle, setFilterpresentationTitle] = useState('');
  const [filterSemester, setFilterSemester] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  axios.defaults.baseURL = 'http://localhost:3001';

  useEffect(() => {
    fetchPresentations();
  }, []);

  const fetchPresentations = async () => {
    try {
      const response = await axios.get('submitPresentation/getPresentation');
      setpresentations(response.data);
    } catch (error) {
      console.error('Error fetching presentations:', error);
    }
  };

  const filteredPresentation = presentations.filter(presentation => {
    return (
      (presentation.groupNumber?.toLowerCase().includes(filterGroupId.toLowerCase()) || filterGroupId === '') &&
      (presentation.presentationTitle?.toLowerCase().includes(filterpresentationTitle.toLowerCase()) || filterpresentationTitle === '') &&
      (presentation.semester?.toLowerCase().includes(filterSemester.toLowerCase()) || filterSemester === '') &&
      (presentation.students.some(student => student.name.toLowerCase().includes(searchTerm.toLowerCase())) || searchTerm === '')
    );
  });
  
  

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto' }}>
      <h2>Submitted Marks For Presentation</h2>
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
      <Form.Group controlId="formPresentationTitle">
        <Form.Label>Filter by Presentation Title</Form.Label>
        <Form.Control
          type="text"
          value={filterpresentationTitle}
          onChange={e => setFilterpresentationTitle(e.target.value)}
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


      <Table striped bordered hover style={{ width: '100%',backgroundColor:'white',opacity:'0.8' }}>
        <thead>
          <tr>
            <th style={{ width: '15%' }}>presentation Title</th>
            <th style={{ width: '15%' }}>Semester</th>
            <th style={{ width: '15%' }}>Group Number</th>
            <th style={{ width: '25%' }}>Student Name</th>
            <th style={{ width: '15%' }}>Student Mark</th>
            <th style={{ width: '15%' }}>Student Grade</th>
          </tr>
        </thead>
        <tbody>
          {filteredPresentation.map((presentations, presentationIndex) => (
            <React.Fragment key={presentationIndex}>
              {presentations.students.map((student, studentIndex) => (
                <tr key={`${presentationIndex}-${studentIndex}`}>
                  <td>{studentIndex === 0 ? presentations.presentationTitle: null}</td>
                  <td>{studentIndex === 0 ? presentations.semester : null}</td>
                  <td>{studentIndex === 0 ? presentations.groupNumber : null}</td>
                  <td>{student.name}</td>
                  <td>{student.marks}</td>
                  <td>{student.grade}</td>
                </tr>
              ))}
            </React.Fragment>
          ))}
        </tbody>
      </Table>
    </div>
  );
}

export default PresentationsTable;
