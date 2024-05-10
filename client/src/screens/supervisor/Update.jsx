import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, Button, Modal, Form, Card, Row, Col } from 'react-bootstrap';
import jsPDF from 'jspdf';
import 'jspdf-autotable'; // Import the autoTable plugin
import * as XLSX from 'xlsx';

function Update() {
    const [markings, setMarkings] = useState([]);
    const [selectedMarking, setSelectedMarking] = useState(null);
    const [showUpdateModal, setShowUpdateModal] = useState(false);
    const [groupSearch, setGroupSearch] = useState('');
    const [typeSearch, setTypeSearch] = useState('');
    const [memberSearch, setMemberSearch] = useState('');

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

    // Filter markings based on search terms
    const filteredMarkings = markings.filter((marking) => {
        // Check if the group registration number matches the search term
        const groupMatches = marking.groupRegistrationNo.toLowerCase().includes(groupSearch.toLowerCase());
        
        // Check if the marking type matches the search term
        const typeMatches = marking.markingType.toLowerCase().includes(typeSearch.toLowerCase());
        
        // Check if any member registration number matches the search term
        const memberMatches = marking.markingAreas.some((area) =>
            area.studentMarks.some((studentMark) =>
                studentMark.memberRegNo.toLowerCase().includes(memberSearch.toLowerCase())
            )
        );

        // Return true if all search terms match their respective fields
        return groupMatches && typeMatches && memberMatches;
    });

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

    // Function to generate a PDF report
    const generatePDF = () => {
        // Create a new jsPDF instance
        const doc = new jsPDF();

        // Add a title to the PDF
        doc.text("Marking Records", 10, 10);

        // Define column headers
        const headers = ["Group Registration No", "Marking Type", "Marking Area", "Member Reg No", "Member Name", "Mark", "Co-Supervisor Mark"];
        
        // Define data to be included in the PDF
        let data = [];
        filteredMarkings.forEach((marking) => {
            marking.markingAreas.forEach((area) => {
                area.studentMarks.forEach((studentMark) => {
                    data.push([
                        marking.groupRegistrationNo,
                        marking.markingType,
                        area.markingArea,
                        studentMark.memberRegNo,
                        studentMark.memberName,
                        studentMark.mark,
                        studentMark.coSupervisorMark || '-'
                    ]);
                });
            });
        });

        // Add data as a table to the PDF
        doc.autoTable({ head: [headers], body: data });

        // Save the PDF
        doc.save("marking_records.pdf");
    };

    // Function to generate an Excel report
    const generateExcel = () => {
        // Define data to be included in the Excel file
        const excelData = [];

        // Add headers
        excelData.push([
            "Group Registration No",
            "Marking Type",
            "Marking Area",
            "Member Reg No",
            "Member Name",
            "Mark",
            "Co-Supervisor Mark"
        ]);

        // Add data
        filteredMarkings.forEach((marking) => {
            marking.markingAreas.forEach((area) => {
                area.studentMarks.forEach((studentMark) => {
                    excelData.push([
                        marking.groupRegistrationNo,
                        marking.markingType,
                        area.markingArea,
                        studentMark.memberRegNo,
                        studentMark.memberName,
                        studentMark.mark,
                        studentMark.coSupervisorMark || '-'
                    ]);
                });
            });
        });

        // Create a workbook and worksheet
        const worksheet = XLSX.utils.aoa_to_sheet(excelData);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Marking Records");

        // Save the workbook as an Excel file
        XLSX.writeFile(workbook, "marking_records.xlsx");
    };

    return (
        <div className="container mt-5">
            <div className="card">
                <div className="card-body">
                    <h4 className="card-title mb-4">Marking Records</h4>

                    {/* Single row with three search input boxes */}
                    <Form className="mb-3">
                        <Row>
                            <Col>
                                <Form.Control
                                    type="text"
                                    placeholder="Search by Group Registration No"
                                    value={groupSearch}
                                    onChange={(e) => setGroupSearch(e.target.value)}
                                />
                            </Col>
                            <Col>
                                <Form.Control
                                    type="text"
                                    placeholder="Search by Marking Type"
                                    value={typeSearch}
                                    onChange={(e) => setTypeSearch(e.target.value)}
                                />
                            </Col>
                            <Col>
                                <Form.Control
                                    type="text"
                                    placeholder="Search by Member Reg No"
                                    value={memberSearch}
                                    onChange={(e) => setMemberSearch(e.target.value)}
                                />
                            </Col>
                        </Row>
                    </Form>

                    {/* Buttons to generate PDF and Excel reports */}
                    <Button variant="primary" className="mb-3 mx-1" onClick={generatePDF}>
                        Generate PDF Report
                    </Button>
                    <Button variant="primary" className="mb-3 mx-1" onClick={generateExcel}>
                        Generate Excel Report
                    </Button>

                    <Table hover responsive>
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
                            {filteredMarkings.map((marking, markingIndex) =>
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
                    <Modal show={showUpdateModal} onHide={() => setShowUpdateModal(false)} >
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
            </div>
        </div>
    );
}

export default Update;
