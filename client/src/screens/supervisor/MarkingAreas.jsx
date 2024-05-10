// import React, { useState, useEffect } from 'react';
// import axios from 'axios';

// const MarkingAreas = ({ rubricType, groupDetails, onSaveMarking }) => {
//     const [markingAreas, setMarkingAreas] = useState([]);
//     const [studentMarks, setStudentMarks] = useState({});

//     useEffect(() => {
//         // Fetch the marking areas for the selected rubric type
//         const fetchMarkingAreas = async () => {
//             try {
//                 const response = await axios.get(`/marksheet/rubrics?type=${rubricType}`);
//                 setMarkingAreas(response.data);
//                 // Initialize student marks for each marking area
//                 const initialMarks = response.data.reduce((acc, area) => {
//                     acc[area.markingArea] = {};
//                     groupDetails.members.forEach((member) => {
//                         acc[area.markingArea][member.registrationNo] = 0;
//                     });
//                     return acc;
//                 }, {});
//                 setStudentMarks(initialMarks);
//             } catch (error) {
//                 console.error('Failed to fetch marking areas:', error);
//             }
//         };
//         fetchMarkingAreas();
//     }, [rubricType, groupDetails]);

//     const handleMarkChange = (markingArea, registrationNo, mark) => {
//         setStudentMarks((prev) => ({
//             ...prev,
//             [markingArea]: {
//                 ...prev[markingArea],
//                 [registrationNo]: Number(mark),
//             },
//         }));
//     };

//     const handleSave = () => {
//         // Prepare the marking data to be sent to the backend
//         const markingData = {
//             groupRegistrationNo: groupDetails.GroupRegistrationNo,
//             markingType: rubricType,
//             markingAreas: markingAreas.map((area) => ({
//                 markingArea: area.markingArea,
//                 studentMarks: Object.entries(studentMarks[area.markingArea]).map(
//                     ([registrationNo, mark]) => ({
//                         memberRegNo: registrationNo,
//                         mark,
//                     })
//                 ),
//             })),
//         };

//         // Call the save function passed as a prop
//         onSaveMarking(markingData);
//     };

//     return (
//         <div>
//             <h3>Marking Areas</h3>
//             {markingAreas.map((area) => (
//                 <div key={area.markingArea}>
//                     <h4>{area.markingArea}</h4>
//                     {groupDetails.members.map((member) => (
//                         <div key={member.registrationNo}>
//                             <label>{member.name}:</label>
//                             <input
//                                 type="number"
//                                 min={0}
//                                 max={area.marks}
//                                 value={studentMarks[area.markingArea][member.registrationNo]}
//                                 onChange={(e) => handleMarkChange(area.markingArea, member.registrationNo, e.target.value)}
//                             />
//                             / {area.marks}
//                         </div>
//                     ))}
//                 </div>
//             ))}
//             <button onClick={handleSave}>Save Marking</button>
//         </div>
//     );
// };

// export default MarkingAreas;
