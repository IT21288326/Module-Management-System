// // import React, { useState, useEffect } from 'react';
// // import { Table, Form } from 'react-bootstrap';
// // import axios from 'axios';

// // function DisplayMarks() {
// //   const [reports, setReports] = useState([]);
// //   const [filterGroupId, setFilterGroupId] = useState('');
// //   const [filterReportTitle, setFilterReportTitle] = useState('');
// //   const [filterSemester, setFilterSemester] = useState('');
// //   const [searchTerm, setSearchTerm] = useState('');

// //   axios.defaults.baseURL = 'http://localhost:3001';

// //   useEffect(() => {
// //     fetchReports();
// //   }, []);

// //   const fetchReports = async () => {
// //     try {
// //       const response = await axios.get('submitform/reports');
// //       setReports(response.data);
// //     } catch (error) {
// //       console.error('Error fetching reports:', error);
// //     }
// //   };

// //   const filteredReports = reports.filter(report => {
// //     return (
// //       (report.groupNumber?.toLowerCase().includes(filterGroupId.toLowerCase()) || filterGroupId === '') &&
// //       (report.reportTitle?.toLowerCase().includes(filterReportTitle.toLowerCase()) || filterReportTitle === '') &&
// //       (report.semester?.toLowerCase().includes(filterSemester.toLowerCase()) || filterSemester === '') &&
// //       (report.students.some(student => student.name.toLowerCase().includes(searchTerm.toLowerCase())) || searchTerm === '')
// //     );
// //   });
  
  
  
  

// //   return (
// //     <div style={{ maxWidth: '70%', margin: '0 auto' }}>
// //       <h2>Submitted Marks For Reports</h2>
// //       <Form id='savi_filterForm' style={{ marginTop:'5%',marginBottom:'5%'}}>
// //   <div className="row">
// //     <div className="col">
// //       <Form.Group controlId="formGroupId">
// //         <Form.Label>Filter by Group ID</Form.Label>
// //         <Form.Control
// //           type="text"
// //           value={filterGroupId}
// //           onChange={e => setFilterGroupId(e.target.value)}
// //         />
// //       </Form.Group>
// //     </div>
// //     <div className="col">
// //       <Form.Group controlId="formReportTitle">
// //         <Form.Label>Filter by Report Title</Form.Label>
// //         <Form.Control
// //           type="text"
// //           value={filterReportTitle}
// //           onChange={e => setFilterReportTitle(e.target.value)}
// //         />
// //       </Form.Group>
// //     </div>
// //     <div className="col">
// //       <Form.Group controlId="formSemester">
// //         <Form.Label>Filter by Semester</Form.Label>
// //         <Form.Control
// //           type="text"
// //           value={filterSemester}
// //           onChange={e => setFilterSemester(e.target.value)}
// //         />
// //       </Form.Group>
// //     </div>
// //     <div className="col">
// //       <Form.Group controlId="formSearch">
// //         <Form.Label>Filter by Name</Form.Label>
// //         <Form.Control
// //           type="text"
// //           value={searchTerm}
// //           onChange={e => setSearchTerm(e.target.value)}
// //         />
// //       </Form.Group>
// //     </div>
// //   </div>
// // </Form>


// //       <Table striped bordered hover style={{ width: '100%' }}>
// //         <thead>
// //           <tr>
// //             <th style={{ width: '15%' }}>Report Title</th>
// //             <th style={{ width: '15%' }}>Semester</th>
// //             <th style={{ width: '15%' }}>Group Number</th>
// //             <th style={{ width: '25%' }}>Student Name</th>
// //             <th style={{ width: '15%' }}>Student Mark</th>
// //             <th style={{ width: '15%' }}>Student Mark by Co-supervisor</th>
// //           </tr>
// //         </thead>
// //         <tbody>
// //           {filteredReports.map((report, reportIndex) => (
// //             <React.Fragment key={reportIndex}>
// //               {report.students.map((student, studentIndex) => (
// //                 <tr key={`${reportIndex}-${studentIndex}`}>
// //                   <td>{studentIndex === 0 ? report.reportTitle : null}</td>
// //                   <td>{studentIndex === 0 ? report.semester : null}</td>
// //                   <td>{studentIndex === 0 ? report.groupNumber : null}</td>
// //                   <td>{student.name}</td>
// //                   <td>{student.marks}</td>
// //                   <td></td>
// //                 </tr>
// //               ))}
// //             </React.Fragment>
// //           ))}
// //         </tbody>
// //       </Table>
// //     </div>
// //   );
// // }

// // export default DisplayMarks;


// import React, { useState, useEffect } from 'react';
// import { Table, Button } from 'react-bootstrap';
// import axios from 'axios';

// function DisplayMarks() {
//   const [reports, setReports] = useState([]);
//   const [editData, setEditData] = useState(null);
//   const [coSupervisorMarks, setCoSupervisorMarks] = useState('');

//   axios.defaults.baseURL = 'http://localhost:3001';

//   useEffect(() => {
//     fetchReports();
//   }, []);

//   const fetchReports = async () => {
//     try {
//       const response = await axios.get('submitform/reports');
//       setReports(response.data);
//     } catch (error) {
//       console.error('Error fetching reports:', error);
//     }
//   };

//   const handleEdit = (reportIndex, studentIndex) => {
//     setEditData({ reportIndex, studentIndex });
//   };

//   const handleSaveMarks = async () => {
//     try {
//       const { reportIndex, studentIndex } = editData;
//       const updatedStudent = { ...reports[reportIndex].students[studentIndex], coSupervisorMarks };
//       const updatedStudents = [...reports[reportIndex].students];
//       updatedStudents[studentIndex] = updatedStudent;
//       const updatedReport = { ...reports[reportIndex], students: updatedStudents };
//       const updatedReports = [...reports];
//       updatedReports[reportIndex] = updatedReport;
//       setReports(updatedReports);
//       setEditData(null);
//       // Send updated data to server using Axios POST or PUT request
//       console.log('Updated marks:', updatedReport);
//       alert('Marks updated successfully');
//     } catch (error) {
//       console.error('Error saving marks:', error);
//       alert('Error updating marks');
//     }
//   };

//   return (
//     <div style={{ maxWidth: '70%', margin: '0 auto' }}>
//       <Table striped bordered hover style={{ width: '100%' }}>
//         <thead>
//           <tr>
//             <th style={{ width: '15%' }}>Report Title</th>
//             <th style={{ width: '15%' }}>Semester</th>
//             <th style={{ width: '15%' }}>Group Number</th>
//             <th style={{ width: '25%' }}>Student Name</th>
//             <th style={{ width: '15%' }}>Student Mark</th>
//             <th style={{ width: '15%' }}>Co-supervisor Mark</th>
//           </tr>
//         </thead>
//         <tbody>
//           {reports.map((report, reportIndex) => (
//             <React.Fragment key={reportIndex}>
//               {report.students.map((student, studentIndex) => (
//                 <tr key={`${reportIndex}-${studentIndex}`}>
//                   <td>{studentIndex === 0 ? report.reportTitle : null}</td>
//                   <td>{studentIndex === 0 ? report.semester : null}</td>
//                   <td>{studentIndex === 0 ? report.groupNumber : null}</td>
//                   <td>{student.name}</td>
//                   <td>{student.marks}</td>
//                   <td>
//                     {studentIndex === 0 && !student.coSupervisorMarks ? (
//                       <Button variant="primary" onClick={() => handleEdit(reportIndex, studentIndex)}>
//                         Edit
//                       </Button>
//                     ) : (
//                       student.coSupervisorMarks
//                     )}
//                   </td>
//                 </tr>
//               ))}
//             </React.Fragment>
//           ))}
//         </tbody>
//       </Table>
//       {editData && (
//         <div>
//           <input
//             type="number"
//             placeholder="Enter co-supervisor marks"
//             value={coSupervisorMarks}
//             onChange={(e) => setCoSupervisorMarks(e.target.value)}
//           />
//           <Button onClick={handleSaveMarks}>Save</Button>
//         </div>
//       )}
//     </div>
//   );
// }

// export default DisplayMarks;

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
