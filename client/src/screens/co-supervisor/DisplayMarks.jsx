import React, { useState, useEffect } from 'react';
import { Table, Form } from 'react-bootstrap';
import axios from 'axios';
import { FaEdit } from 'react-icons/fa';
import { Link } from 'react-router-dom';
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
      (report.groupNumber?.toLowerCase().includes(filterGroupId.toLowerCase()) || filterGroupId === '') &&
      (report.reportTitle?.toLowerCase().includes(filterReportTitle.toLowerCase()) || filterReportTitle === '') &&
      (report.semester?.toLowerCase().includes(filterSemester.toLowerCase()) || filterSemester === '') &&
      (report.students.some(student => student.name.toLowerCase().includes(searchTerm.toLowerCase())) || searchTerm === '')
    );
  });
  
  
  
  

  return (
    <div style={{ maxWidth: '70%', margin: '0 auto' }}>
      <h2>Submitted Marks For Reports</h2>
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


      <Table striped bordered hover style={{ width: '100%' ,backgroundColor:'white',opacity:'0.8'}}>
        <thead>
          <tr>
            <th style={{ width: '15%' }}>Report Title</th>
            <th style={{ width: '15%' }}>Semester</th>
            <th style={{ width: '15%' }}>Group Number</th>
            <th style={{ width: '25%' }}>Student Name</th>
            <th style={{ width: '15%' }}>Student Mark provided by supervisor</th>
            <th style={{ width: '15%' }}>Student Mark provided by co-supervisor </th>
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
                  <td>
      {studentIndex === 0 ? (
        <Link to="/edit"> {/* Use Link to navigate to the edit page */}
          <FaEdit />
        </Link>
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

export default ReportsTable;







//Update logic eka gahala iwara unama kiynna meketh poddk hadenna ona update eka gahuwata passe
// aluth code eka meken yata tiyena tika


// import React, { useState, useEffect } from 'react';
// import { Table, Form } from 'react-bootstrap';
// import axios from 'axios';
// import { FaEdit } from 'react-icons/fa';
// // import { Link } from 'react-router-dom';
// import Edit from '../../screens/co-supervisor/edit';


// function ReportsTable() {
//   const [reports, setReports] = useState([]);
//   const [filterGroupId, setFilterGroupId] = useState('');
//   const [filterReportTitle, setFilterReportTitle] = useState('');
//   const [filterSemester, setFilterSemester] = useState('');
//   const [searchTerm, setSearchTerm] = useState('');
//   const [showAddPannelModal, setShowAddPannelModal] = useState(false);

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

//   const filteredReports = reports.filter(report => {
//     return (
//       (report.groupNumber?.toLowerCase().includes(filterGroupId.toLowerCase()) || filterGroupId === '') &&
//       (report.reportTitle?.toLowerCase().includes(filterReportTitle.toLowerCase()) || filterReportTitle === '') &&
//       (report.semester?.toLowerCase().includes(filterSemester.toLowerCase()) || filterSemester === '') &&
//       (report.students.some(student => student.name.toLowerCase().includes(searchTerm.toLowerCase())) || searchTerm === '')
//     );
//   });
  
  
  
  

//   return (
//     <div style={{ maxWidth: '70%', margin: '0 auto' }}>
//       <h2>Submitted Marks For Reports</h2>
//       <Form id='savi_filterForm' style={{ marginTop:'5%',marginBottom:'5%'}}>
//   <div className="row">
//     <div className="col">
//       <Form.Group controlId="formGroupId">
//         <Form.Label>Filter by Group ID</Form.Label>
//         <Form.Control
//           type="text"
//           value={filterGroupId}
//           onChange={e => setFilterGroupId(e.target.value)}
//         />
//       </Form.Group>
//     </div>
//     <div className="col">
//       <Form.Group controlId="formReportTitle">
//         <Form.Label>Filter by Report Title</Form.Label>
//         <Form.Control
//           type="text"
//           value={filterReportTitle}
//           onChange={e => setFilterReportTitle(e.target.value)}
//         />
//       </Form.Group>
//     </div>
//     <div className="col">
//       <Form.Group controlId="formSemester">
//         <Form.Label>Filter by Semester</Form.Label>
//         <Form.Control
//           type="text"
//           value={filterSemester}
//           onChange={e => setFilterSemester(e.target.value)}
//         />
//       </Form.Group>
//     </div>
//     <div className="col">
//       <Form.Group controlId="formSearch">
//         <Form.Label>Filter by Name</Form.Label>
//         <Form.Control
//           type="text"
//           value={searchTerm}
//           onChange={e => setSearchTerm(e.target.value)}
//         />
//       </Form.Group>
//     </div>
//   </div>
// </Form>


//       <Table striped bordered hover style={{ width: '100%' ,backgroundColor:'white',opacity:'0.8'}}>
//         <thead>
//           <tr>
//             <th style={{ width: '15%' }}>Report Title</th>
//             <th style={{ width: '15%' }}>Semester</th>
//             <th style={{ width: '15%' }}>Group Number</th>
//             <th style={{ width: '25%' }}>Student Name</th>
//             <th style={{ width: '15%' }}>Student Mark provided by supervisor</th>
//             <th style={{ width: '15%' }}>Student Mark provided by co-supervisor </th>
//           </tr>
//         </thead>
//         <tbody>
//           {filteredReports.map((report, reportIndex) => (
//             <React.Fragment key={reportIndex}>
//               {report.students.map((student, studentIndex) => (
//                 <tr key={`${reportIndex}-${studentIndex}`}>
//                   <td>{studentIndex === 0 ? report.reportTitle : null}</td>
//                   <td>{studentIndex === 0 ? report.semester : null}</td>
//                   <td>{studentIndex === 0 ? report.groupNumber : null}</td>
//                   <td>{student.name}</td>
//                   <td>{student.marks}</td>
//                   <td>
//       {studentIndex === 0 ? (
//         // <Link to="/edit"> {/* Use Link to navigate to the edit page */}
//         //   <FaEdit />
//         // </Link>

//       <button onClick={() => setShowAddPannelModal(true)} >
//         <FaEdit />
//       </button>

//       ) : null}
//     </td>

//                 </tr>
//               ))}
//             </React.Fragment>
//           ))}
//         </tbody>
//       </Table>
//       {showAddPannelModal && <Edit onClose={() => setShowAddPannelModal(false)} />}
//     </div>
//   );
// }

// export default ReportsTable;
