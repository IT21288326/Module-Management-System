import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, Button, Form, Row, Col } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import jsPDF from 'jspdf';
import 'jspdf-autotable'; // Import the autoTable plugin
import * as XLSX from 'xlsx';

function MarkingTableNew() {
    const [markings, setMarkings] = useState([]);
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

    // Function to generate a PDF report
    const generatePDF = () => {
        // Create a new jsPDF instance
        const doc = new jsPDF();

        // Add a title to the PDF
        doc.text("Marking Records", 10, 10);

        // Define column headers
        const headers = ["Group Registration No", "Marking Type", "Marking Area", "Member Reg No", "Member Name", "Mark"];
        
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
                        studentMark.mark
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
            "Mark"
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
                        studentMark.mark
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
                    <br></br>
                    <h3 className="card-title mb-4 text-center">Marking Records</h3>
                    <br></br>
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
                    <br></br><br></br>

                    <Table hover responsive>
                        <thead>
                            <tr>
                                <th>Group Registration No</th>
                                <th>Marking Type</th>
                                <th>Marking Area</th>
                                <th>Member Reg No</th>
                                <th>Member Name</th>
                                <th>Mark</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredMarkings.map((marking, markingIndex) =>
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
                                                        className="m-1"
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
            </div>
        </div>
    );
}

export default MarkingTableNew;
