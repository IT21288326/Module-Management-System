// import React, { useState, useEffect } from 'react';
// import { Table, Form, Button } from 'react-bootstrap';
// import axios from 'axios';
// import { FaEdit } from 'react-icons/fa';
// function MarksTable() {
//   const [reports, setReports] = useState([]);
//   const [presentations, setPresentations] = useState([]);
//   const [filterGroupId, setFilterGroupId] = useState('');
//   const [searchTerm, setSearchTerm] = useState('');

//   axios.defaults.baseURL = 'http://localhost:3001';

//   useEffect(() => {
//     fetchReports();
//     fetchPresentations();
//   }, []);

//   const fetchReports = async () => {
//     try {
//       const response = await axios.get('submitform/reports');
//       setReports(response.data);
//     } catch (error) {
//       console.error('Error fetching reports:', error);
//     }
//   };

//   const fetchPresentations = async () => {
//     try {
//       const response = await axios.get('submitPresentation/getPresentation');
//       setPresentations(response.data);
//     } catch (error) {
//       console.error('Error fetching presentations:', error);
//     }
//   };

//   const handleEdit = (groupId) => {
//     // Handle editing marks for the specified group ID
//     console.log('Edit marks for group ID:', groupId);
//   };

//   const filteredReports = reports.filter(report => {
//     return (
//       (report.groupNumber?.toLowerCase().includes(filterGroupId.toLowerCase()) || filterGroupId === '') &&
//       (report.students.some(student => student.name.toLowerCase().includes(searchTerm.toLowerCase())) || searchTerm === '')
//     );
//   });

//   const filteredPresentations = presentations.filter(presentation => {
//     return (
//       (presentation.groupNumber?.toLowerCase().includes(filterGroupId.toLowerCase()) || filterGroupId === '') &&
//       (presentation.students.some(student => student.name.toLowerCase().includes(searchTerm.toLowerCase())) || searchTerm === '')
//     );
//   });

//   const mergedMarks = [...filteredReports, ...filteredPresentations];

//   return (
//     <div style={{ maxWidth: '70%', margin: '0 auto' }}>
//       <h2>Submitted Marks For Reports and Presentations</h2>
//       <Form style={{ maxWidth: '40%', marginTop:'5%', marginBottom:'5%' }}>
//         <div className="row">
//           <div className="col">
//             <Form.Group controlId="formGroupId">
//               <Form.Label>Filter by Group ID</Form.Label>
//               <Form.Control
//                 type="text"
//                 value={filterGroupId}
//                 onChange={e => setFilterGroupId(e.target.value)}
//               />
//             </Form.Group>
//           </div>
//         </div>
//       </Form>

//       <Table striped bordered hover style={{ width: '100%' }}>
//         <thead>
//           <tr>
//             <th>Group Number</th>
//             <th>Title</th>
            
//             <th>Student Name</th>
//             <th>Student Mark</th>
//             <th>Student Grade</th>
//             <th>Action</th>
//           </tr>
//         </thead>
//         <tbody>
//           {mergedMarks.map((mark, index) => (
//             mark.students.map((student, studentIndex) => (
//               <tr key={`${index}-${studentIndex}`}>
//                 <td>{studentIndex === 0 ? mark.groupNumber : null}</td>
//                 <td>{studentIndex === 0 && mark.type === 'Report' ? mark.reportTitle : mark.presentationTitle}</td>
//                 <td>{student.name}</td>
//                 <td>{student.marks}</td>
//                 <td>{student.grade}</td>
//                 <td>
//                   <FaEdit variant="primary" onClick={() => handleEdit(mark.groupNumber)}/> 
//               </td>
//               </tr>
//             ))
//           ))}
//         </tbody>
//       </Table>
//     </div>
//   );
// }

// export default MarksTable;


import React, { useState, useEffect } from 'react';
import { Table, Form, Button } from 'react-bootstrap';
import axios from 'axios';
import { FaEdit } from 'react-icons/fa';

function MarksTable() {
  const [reports, setReports] = useState([]);
  const [presentations, setPresentations] = useState([]);
  const [filterGroupId, setFilterGroupId] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  axios.defaults.baseURL = 'http://localhost:3001';

  useEffect(() => {
    fetchReports();
    fetchPresentations();
  }, []);

  const fetchReports = async () => {
    try {
      const response = await axios.get('submitform/reports');
      setReports(response.data);
    } catch (error) {
      console.error('Error fetching reports:', error);
    }
  };

  const fetchPresentations = async () => {
    try {
      const response = await axios.get('submitPresentation/getPresentation');
      setPresentations(response.data);
    } catch (error) {
      console.error('Error fetching presentations:', error);
    }
  };

  const handleEdit = (groupId) => {
    // Handle editing marks for the specified group ID
    console.log('Edit marks for group ID:', groupId);
  };

    const filteredReports = reports.filter(report => {
    return (
      (report.groupNumber?.toLowerCase().includes(filterGroupId.toLowerCase()) || filterGroupId === '') &&
      (report.students.some(student => student.name.toLowerCase().includes(searchTerm.toLowerCase())) || searchTerm === '')
    );
  });

  const filteredPresentations = presentations.filter(presentation => {
    return (
      (presentation.groupNumber?.toLowerCase().includes(filterGroupId.toLowerCase()) || filterGroupId === '') &&
      (presentation.students.some(student => student.name.toLowerCase().includes(searchTerm.toLowerCase())) || searchTerm === '')
    );
  });

  const mergedMarks = [...filteredReports, ...filteredPresentations];


  return (
    <div style={{ maxWidth: '70%', margin: '0 auto' }}>
      <h2>Submitted Marks For Reports and Presentations</h2>
      <Form style={{ maxWidth: '40%', marginTop: '5%', marginBottom: '5%' }}>
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
        </div>
      </Form>

      <Table striped bordered hover style={{ width: '100%' }}>
        <thead>
          <tr>
            <th>Group Number</th>
            <th>Title</th>
            <th>Student Name</th>
            <th>Student Mark</th>
            <th>Student Grade</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {mergedMarks.map((mark, index) => (
            mark.students.map((student, studentIndex) => (
              <tr key={`${index}-${studentIndex}`}>
                
                <td>{studentIndex === 0 ? mark.groupNumber : null}</td>                <td>{studentIndex === 0 && mark.type === 'Report' ? mark.reportTitle : mark.presentationTitle}</td>
             
                <td>{student.name}</td>
                <td>{student.marks}</td>
                <td>{student.grade}</td>
                {studentIndex === 0 && ( // Render edit button only for the first student in the group
                  <td rowSpan={mark.students.length}>
                      <FaEdit variant="primary" onClick={() => handleEdit(mark.groupNumber)}/> 
                    
                  </td>
                )}
              </tr>
            ))
          ))}
        </tbody>
      </Table>
    </div>
  );
}

export default MarksTable;
