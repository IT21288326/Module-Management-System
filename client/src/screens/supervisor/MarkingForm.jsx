import React, { useState, useEffect } from 'react';
import axios from 'axios';
import swal from 'sweetalert';
import 'bootstrap/dist/css/bootstrap.min.css';

function MarkingForm() {
    const [markingType, setMarkingType] = useState('');
    const [markingTypes, setMarkingTypes] = useState([]);
    const [markingAreas, setMarkingAreas] = useState([]);
    const [groupRegNo, setGroupRegNo] = useState('');
    const [groupRegNos, setGroupRegNos] = useState([]);
    const [groupMembers, setGroupMembers] = useState({});
    const [marks, setMarks] = useState({});
    const [errorMessages, setErrorMessages] = useState({});
    const [previousSubmissions, setPreviousSubmissions] = useState([]);

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
                })
                .catch(error => console.error('Error fetching marking areas:', error));
        } else {
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

    // Load previous submissions from local storage
    useEffect(() => {
        const storedSubmissions = localStorage.getItem('previousSubmissions');
        if (storedSubmissions) {
            setPreviousSubmissions(JSON.parse(storedSubmissions));
        }
    }, []);

    // Handle changes in marks for marking areas and group members
    const handleMarksChange = (area, memberIndex, value) => {
        const markValue = parseFloat(value);
        const maxMark = markingAreas.find((a) => a.markingArea === area)?.marks;

        // Validate the mark value
        if (markValue > maxMark) {
            setErrorMessages((prevErrors) => ({
                ...prevErrors,
                [area]: `Mark cannot exceed the maximum allowed (${maxMark}).`,
            }));
        } else {
            setErrorMessages((prevErrors) => ({
                ...prevErrors,
                [area]: '', // Clear error message if mark is valid
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

    // Handle form submission
    const handleSubmit = async (event) => {
        event.preventDefault();

        // Create marking data based on current inputs
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

        // Check for duplicate submissions
        const isDuplicate = previousSubmissions.some(
            (submission) =>
                submission.groupRegistrationNo === groupRegNo &&
                submission.markingType === markingType
        );

        if (isDuplicate) {
            // Duplicate submission found
            swal({
                title: 'Duplicate Submission',
                text: 'The same group and marking type combination has already been submitted.',
                icon: 'error',
                button: 'OK',
            });
            return;
        }

        try {
            const response = await axios.post('http://localhost:3001/api/marking/submit', markingData);

            if (response.status === 200) {
                // Successful submission
                swal({
                    title: 'Success',
                    text: 'Marking data saved successfully!',
                    icon: 'success',
                    button: 'OK',
                });

                // Add current submission to previous submissions
                const newSubmission = {
                    groupRegistrationNo: groupRegNo,
                    markingType,
                };
                const updatedSubmissions = [...previousSubmissions, newSubmission];
                setPreviousSubmissions(updatedSubmissions);

                // Save the updated submissions list to local storage
                localStorage.setItem('previousSubmissions', JSON.stringify(updatedSubmissions));
            } else {
                swal({
                    title: 'Error',
                    text: 'Failed to save marking data.',
                    icon: 'error',
                    button: 'OK',
                });
            }
        } catch (error) {
            console.error('Error submitting marking data:', error);
            swal({
                title: 'Error',
                text: `Error saving marking data: ${error.message}`,
                icon: 'error',
                button: 'OK',
            });
        }
    };

    return (
        <div style={{padding:'5%',marginLeft:'200px'}}>
            <div class="card" style={{width:'90%',height:'100%',padding:'20px'}} >
                <div class="card-body">
                    
            <h2 className="mb-4">Marking Form</h2>

{/* Dropdown for selecting marking type */}
<div className="form-group mb-3">
    <label>Marking Type:</label>
    <select
        className="form-control"
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
<div className="form-group mb-3">
    <label>Group Registration No:</label>
    <select
        className="form-control"
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
    <div key={index} className="mb-4">
        <h5>{area.markingArea} (Max: {area.marks})</h5>
        <p>Maximum Mark: {area.marks}</p>
        {groupMembers.members && groupMembers.members.map((member, memberIndex) => (
            <div key={memberIndex} className="form-group mb-3">
                <label>{member.name}:</label>
                <input
                    type="number"
                    className="form-control"
                    min={0}
                    max={area.marks}
                    value={marks[area.markingArea]?.[memberIndex] || ''}
                    onChange={(e) => handleMarksChange(area.markingArea, memberIndex, e.target.value)}
                />
            </div>
        ))}
        {/* Display error message for each marking area */}
        {errorMessages[area.markingArea] && (
            <div className="text-danger">{errorMessages[area.markingArea]}</div>
        )}
    </div>
))}

{/* Submit button */}
<button onClick={handleSubmit} className="btn btn-primary">
    Submit Marks
</button>
                </div>
            </div>
        </div>
    );
}

export default MarkingForm;
