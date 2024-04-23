// import React, { useState } from 'react';
// import Swal from 'sweetalert2';
// import CancelIcon from '@mui/icons-material/Cancel';
// import './addMarkingRubrics.scss'; // Import custom CSS for styling

// const AddMarkingRubrics = ({onClose}) => {
//   const [type, setType] = useState('');
//   const [markingRows, setMarkingRows] = useState([{ markingArea: '', marks: '' }]);

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
//     <div className="Russa_Marking_Rubrics">
//       <div className="Russa_modal-overlay">
//         <div className="Russa_modal-content">
//           <button className="Russa_close-modal-button" onClick={onClose}>
//             <CancelIcon />
//           </button>
//           <h1 className="Russa_add_pr_shd_form-title">Add New Marking Rubric</h1>
//           <form onSubmit={handleSubmit} >
//             <div className="user-input-box">
//               <label htmlFor="type">Presentation Type</label>
//               <select
//                 id="type"
//                 value={type}
//                 onChange={(e) => setType(e.target.value)}
//               >
//                 <option value="">Choose a Presentation Type</option>
//                 <option value="Proposal">Proposal Presentation</option>
//                 <option value="Progress 1">Progress 1 Presentation</option>
//                 <option value="Progress 2">Progress 2 Presentation</option>
//                 <option value="Final">Final Presentation</option>
//                 {/* Add more presentation type options as needed */}
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
//                   <label htmlFor={`marks-${index}`}>Marks</label>
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

// export default AddMarkingRubrics;







// import React, { useState } from 'react';
// import Swal from 'sweetalert2';
// import CancelIcon from '@mui/icons-material/Cancel';
// import './addMarkingRubrics.scss'; // Import custom CSS for styling

// const AddMarkingRubrics = ({ onClose, reloadMarkingRubrics }) => {
//   const [type, setType] = useState('');
//   const [markingRows, setMarkingRows] = useState([{ markingArea: '', marks: '' }]);

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
//         reloadMarkingRubrics(); // Reload marking rubrics after successful submission
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
//     <div className="Russa_Marking_Rubrics">
//       <div className="Russa_modal-overlay">
//         <div className="Russa_modal-content">
//           <button className="Russa_close-modal-button" onClick={onClose}>
//             <CancelIcon />
//           </button>
//           <h1 className="Russa_add_pr_shd_form-title">Add New Marking Rubric</h1>
//           <form onSubmit={handleSubmit}>
//             <div className="user-input-box">
//               <label htmlFor="type">Presentation Type</label>
//               <select
//                 id="type"
//                 value={type}
//                 onChange={(e) => setType(e.target.value)}
//               >
//                 <option value="">Choose a Presentation Type</option>
//                 <option value="Proposal">Proposal Presentation</option>
//                 <option value="Progress 1">Progress 1 Presentation</option>
//                 <option value="Progress 2">Progress 2 Presentation</option>
//                 <option value="Final">Final Presentation</option>
//                 {/* Add more presentation type options as needed */}
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
//                   <label htmlFor={`marks-${index}`}>Marks</label>
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

// export default AddMarkingRubrics;






// import React, { useState } from 'react';
// import Swal from 'sweetalert2';
// import CancelIcon from '@mui/icons-material/Cancel';
// import './addMarkingRubrics.scss'; // Import custom CSS for styling

// const AddMarkingRubrics = ({ onClose, reloadMarkingRubrics }) => {
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
//         reloadMarkingRubrics(); // Reload marking rubrics after successful submission
//         setModalVisible(false); // Close the modal after successful submission
//         onClose(); // Close modal via prop function (if needed)
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
//           <h1 className="Russa_add_pr_shd_form-title">Presentation Marking Rubric</h1>
//           <form onSubmit={handleSubmit}>
//             <div className="user-input-box">
//               <label htmlFor="type">Presentation Type</label>
//               <select
//                 id="type"
//                 value={type}
//                 onChange={(e) => setType(e.target.value)}
//               >
//                 <option value="">Choose a Presentation Type</option>
//                 <option value="Proposal">Proposal Presentation</option>
//                 <option value="Progress 1">Progress 1 Presentation</option>
//                 <option value="Progress 2">Progress 2 Presentation</option>
//                 <option value="Final">Final Presentation</option>
//                 {/* Add more presentation type options as needed */}
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

// export default AddMarkingRubrics;



///most corrected one

import React, { useState } from 'react';
import Swal from 'sweetalert2';
import CancelIcon from '@mui/icons-material/Cancel';
import './addPresentationMarkingRubrics.scss'; // Import custom CSS for styling

const AddMarkingRubrics = ({ onClose, reloadMarkingRubrics }) => {
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
    try {
      // Check if presentation type already exists
      const typeExistsResponse = await fetch(`http://localhost:3001/markingRubrics/checkType/${type}`);
      const typeExistsData = await typeExistsResponse.json();

      if (typeExistsData.exists) {
        // If type already exists, show error message
        Swal.fire({
          icon: 'error',
          title: 'Error!',
          text: typeExistsData.message || 'Presentation type already exists.',
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
          <h1 className="Russa_add_pr_shd_form-title">Presentation Marking Rubric</h1>
          <form onSubmit={handleSubmit}>
            <div className="user-input-box">
              <label htmlFor="type">Presentation Type</label>
              <select
                id="type"
                value={type}
                onChange={(e) => setType(e.target.value)}
              >
                <option value="">Choose a Presentation Type</option>
                <option value="Proposal Presentation">Proposal Presentation</option>
                <option value="Progress 1 Presentation">Progress 1 Presentation</option>
                <option value="Progress 2 Presentation">Progress 2 Presentation</option>
                <option value="Final Presentation">Final Presentation</option>
                {/* Add more presentation type options as needed */}
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
                  />
                </div>
                <div className="input-row">
                  <label htmlFor={`marks-${index}`}>Allocated Marks(Out of 100)</label>
                  <input
                    type="number"
                    id={`marks-${index}`}
                    placeholder="Marks"
                    value={row.marks}
                    onChange={(e) => handleMarkingChange(index, 'marks', e.target.value)}
                  />
                </div>
              </div>
            ))}
            <button type="button" onClick={handleAddMarkingRow} className='Presentation_Add_Field_Button'>
              Add Fields
            </button>
            <button type="button" onClick={ handleRemoveMarkingRow} className='Presentation_Remove_Field_Button'>
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

export default AddMarkingRubrics;





