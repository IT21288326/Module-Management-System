// import React, { useState, useEffect } from 'react';
// import axios from 'axios';

// function MarkingForm() {
//     const [markingType, setMarkingType] = useState('');
//     const [markingTypes, setMarkingTypes] = useState([]);
//     const [markingAreas, setMarkingAreas] = useState([]);
//     const [groupRegNo, setGroupRegNo] = useState('');
//     const [groupRegNos, setGroupRegNos] = useState([]);
//     const [groupMembers, setGroupMembers] = useState({});
//     const [marks, setMarks] = useState({});

//     // Fetch all group registration numbers
//     useEffect(() => {
//         axios.get('http://localhost:3001/api/marking/groups')
//             .then(response => setGroupRegNos(response.data))
//             .catch(error => console.error('Error fetching groups:', error));
//     }, []);

//     // Fetch all marking types
//     useEffect(() => {
//         axios.get('http://localhost:3001/api/marking/marking-types')
//             .then(response => setMarkingTypes(response.data))
//             .catch(error => console.error('Error fetching marking types:', error));
//     }, []);

//     // Fetch marking areas based on selected marking type
//     useEffect(() => {
//         if (markingType) {
//             axios.get(`http://localhost:3001/api/marking-rubrics/${markingType}`)
//                 .then(response => setMarkingAreas(response.data))
//                 .catch(error => console.error('Error fetching marking areas:', error));
//         }
//     }, [markingType]);

//     // Fetch group members based on group registration number
//     useEffect(() => {
//         if (groupRegNo) {
//             axios.get(`http://localhost:3001/api/group/${groupRegNo}`)
//                 .then(response => setGroupMembers(response.data))
//                 .catch(error => console.error('Error fetching group members:', error));
//         }
//     }, [groupRegNo]);

//     const handleMarksChange = (area, memberIndex, value) => {
//         setMarks({
//             ...marks,
//             [area]: {
//                 ...marks[area],
//                 [memberIndex]: parseFloat(value),
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
//                     mark: marks[area.markingArea]?.[index] || 0,
//                 })),
//             })),
//         };

//         try {
//             const response = await axios.post('http://localhost:3001/api/marking/submit', markingData);

//             if (response.status === 200) {
//                 alert('Marking data saved successfully!');
//             } else {
//                 alert('Error saving marking data.');
//             }
//         } catch (error) {
//             console.error('Error submitting marking data:', error);
//             alert(`Error saving marking data: ${error.message}`);
//         }
//     };

//     return (
//         <div>
//             <h2>Marking Form</h2>

//             {/* Dropdown for selecting marking type */}
//             <div>
//                 <label>Marking Type:</label>
//                 <select
//                     value={markingType}
//                     onChange={(e) => setMarkingType(e.target.value)}
//                 >
//                     <option value="">Select a marking type</option>
//                     {markingTypes.map((type, index) => (
//                         <option key={index} value={type.type}>
//                             {type.type}
//                         </option>
//                     ))}
//                 </select>
//             </div>

//             {/* Dropdown for selecting group registration number */}
//             <div>
//                 <label>Group Registration No:</label>
//                 <select
//                     value={groupRegNo}
//                     onChange={(e) => setGroupRegNo(e.target.value)}
//                 >
//                     <option value="">Select a group registration number</option>
//                     {groupRegNos.map((group, index) => (
//                         <option key={index} value={group.GroupRegistrationNo}>
//                             {group.GroupRegistrationNo}
//                         </option>
//                     ))}
//                 </select>
//             </div>

//             {/* Displaying marking areas */}
//             {markingAreas.map((area, index) => (
//                 <div key={index}>
//                     <h3>{area.markingArea}</h3>
//                     <p>Maximum Mark: {area.marks}</p>
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

//             <button onClick={handleSubmit}>Submit Marks</button>
//         </div>
//     );
// }

// export default MarkingForm;



// import React, { useState, useEffect } from 'react';
// import axios from 'axios';

// function MarkingForm() {
//     // State variables
//     const [markingType, setMarkingType] = useState('');
//     const [markingTypes, setMarkingTypes] = useState([]);
//     const [markingAreas, setMarkingAreas] = useState([]);
//     const [groupRegNo, setGroupRegNo] = useState('');
//     const [groupRegNos, setGroupRegNos] = useState([]);
//     const [groupMembers, setGroupMembers] = useState({});
//     const [marks, setMarks] = useState({});
//     const [errorMessages, setErrorMessages] = useState({});

//     // Define base URL for API requests
//     const baseURL = 'http://localhost:3001/api';

//     // Fetch all group registration numbers
//     useEffect(() => {
//         axios.get(`${baseURL}/marking/groups`)
//             .then(response => {
//                 setGroupRegNos(response.data || []);
//             })
//             .catch(error => console.error('Error fetching groups:', error));
//     }, []);

//     // Fetch all marking types
//     useEffect(() => {
//         axios.get(`${baseURL}/marking/marking-types`)
//             .then(response => {
//                 setMarkingTypes(response.data || []);
//             })
//             .catch(error => console.error('Error fetching marking types:', error));
//     }, []);

//     // Fetch marking areas based on selected marking type
//     useEffect(() => {
//         if (markingType) {
//             axios.get(`${baseURL}/marking-rubrics/${markingType}`)
//                 .then(response => {
//                     const areas = response.data?.marking || [];
//                     setMarkingAreas(areas);
                    
//                     // Initialize marks and error messages states based on the marking areas
//                     setMarks(
//                         areas.reduce((acc, area) => {
//                             acc[area.markingArea] = {};
//                             return acc;
//                         }, {})
//                     );
//                     setErrorMessages(
//                         areas.reduce((acc, area) => {
//                             acc[area.markingArea] = '';
//                             return acc;
//                         }, {})
//                     );
//                 })
//                 .catch(error => console.error('Error fetching marking areas:', error));
        // } else {
        //     setMarkingAreas([]);
        //     setMarks({});
        //     setErrorMessages({});
        // }
//     }, [markingType]);

//     // Fetch group members based on group registration number
//     useEffect(() => {
//         if (groupRegNo) {
//             axios.get(`${baseURL}/group/${groupRegNo}`)
//                 .then(response => {
//                     setGroupMembers(response.data || {});
//                 })
//                 .catch(error => console.error('Error fetching group members:', error));
//         } else {
//             setGroupMembers({});
//         }
//     }, [groupRegNo]);

//     // Handle changes in marks
    // const handleMarksChange = (area, memberIndex, value) => {
    //     const markValue = parseFloat(value);
    //     const maxMark = markingAreas.find((a) => a.markingArea === area)?.marks;

    //     // Validate the mark value
    //     if (markValue > maxMark) {
    //         setErrorMessages((prevErrors) => ({
    //             ...prevErrors,
    //             [area]: `Mark cannot exceed the maximum allowed (${maxMark}).`
    //         }));
    //     } else {
    //         setErrorMessages((prevErrors) => ({
    //             ...prevErrors,
    //             [area]: '' // Clear error message if mark is valid
    //         }));
    //         // Update marks state
    //         setMarks((prevMarks) => ({
    //             ...prevMarks,
    //             [area]: {
    //                 ...prevMarks[area],
    //                 [memberIndex]: markValue,
    //             },
    //         }));
    //     }
    // };

//     // Handle form submission
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
//                     mark: marks[area.markingArea]?.[index] || 0,
//                 })),
//             })),
//         };

//         try {
//             const response = await axios.post(`${baseURL}/marking/submit`, markingData);

//             if (response.status === 200) {
//                 alert('Marking data saved successfully!');
//             } else {
//                 alert('Error saving marking data.');
//             }
//         } catch (error) {
//             console.error('Error submitting marking data:', error);
//             alert(`Error saving marking data: ${error.message}`);
//         }
//     };

//     return (
//         <div>
//             <h2>Marking Form</h2>

//             {/* Dropdown for selecting marking type */}
//             <div>
//                 <label>Marking Type:</label>
//                 <select
//                     value={markingType}
//                     onChange={(e) => setMarkingType(e.target.value)}
//                 >
//                     <option value="">Select a marking type</option>
//                     {markingTypes.map((type, index) => (
//                         <option key={index} value={type.type}>
//                             {type.type}
//                         </option>
//                     ))}
//                 </select>
//             </div>

//             {/* Dropdown for selecting group registration number */}
//             <div>
//                 <label>Group Registration No:</label>
//                 <select
//                     value={groupRegNo}
//                     onChange={(e) => setGroupRegNo(e.target.value)}
//                 >
//                     <option value="">Select a group registration number</option>
//                     {groupRegNos.map((group, index) => (
//                         <option key={index} value={group.GroupRegistrationNo}>
//                             {group.GroupRegistrationNo}
//                         </option>
//                     ))}
//                 </select>
//             </div>

//             {/* Displaying marking areas */}
//             {markingAreas.map((area, index) => (
//                 <div key={index}>
//                     <h3>{area.markingArea} (Max: {area.marks})</h3>
//                     {groupMembers.members && groupMembers.members.map((member, memberIndex) => (
//                         <div key={memberIndex}>
//                             <label>{member.name}:</label>
//                             <input
//                                 type="number"
//                                 min={0}
//                                 max={area.marks} // Add max attribute for HTML5 input
//                                 value={marks[area.markingArea]?.[memberIndex] || ''}
//                                 onChange={(e) => handleMarksChange(area.markingArea, memberIndex, e.target.value)}
//                             />
//                         </div>
//                     ))}
//                     {/* Display error message for each marking area */}
//                     {errorMessages[area.markingArea] && (
//                         <div style={{ color: 'red' }}>{errorMessages[area.markingArea]}</div>
//                     )}
//                 </div>
//             ))}

//             <button onClick={handleSubmit}>Submit Marks</button>
//         </div>
//     );
// }

// export default MarkingForm;


import React, { useState, useEffect } from 'react';
import axios from 'axios';

function MarkingForm() {
    const [markingType, setMarkingType] = useState('');
    const [markingTypes, setMarkingTypes] = useState([]);
    const [markingAreas, setMarkingAreas] = useState([]);
    const [groupRegNo, setGroupRegNo] = useState('');
    const [groupRegNos, setGroupRegNos] = useState([]);
    const [groupMembers, setGroupMembers] = useState({});
    const [marks, setMarks] = useState({});
    const [errorMessages, setErrorMessages] = useState({});

    // Fetch all group registration numbers
    useEffect(() => {
        axios.get('http://localhost:3001/api/marking/groups')
            .then(response => setGroupRegNos(response.data))
            .catch(error => console.error('Error fetching groups:', error));
    }, []);

    // Fetch all marking types
    useEffect(() => {
        axios.get('http://localhost:3001/api/marking/marking-types')
            .then(response => setMarkingTypes(response.data))
            .catch(error => console.error('Error fetching marking types:', error));
    }, []);

    // Fetch marking areas based on selected marking type
    useEffect(() => {
        if (markingType) {
            axios.get(`http://localhost:3001/api/marking-rubrics/${markingType}`)
                .then(response => {
                    const areas = response.data;
                    setMarkingAreas(areas);
                    setMarks(
                                                areas.reduce((acc, area) => {
                                                    acc[area.markingArea] = {};
                                                    return acc;
                                                }, {})
                                            );
                                            setErrorMessages(
                                                areas.reduce((acc, area) => {
                                                    acc[area.markingArea] = '';
                                                    return acc;
                                                }, {})
                                            );
                }
            )
                .catch(error => console.error('Error fetching marking areas:', error));
        }else {
            setMarkingAreas([]);
            setMarks({});
            setErrorMessages({});
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
        const markValue = parseFloat(value);
        const maxMark = markingAreas.find((a) => a.markingArea === area)?.marks;

        // Validate the mark value
        if (markValue > maxMark) {
            setErrorMessages((prevErrors) => ({
                ...prevErrors,
                [area]: `Mark cannot exceed the maximum allowed (${maxMark}).`
            }));
        } else {
            setErrorMessages((prevErrors) => ({
                ...prevErrors,
                [area]: '' // Clear error message if mark is valid
            }));
            // Update marks state
            setMarks((prevMarks) => ({
                ...prevMarks,
                [area]: {
                    ...prevMarks[area],
                    [memberIndex]: markValue,
                },
            }));
        }
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

            {/* Dropdown for selecting marking type */}
            <div>
                <label>Marking Type:</label>
                <select
                    value={markingType}
                    onChange={(e) => setMarkingType(e.target.value)}
                >
                    <option value="">Select a marking type</option>
                    {markingTypes.map((type, index) => (
                        <option key={index} value={type.type}>
                            {type.type}
                        </option>
                    ))}
                </select>
            </div>

            {/* Dropdown for selecting group registration number */}
            <div>
                <label>Group Registration No:</label>
                <select
                    value={groupRegNo}
                    onChange={(e) => setGroupRegNo(e.target.value)}
                >
                    <option value="">Select a group registration number</option>
                    {groupRegNos.map((group, index) => (
                        <option key={index} value={group.GroupRegistrationNo}>
                            {group.GroupRegistrationNo}
                        </option>
                    ))}
                </select>
            </div>

            {/* Displaying marking areas */}
            {markingAreas.map((area, index) => (
                <div key={index}>
                    <h3>{area.markingArea} (Max: {area.marks})</h3>
                    <p>Maximum Mark: {area.marks}</p>
                    {groupMembers.members && groupMembers.members.map((member, memberIndex) => (
                        <div key={memberIndex}>
                            <label>{member.name}:</label>
                            <input
                                type="number"
                                min={0}
                                max={area.marks}
                                value={marks[area.markingArea]?.[memberIndex] || ''}
                                onChange={(e) => handleMarksChange(area.markingArea, memberIndex, e.target.value)}
                            />
                        </div>
                    ))}
                {/* Display error message for each marking area */}
                    {errorMessages[area.markingArea] && (
                        <div style={{ color: 'red' }}>{errorMessages[area.markingArea]}</div>
                    )}
                </div>
            ))}

            <button onClick={handleSubmit}>Submit Marks</button>
        </div>
    );
}

export default MarkingForm;

