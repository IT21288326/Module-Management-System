// import React, { useState } from 'react';
// import Swal from 'sweetalert2';
// import CancelIcon from '@mui/icons-material/Cancel';
// import './addReportMarkingRubrics.scss'; // Import custom CSS for styling

// const AddReportMarkingRubrics = ({ onClose, reloadMarkingRubrics }) => {
//   const [type, setType] = useState('');
//   const [markingRows, setMarkingRows] = useState([{ markingArea: '', marks: '' }]);
//   const [modalVisible, setModalVisible] = useState(true); // State to control modal visibility

//   const handleAddMarkingRow = () => {
//     setMarkingRows([...markingRows, { markingArea: '', marks: '' }]);
//   };

//   const handleMarkingChange = (index, key, value) => {
//     const updatedRows = [...markingRows];
//     updatedRows[index][key] = value;
//     setMarkingRows(updatedRows);
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       // Check if report type already exists
//       const typeExistsResponse = await fetch(`http://localhost:3001/markingRubrics/checkType/${type}`);
//       const typeExistsData = await typeExistsResponse.json();

//       if (typeExistsData.exists) {
//         // If type already exists, show error message
//         Swal.fire({
//           icon: 'error',
//           title: 'Error!',
//           text: typeExistsData.message || 'report type already exists.',
//         });
//         return;
//       }

//       // Proceed to submit the marking rubric if type does not exist
//       const response = await fetch('http://localhost:3001/markingRubrics', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({ type, marking: markingRows }),
//       });

//       if (response.ok) {
//         const responseData = await response.json();
//         Swal.fire({
//           icon: 'success',
//           title: 'Success!',
//           text: responseData.message || 'Marking Rubric created successfully.',
//         });
//         setType('');
//         setMarkingRows([{ markingArea: '', marks: '' }]);
//         reloadMarkingRubrics();
//         setModalVisible(false);
//         onClose();
//       } else {
//         const errorData = await response.json();
//         console.error('Failed to create Marking Rubric:', errorData.message);
//         Swal.fire({
//           icon: 'error',
//           title: 'Error!',
//           text: errorData.message || 'Failed to create Marking Rubric. Please try again.',
//         });
//       }
//     } catch (error) {
//       console.error('Error:', error);
//       Swal.fire({
//         icon: 'error',
//         title: 'Error!',
//         text: 'An unexpected error occurred. Please try again later.',
//       });
//     }
//   };

//   return (
//     <div className={`Russa_Marking_Rubrics ${modalVisible ? 'visible' : 'hidden'}`}>
//       <div className="Russa_modal-overlay">
//         <div className="Russa_modal-content">
//           <button className="Russa_close-modal-button" onClick={() => { setModalVisible(false); onClose(); }}>
//             <CancelIcon />
//           </button>
//           <h1 className="Russa_add_pr_shd_form-title">Report Marking Rubric</h1>
//           <form onSubmit={handleSubmit}>
//             <div className="user-input-box">
//               <label htmlFor="type">Report Type</label>
//               <select
//                 id="type"
//                 value={type}
//                 onChange={(e) => setType(e.target.value)}
//               >
//                 <option value="">Choose a report Type</option>
//                 <option value="Topic assessment form">Topic assessment form</option>
//                 <option value="Project charter">Project charter</option>
//                 <option value="Status document 1">Status document 1</option>
//                 <option value="Log book">Log book</option>
//                 <option value="Proposal document">Proposal document</option>
//                 <option value="Status document 2">Status document 2</option>
//                 <option value="Final Report">Final Report</option>
//                 {/* Add more report type options as needed */}
//               </select>
//             </div>
//             {markingRows.map((row, index) => (
//               <div key={index} className="marking-row">
//                 <div className="input-row">
//                   <label htmlFor={`markingArea-${index}`}>Marking Area</label>
//                   <input
//                     type="text"
//                     id={`markingArea-${index}`}
//                     placeholder="Marking Area"
//                     value={row.markingArea}
//                     onChange={(e) => handleMarkingChange(index, 'markingArea', e.target.value)}
//                   />
//                 </div>
//                 <div className="input-row">
//                   <label htmlFor={`marks-${index}`}>Allocated Marks(Out of 100)</label>
//                   <input
//                     type="number"
//                     id={`marks-${index}`}
//                     placeholder="Marks"
//                     value={row.marks}
//                     onChange={(e) => handleMarkingChange(index, 'marks', e.target.value)}
//                   />
//                 </div>
//               </div>
//             ))}
//             <button type="button" onClick={handleAddMarkingRow}>
//               Add More Markings
//             </button>
//             <div className="form-submit-btn">
//               <input type="submit" value="Save Record" />
//             </div>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AddReportMarkingRubrics;








// import React, { useState } from 'react';
// import Swal from 'sweetalert2';
// import CancelIcon from '@mui/icons-material/Cancel';
// import './addReportMarkingRubrics.scss'; // Import custom CSS for styling

// const AddReportMarkingRubrics = ({ onClose, reloadMarkingRubrics }) => {
//   const [type, setType] = useState('');
//   const [markingRows, setMarkingRows] = useState([{ markingArea: '', marks: '' }]);
//   const [modalVisible, setModalVisible] = useState(true); // State to control modal visibility

//   const handleAddMarkingRow = () => {
//     setMarkingRows([...markingRows, { markingArea: '', marks: '' }]);
//   };

//   const handleMarkingChange = (index, key, value) => {
//     const updatedRows = [...markingRows];
//     updatedRows[index][key] = value;
//     setMarkingRows(updatedRows);
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     // Calculate the total allocated marks for the current report type
//     const totalAllocatedMarks = markingRows.reduce((total, row) => {
//       return total + (row.marks ? parseInt(row.marks) : 0);
//     }, 0);

//     // Check if the total allocated marks for the current report type is exactly 100
//     if (totalAllocatedMarks !== 100) {
//       Swal.fire({
//         icon: 'error',
//         title: 'Error!',
//         text: 'The total of allocated marks must be equal to exactly 100.(Can not be less than or greater than 100)',
//       });
//       return;
//     }

//     try {
//       // Check if report type already exists
//       const typeExistsResponse = await fetch(`http://localhost:3001/markingRubrics/checkType/${type}`);
//       const typeExistsData = await typeExistsResponse.json();

//       if (typeExistsData.exists) {
//         // If type already exists, show error message
//         Swal.fire({
//           icon: 'error',
//           title: 'Error!',
//           text: typeExistsData.message || 'Report type already exists.',
//         });
//         return;
//       }

//       // Proceed to submit the marking rubric if type does not exist
//       const response = await fetch('http://localhost:3001/markingRubrics', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({ type, marking: markingRows }),
//       });

//       if (response.ok) {
//         const responseData = await response.json();
//         Swal.fire({
//           icon: 'success',
//           title: 'Success!',
//           text: responseData.message || 'Marking Rubric created successfully.',
//         });
//         setType('');
//         setMarkingRows([{ markingArea: '', marks: '' }]);
//         reloadMarkingRubrics();
//         setModalVisible(false);
//         onClose();
//       } else {
//         const errorData = await response.json();
//         console.error('Failed to create Marking Rubric:', errorData.message);
//         Swal.fire({
//           icon: 'error',
//           title: 'Error!',
//           text: errorData.message || 'Failed to create Marking Rubric. Please try again.',
//         });
//       }
//     } catch (error) {
//       console.error('Error:', error);
//       Swal.fire({
//         icon: 'error',
//         title: 'Error!',
//         text: 'An unexpected error occurred. Please try again later.',
//       });
//     }
//   };

//   return (
//     <div className={`Russa_Marking_Rubrics ${modalVisible ? 'visible' : 'hidden'}`}>
//       <div className="Russa_modal-overlay">
//         <div className="Russa_modal-content">
//           <button className="Russa_close-modal-button" onClick={() => { setModalVisible(false); onClose(); }}>
//             <CancelIcon />
//           </button>
//           <h1 className="Russa_add_pr_shd_form-title">Report Marking Rubric</h1>
//           <form onSubmit={handleSubmit}>
//             <div className="user-input-box">
//               <label htmlFor="type">Report Type</label>
//               <select
//                 id="type"
//                 value={type}
//                 onChange={(e) => setType(e.target.value)}
//                 required
//               >
//                 <option value="">Choose a Report Type</option>
//                 <option value="Topic Assessment Form Report">Topic Assessment Form Report</option>
//                 <option value="Project Charter Report">Project Charter Report</option>
//                 <option value="Status Document 1 Report">Status Document 1 Report</option>
//                 <option value="Log Book Report">Log Book Report</option>
//                 <option value="Proposal Document Report">Proposal Document Report</option>
//                 <option value="Status Document 2 Report">Status Document 2 Report</option>
//                 <option value="Final Report">Final Report</option>
//                 {/* Add more report type options as needed */}
//               </select>
//             </div>
//             {markingRows.map((row, index) => (
//               <div key={index} className="marking-row">
//                 <div className="input-row">
//                   <label htmlFor={`markingArea-${index}`}>Marking Area</label>
//                   <input
//                     type="text"
//                     id={`markingArea-${index}`}
//                     placeholder="Marking Area"
//                     value={row.markingArea}
//                     onChange={(e) => handleMarkingChange(index, 'markingArea', e.target.value)}
//                     required
//                   />
//                 </div>
//                 <div className="input-row">
//                   <label htmlFor={`marks-${index}`}>Allocated Marks (Out of 100)</label>
//                   <input
//                     type="number"
//                     id={`marks-${index}`}
//                     placeholder="Marks"
//                     value={row.marks}
//                     onChange={(e) => handleMarkingChange(index, 'marks', e.target.value)}
//                     required
//                   />
//                 </div>
//               </div>
//             ))}
//             <button type="button" onClick={handleAddMarkingRow}>
//               Add More Fields
//             </button>
//             <button type="button">
//               Remove Fields
//             </button>
//             <div className="form-submit-btn">
//               <input type="submit" value="Save Record" />
//             </div>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AddReportMarkingRubrics;





import React, { useState } from 'react';
import Swal from 'sweetalert2';
import CancelIcon from '@mui/icons-material/Cancel';
import './addReportMarkingRubrics.scss'; // Import custom CSS for styling

const AddReportMarkingRubrics = ({ onClose, reloadMarkingRubrics }) => {
  const [type, setType] = useState('');
  const [markingRows, setMarkingRows] = useState([{ markingArea: '', marks: '' }]);
  const [modalVisible, setModalVisible] = useState(true); // State to control modal visibility

  const handleAddMarkingRow = () => {
    setMarkingRows([...markingRows, { markingArea: '', marks: '' }]);
  };

  const handleRemoveMarkingRow = (index) => {
    // Prevent removing the first field
    if (index === 0) {
      return;
    }
    const updatedRows = [...markingRows];
    updatedRows.splice(index, 1);
    setMarkingRows(updatedRows);
  };

  const handleMarkingChange = (index, key, value) => {
    const updatedRows = [...markingRows];
    updatedRows[index][key] = value;
    setMarkingRows(updatedRows);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Calculate the total allocated marks for the current report type
    const totalAllocatedMarks = markingRows.reduce((total, row) => {
      return total + (row.marks ? parseInt(row.marks) : 0);
    }, 0);

    // Check if the total allocated marks for the current report type is exactly 100
    if (totalAllocatedMarks !== 100) {
      Swal.fire({
        icon: 'error',
        title: 'Error!',
        text: 'The total allocated marks must be exactly 100.',
      });
      return;
    }

    try {
      // Check if report type already exists
      const typeExistsResponse = await fetch(`http://localhost:3001/markingRubrics/checkType/${type}`);
      const typeExistsData = await typeExistsResponse.json();

      if (typeExistsData.exists) {
        // If type already exists, show error message
        Swal.fire({
          icon: 'error',
          title: 'Error!',
          text: typeExistsData.message || 'Report type already exists.',
        });
        return;
      }

      // Proceed to submit the marking rubric if type does not exist
      const response = await fetch('http://localhost:3001/markingRubrics', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ type, marking: markingRows }),
      });

      if (response.ok) {
        const responseData = await response.json();
        Swal.fire({
          icon: 'success',
          title: 'Success!',
          text: responseData.message || 'Marking Rubric created successfully.',
        });
        setType('');
        setMarkingRows([{ markingArea: '', marks: '' }]);
        reloadMarkingRubrics();
        setModalVisible(false);
        onClose();
      } else {
        const errorData = await response.json();
        console.error('Failed to create Marking Rubric:', errorData.message);
        Swal.fire({
          icon: 'error',
          title: 'Error!',
          text: errorData.message || 'Failed to create Marking Rubric. Please try again.',
        });
      }
    } catch (error) {
      console.error('Error:', error);
      Swal.fire({
        icon: 'error',
        title: 'Error!',
        text: 'An unexpected error occurred. Please try again later.',
      });
    }
  };

  return (
    <div className={`Russa_Marking_Rubrics ${modalVisible ? 'visible' : 'hidden'}`}>
      <div className="Russa_modal-overlay">
        <div className="Russa_modal-content">
          <button className="Russa_close-modal-button" onClick={() => { setModalVisible(false); onClose(); }}>
            <CancelIcon />
          </button>
          <h1 className="Russa_add_pr_shd_form-title">Report Marking Rubric</h1>
          <form onSubmit={handleSubmit}>
            <div className="user-input-box">
              <label htmlFor="type">Report Type</label>
              <select
                id="type"
                value={type}
                onChange={(e) => setType(e.target.value)}
                required
              >
                <option value="">Choose a Report Type</option>
                <option value="Topic Assessment Form Report">Topic Assessment Form Report</option>
                <option value="Project Charter Report">Project Charter Report</option>
                <option value="Status Document 1 Report">Status Document 1 Report</option>
                <option value="Log Book Report">Log Book Report</option>
                <option value="Proposal Document Report">Proposal Document Report</option>
                <option value="Status Document 2 Report">Status Document 2 Report</option>
                <option value="Final Report">Final Report</option>
                {/* Add more report type options as needed */}
              </select>
            </div>
            {markingRows.map((row, index) => (
              <div key={index} className="marking-row">
                <div className="input-row">
                  <label htmlFor={`markingArea-${index}`}>Marking Area</label>
                  <input
                    type="text"
                    id={`markingArea-${index}`}
                    placeholder="Marking Area"
                    value={row.markingArea}
                    onChange={(e) => handleMarkingChange(index, 'markingArea', e.target.value)}
                    required
                  />
                </div>
                <div className="input-row">
                  <label htmlFor={`marks-${index}`}>Allocated Marks (Out of 100)</label>
                  <input
                    type="number"
                    id={`marks-${index}`}
                    placeholder="Marks"
                    value={row.marks}
                    onChange={(e) => handleMarkingChange(index, 'marks', e.target.value)}
                    required
                  />
                </div>
              </div>
            ))}
            <button type="button" onClick={handleAddMarkingRow} className='Report_Add_Field_Button'>
              Add Fields
            </button>
            <button type="button" onClick={ handleRemoveMarkingRow} className='Report_Remove_Field_Button'>
              Remove Fields
            </button>
            <div className="form-submit-btn">
              <input type="submit" value="Save Record" />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddReportMarkingRubrics;
