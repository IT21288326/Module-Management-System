import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, Button } from 'react-bootstrap';

function MarkingTableNew() {
    const [markings, setMarkings] = useState([]);

    // Fetch all marking records from the server
    useEffect(() => {
        const fetchMarkings = async () => {
            try {
                const response = await axios.get('http://localhost:3001/api/marking/retrieve');
                setMarkings(response.data);
            } catch (error) {
                console.error('Error fetching marking data:', error);
            }
        };

        fetchMarkings();
    }, []);

    // Handle deletion of an entire marking record
    const handleDelete = async (markingId) => {
        try {
            // Send DELETE request to the server to delete the entire marking record
            const response = await axios.delete(`http://localhost:3001/api/marking/delete/${markingId}`);
            if (response.status === 200) {
                // Remove the deleted marking record from the local state
                setMarkings(markings.filter((marking) => marking._id !== markingId));
                alert('Marking record deleted successfully!');
            } else {
                alert('Error deleting marking record.');
            }
        } catch (error) {
            console.error('Error deleting marking record:', error);
            alert('Error deleting marking record.');
        }
    };

    return (
        <div>
            <h2>Marking Records</h2>
            <Table striped bordered hover responsive>
                <thead>
                    <tr>
                        <th>Group Registration No</th>
                        <th>Marking Type</th>
                        <th>Marking Area</th>
                        <th>Member Reg No</th>
                        <th>Member Name</th>
                        <th>Mark</th>
                        <th>Actions</th> {/* Add a header for the actions column */}
                    </tr>
                </thead>
                <tbody>
                    {markings.map((marking, markingIndex) =>
                        marking.markingAreas.map((area, areaIndex) =>
                            area.studentMarks.map((studentMark, studentIndex) => (
                                <tr key={`${markingIndex}-${areaIndex}-${studentIndex}`}>
                                    {/* Render the group registration number and marking type only for the first area */}
                                    {(areaIndex === 0 && studentIndex === 0) && (
                                        <>
                                            <td rowSpan={marking.markingAreas.length * area.studentMarks.length}>
                                                {marking.groupRegistrationNo}
                                            </td>
                                            <td rowSpan={marking.markingAreas.length * area.studentMarks.length}>
                                                {marking.markingType}
                                            </td>
                                        </>
                                    )}
                                    {/* Render marking area only for the first student mark in each area */}
                                    {studentIndex === 0 && (
                                        <td rowSpan={area.studentMarks.length}>
                                            {area.markingArea}
                                        </td>
                                    )}
                                    <td>{studentMark.memberRegNo}</td>
                                    <td>{studentMark.memberName}</td>
                                    <td>{studentMark.mark}</td>
                                    {/* Add a delete button only once per marking record */}
                                    {areaIndex === 0 && studentIndex === 0 && (
                                        <td rowSpan={marking.markingAreas.length * area.studentMarks.length}>
                                            <Button
                                                variant="danger"
                                                onClick={() => handleDelete(marking._id)}
                                            >
                                                Delete
                                            </Button>
                                        </td>
                                    )}
                                </tr>
                            ))
                        )
                    )}
                </tbody>
            </Table>
        </div>
    );
}

export default MarkingTableNew;
