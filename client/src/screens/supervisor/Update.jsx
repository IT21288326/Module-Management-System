import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, Button, Modal, Form, Card } from 'react-bootstrap';

function Update() {
    const [markings, setMarkings] = useState([]);
    const [selectedMarking, setSelectedMarking] = useState(null);
    const [showUpdateModal, setShowUpdateModal] = useState(false);

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

    // Handle opening the update modal
    const handleUpdateClick = (marking) => {
        setSelectedMarking(marking);
        setShowUpdateModal(true);
    };

    // Handle updating the co-supervisor mark
    const handleUpdateSubmit = async () => {
        try {
            const response = await axios.put(`http://localhost:3001/api/marking/update/${selectedMarking._id}`, selectedMarking);

            if (response.data) {
                alert('Marking data updated successfully!');
                setShowUpdateModal(false);
                setSelectedMarking(null);
                // Refresh the markings data
                const updatedMarkings = await axios.get('http://localhost:3001/api/marking/retrieve');
                setMarkings(updatedMarkings.data);
            } else {
                alert('Error updating marking data.');
            }
        } catch (error) {
            console.error('Error updating marking data:', error);
            alert('Error updating marking data.');
        }
    };

    // Handle changes in the update form
    const handleChange = (areaIndex, studentIndex, value) => {
        const updatedMarking = { ...selectedMarking };
        updatedMarking.markingAreas[areaIndex].studentMarks[studentIndex].coSupervisorMark = value;
        setSelectedMarking(updatedMarking);
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
                        <th>Co-Supervisor Mark</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {markings.map((marking, markingIndex) =>
                        marking.markingAreas.map((area, areaIndex) =>
                            area.studentMarks.map((studentMark, studentIndex) => {
                                // Determine if the update button should be shown
                                const showUpdateButton = studentIndex === 0 && areaIndex === 0;

                                return (
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
                                        <td>{studentMark.coSupervisorMark || '-'}</td>
                                        {/* Render the "Update" button only once per marking object */}
                                        {showUpdateButton && (
                                            <td>
                                                <Button
                                                    variant="primary"
                                                    onClick={() => handleUpdateClick(marking)}
                                                >
                                                    Update
                                                </Button>
                                            </td>
                                        )}
                                    </tr>
                                );
                            })
                        )
                    )}
                </tbody>
            </Table>

            {/* Update Modal */}
            <Modal show={showUpdateModal} onHide={() => setShowUpdateModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Update Marking</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {selectedMarking &&
                        selectedMarking.markingAreas.map((area, areaIndex) => (
                            <Card key={areaIndex} className="mb-3">
                                <Card.Header as="h5">{area.markingArea}</Card.Header>
                                <Card.Body>
                                    {area.studentMarks.map((studentMark, studentIndex) => (
                                        <div key={studentIndex}>
                                            <p>
                                                <strong>Member Name:</strong> {studentMark.memberName} ({studentMark.memberRegNo})
                                            </p>
                                            <p>
                                                <strong>Mark:</strong> {studentMark.mark}
                                            </p>
                                            <Form.Group>
                                                <Form.Label>Co-Supervisor Mark:</Form.Label>
                                                <Form.Control
                                                    type="number"
                                                    value={studentMark.coSupervisorMark || ''}
                                                    onChange={(e) => handleChange(areaIndex, studentIndex, e.target.value)}
                                                    min={0}
                                                    max={100}
                                                    step={0.1}
                                                    placeholder="Enter co-supervisor mark"
                                                />
                                            </Form.Group>
                                        </div>
                                    ))}
                                </Card.Body>
                            </Card>
                        ))}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowUpdateModal(false)}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleUpdateSubmit}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}

export default Update;
