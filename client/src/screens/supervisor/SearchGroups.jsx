import React, { useState } from 'react';
import { Table, Form } from 'react-bootstrap';

const TableWithStudents = () => {
  const [nameFilter, setNameFilter] = useState('');
  const [registrationFilter, setRegistrationFilter] = useState('');
  const [contactFilter, setContactFilter] = useState('');
  const [specializationFilter, setSpecializationFilter] = useState('');

  const studentsData = [
    {
      groupNumber: 'ID6477',
      projectTitle: 'An Interactive Programming Assistance tool (iPAT) for instructors and novice programmers',
      projectArea: 'Intelligent Systems, Machine Learning',
      students: [
        { name: 'John Doe', registrationNumber: '123456', contactNumber: '123-456-7890'},
        { name: 'Jane Smith', registrationNumber: '654321', contactNumber: '987-654-3210'},
        { name: 'Alice Johnson', registrationNumber: '987654', contactNumber: '456-789-0123' },
        { name: 'Bob Williams', registrationNumber: '456789', contactNumber: '789-012-3456'}
      ],
      specialization: 'Software Engineering'
    },
    {
      groupNumber: 'ID6478',
      projectTitle: 'Automated System for Agricultural Monitoring and Irrigation Control',
      projectArea: 'Internet of Things (IoT), Agriculture',
      students: [
        { name: 'Emily Brown', registrationNumber: '567890', contactNumber: '321-654-9870'},
        { name: 'Michael Johnson', registrationNumber: '098765', contactNumber: '654-321-7890'},
        { name: 'David Jones', registrationNumber: '345678', contactNumber: '987-654-3210'}
      ],
      specialization: 'Software Engineering'
    },
    {
      groupNumber: 'ID6479',
      projectTitle: 'E-Commerce Platform with Personalized Recommendation System',
      projectArea: 'Web Development, Data Analytics',
      students: [
        { name: 'Sarah Wilson', registrationNumber: '234567', contactNumber: '567-890-1234'},
        { name: 'Chris Evans', registrationNumber: '876543', contactNumber: '890-123-4567'},
        { name: 'Olivia Martinez', registrationNumber: '765432', contactNumber: '234-567-8901' },
        { name: 'William Thompson', registrationNumber: '543210', contactNumber: '678-901-2345'}
      ],
      specialization: 'Data Science'
    },
    {
      groupNumber: 'ID6480',
      projectTitle: 'Smart Home Automation System Using Artificial Intelligence',
      projectArea: 'Artificial Intelligence, Internet of Things (IoT)',
      students: [
        { name: 'Sophia Davis', registrationNumber: '321098', contactNumber: '901-234-5678' },
        { name: 'Matthew White', registrationNumber: '210987', contactNumber: '345-678-9012'},
        { name: 'Ella Lee', registrationNumber: '789012', contactNumber: '678-901-2345'},
        { name: 'James Harris', registrationNumber: '109876', contactNumber: '123-456-7890' }
      ],
      specialization: 'Data Science'
    }
  ];

  const filteredStudentsData = studentsData.filter(group =>
    group.students.some(student =>
      student.name.toLowerCase().includes(nameFilter.toLowerCase()) &&
      student.registrationNumber.includes(registrationFilter) &&
      student.contactNumber.includes(contactFilter) &&
      group.specialization.toLowerCase().includes(specializationFilter.toLowerCase())
    )
  );
  

  return (
    <div style={{ maxWidth: '80%', margin: '0 auto' }}>
      <h2>Supervising Project Details</h2>
      <Form id='savi_filterForm' style={{ marginTop:'5%',marginBottom:'5%'}}>
  <div className="row">
    <div className="col">
    <Form.Group controlId="nameFilter">
          <Form.Control
            type="text"
            placeholder="Filter by Name"
            value={nameFilter}
            onChange={(e) => setNameFilter(e.target.value)}
          />
        </Form.Group>
    </div>
    <div className="col">
    <Form.Group controlId="registrationFilter">
          <Form.Control
            type="text"
            placeholder="Filter by Registration Number"
            value={registrationFilter}
            onChange={(e) => setRegistrationFilter(e.target.value)}
          />
        </Form.Group>
    </div>
    <div className="col">
    <Form.Group controlId="contactFilter">
          <Form.Control
            type="text"
            placeholder="Filter by Contact Number"
            value={contactFilter}
            onChange={(e) => setContactFilter(e.target.value)}
          />
        </Form.Group>
    </div>
    <div className="col">
    <Form.Group controlId="specializationFilter">
          <Form.Control
            type="text"
            placeholder="Filter by Specialization"
            value={specializationFilter}
            onChange={(e) => setSpecializationFilter(e.target.value)}
          />
        </Form.Group>
    </div>
  </div>
</Form>
      <Table striped bordered hover style={{ width: '100%' }}>
        <thead>
          <tr>
            <th style={{ width: '8%' }}>Group Number</th>
            <th style={{ width: '15%' }}>Project title</th>
            <th style={{ width: '15%' }}>Project area</th>
            <th style={{ width: '10%' }}>Student Name</th>
            <th style={{ width: '10%' }}>Registration Number</th>
            <th style={{ width: '10%' }}>Contact number</th>
            <th style={{ width: '10%' }}>Specialization</th>
          </tr>
        </thead>
        <tbody>
          {filteredStudentsData.map(group => (
            group.students.map((student, index) => (
              <tr key={student.registrationNumber}>
                {index === 0 && (
                  <td rowSpan={group.students.length}>{group.groupNumber}</td>
                )}
                {index === 0 && (
                  <td rowSpan={group.students.length}>{group.projectTitle}</td>
                )}
                {index === 0 && (
                  <td rowSpan={group.students.length}>{group.projectArea}</td>
                )}
                <td>{student.name}</td>
                <td>{student.registrationNumber}</td>
                <td>{student.contactNumber}</td>
                {index === 0 && (
                  <td rowSpan={group.students.length}>{group.specialization}</td>
                )}
              </tr>
            ))
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default TableWithStudents;
