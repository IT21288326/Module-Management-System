// import React, { useState, useEffect } from 'react';
// import axios from 'axios';

// function MarkingForm() {
//     const [rubricType, setRubricType] = useState('');
//     const [markingAreas, setMarkingAreas] = useState([]);
//     const [groupRegNo, setGroupRegNo] = useState('');
//     const [groupMembers, setGroupMembers] = useState({});
//     const [marks, setMarks] = useState({});
//     const [markingType, setMarkingType] = useState('');

//     // Fetch marking areas based on selected rubric type
//     useEffect(() => {
//         if (rubricType) {
//             fetch(`http://localhost:3001/api/marking-rubrics/${rubricType}`)
//                 .then(response => response.json())
//                 .then(data => setMarkingAreas(data));
//         }
//     }, [rubricType]);

//     // Fetch group members based on group registration number
//     useEffect(() => {
//         if (groupRegNo) {
//             fetch(`http://localhost:3001/api/group/${groupRegNo}`)
//                 .then(response => response.json())
//                 .then(data => setGroupMembers(data));
//         }
//     }, [groupRegNo]);

//     const handleMarksChange = (area, member, value) => {
//         setMarks({
//             ...marks,
//             [area]: {
//                 ...marks[area],
//                 [member]: value,
//             },
//         });
//     };

//     const handleSubmit = async (event) => {
//         event.preventDefault();

//         const markingData = {
//             groupRegistrationNo: groupRegNo,
//             markingType,
//             markingAreas: markingAreas.map(area => ({
//                 markingArea: area.markingArea,
//                 studentMarks: groupMembers.members.map((member, index) => ({
//                     memberRegNo: member.registrationNo,
//                     memberName: member.name,
//                     mark: parseFloat(marks[area.markingArea]?.[index] || 0),
//                 })),
//             })),
//         };
//         console.log('Current markingType:', markingType);

//         console.log('Marking data to be sent to the server:', markingData);
//         // Send marking data to backend
//         const response = await fetch('http://localhost:3001/api/marking/submit', {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json',
//             },
//             body: JSON.stringify(markingData),
//         });

//         if (response.ok) {
//             alert('Marking data saved successfully!');
//         } else {
//             const errorData = await response.json();
//     alert(`Error saving marking data: ${errorData.message}`);
//         }
//     };

//     return (
//         <div>
//             <h2>Marking Form</h2>

//             <div>
//                 <label>Marking Rubric Type:</label>
//                 <input
//                     type="text"
//                     value={rubricType}
//                     onChange={(e) => setRubricType(e.target.value)}
//                 />
//             </div>

//             {markingAreas.map((area, index) => (
//                 <div key={index}>
//                     <h3>{area.markingArea}</h3>
//                     {groupMembers.members && groupMembers.members.map((member, memberIndex) => (
//                         <div key={memberIndex}>
//                             <label>{member.name}:</label>
//                             <input
//                                 type="number"
//                                 min={0}
//                                 value={marks[area.markingArea]?.[memberIndex] || ''}
//                                 onChange={(e) => handleMarksChange(area.markingArea, memberIndex, e.target.value)}
//                             />
//                         </div>
//                     ))}
//                 </div>
//             ))}

//             <div>
//                 <label>Group Registration No:</label>
//                 <input
//                     type="text"
//                     value={groupRegNo}
//                     onChange={(e) => setGroupRegNo(e.target.value)}
//                 />
//             </div>

//             <button onClick={handleSubmit}>Submit Marks</button>
//         </div>
//     );
// }

// export default MarkingForm;


import React, { useState, useEffect } from 'react';
import axios from 'axios';

function MarkingForm() {
    const [markingType, setMarkingType] = useState('');
    const [markingAreas, setMarkingAreas] = useState([]);
    const [groupRegNo, setGroupRegNo] = useState('');
    const [groupMembers, setGroupMembers] = useState({});
    const [marks, setMarks] = useState({});

    // Fetch marking areas based on selected marking type
    useEffect(() => {
        if (markingType) {
            axios.get(`http://localhost:3001/api/marking-rubrics/${markingType}`)
                .then(response => setMarkingAreas(response.data))
                .catch(error => console.error('Error fetching marking areas:', error));
        }
    }, [markingType]);

    // Fetch group members based on group registration number
    useEffect(() => {
        if (groupRegNo) {
            axios.get(`http://localhost:3001/api/group/${groupRegNo}`)
                .then(response => setGroupMembers(response.data))
                .catch(error => console.error('Error fetching group members:', error));
        }
    }, [groupRegNo]);

    const handleMarksChange = (area, memberIndex, value) => {
        setMarks({
            ...marks,
            [area]: {
                ...marks[area],
                [memberIndex]: parseFloat(value),
            },
        });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        const markingData = {
            groupRegistrationNo: groupRegNo,
            markingType,
            markingAreas: markingAreas.map(area => ({
                markingArea: area.markingArea,
                studentMarks: groupMembers.members.map((member, index) => ({
                    memberRegNo: member.registrationNo,
                    memberName: member.name,
                    mark: marks[area.markingArea]?.[index] || 0,
                })),
            })),
        };

        try {
            const response = await axios.post('http://localhost:3001/api/marking/submit', markingData);

            if (response.status === 200) {
                alert('Marking data saved successfully!');
            } else {
                alert('Error saving marking data.');
            }
        } catch (error) {
            console.error('Error submitting marking data:', error);
            alert(`Error saving marking data: ${error.message}`);
        }
    };

    return (
        <div>
            <h2>Marking Form</h2>

            <div>
                <label>Marking Type:</label>
                <input
                    type="text"
                    value={markingType}
                    onChange={(e) => setMarkingType(e.target.value)}
                />
            </div>

            <div>
                <label>Group Registration No:</label>
                <input
                    type="text"
                    value={groupRegNo}
                    onChange={(e) => setGroupRegNo(e.target.value)}
                />
            </div>

            {markingAreas.map((area, index) => (
                <div key={index}>
                    <h3>{area.markingArea}</h3>
                    {groupMembers.members && groupMembers.members.map((member, memberIndex) => (
                        <div key={memberIndex}>
                            <label>{member.name}:</label>
                            <input
                                type="number"
                                min={0}
                                value={marks[area.markingArea]?.[memberIndex] || ''}
                                onChange={(e) => handleMarksChange(area.markingArea, memberIndex, e.target.value)}
                            />
                        </div>
                    ))}
                </div>
            ))}

            <button onClick={handleSubmit}>Submit Marks</button>
        </div>
    );
}

export default MarkingForm;
