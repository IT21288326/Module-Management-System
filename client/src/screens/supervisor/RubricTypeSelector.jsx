// import React, { useState, useEffect } from 'react';
// import axios from 'axios';

// const RubricTypeSelector = ({ onRubricTypeChange }) => {
//     const [rubricTypes, setRubricTypes] = useState([]);
//     axios.defaults.baseURL = 'http://localhost:3001';

//     useEffect(() => {
//         // Fetch available rubric types from the back-end
//         const fetchRubricTypes = async () => {
//             try {
//                 const response = await axios.get('/marksheet/rubrics');
//                 setRubricTypes(response.data);
//             } catch (error) {
//                 console.error('Failed to fetch rubric types:', error);
//             }
//         };
//         fetchRubricTypes();
//     }, []);

//     return (
//         <div>
//             <label>Rubric Type:</label>
//             <select onChange={(e) => onRubricTypeChange(e.target.value)}>
//                 <option value="">--Select a Rubric Type--</option>
//                 {rubricTypes.map((type) => (
//                     <option key={type} value={type}>
//                         {type}
//                     </option>
//                 ))}
//             </select>
//         </div>
//     );
// };

// export default RubricTypeSelector;
