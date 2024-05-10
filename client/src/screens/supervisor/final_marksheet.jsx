import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, Card, Container, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import jsPDF from 'jspdf';
import 'jspdf-autotable'; // Import the autoTable plugin

const Marksheet = () => {
    // State to hold marksheet data
    const [marksheet, setMarksheet] = useState([]);

    // Function to determine pass/fail status based on grade
    const determinePassFailStatus = (grade) => {
        // Define passing grade
        const passingGradeThreshold = 40; // Adjust as necessary

        // Compare the grade to the passing grade threshold
        return grade >= passingGradeThreshold ? 'Pass' : 'Fail';
    };

    // Fetch marksheet data from the backend API
    useEffect(() => {
        const fetchMarksheet = async () => {
            try {
                // Make the API request
                const response = await axios.get('http://localhost:3001/api/marking/marksheet');

                // Convert the API response data from an object to an array
                const marksheetArray = Object.entries(response.data).map(([registrationNo, studentData]) => ({
                    registrationNo,
                    ...studentData,
                }));

                // Set the marksheet state with the converted array
                setMarksheet(marksheetArray);
            } catch (error) {
                console.error('Error fetching marksheet:', error);
            }
        };

        fetchMarksheet();
    }, []);

    // Function to generate a PDF report
    const generatePDF = () => {
        // Create a new jsPDF instance
        const doc = new jsPDF();

        // Define the title for the PDF
        doc.text("Comprehensive Marksheet", 10, 10);

        // Define column headers
        const headers = ["Registration No", "Student Name", "Assessment", "Marks", "Total Marks", "Grade", "Pass/Fail"];

        // Prepare the data for the PDF table
        const data = marksheet.map((student) => {
            // Define an array to hold assessment names and marks
            const assessmentData = [];
            
            // Loop through each assessment and push the name and marks to the array
            Object.entries(student.totalMarks).forEach(([assessmentName, marks]) => {
                assessmentData.push(`${assessmentName}: ${marks}`);
            });

            return [
                student.registrationNo,
                student.name,
                assessmentData.join('\n'), // Join assessment data with new lines
                Object.values(student.totalMarks).join('\n'), // Join marks with new lines
                student.finalGrade.toFixed(2), // Round final grade to 2 decimal places
                student.letterGrade,
                determinePassFailStatus(student.finalGrade)
            ];
        });

        // Add the data as a table to the PDF
        doc.autoTable({ head: [headers], body: data });

        // Save the PDF file
        doc.save("marksheet_report.pdf");
    };

    return (
        <Container className="mt-4" style={{ padding: '40px' }}>
            <Card style={{ padding: '20px' }}>
                <Card.Body>
                    <Card.Title>Comprehensive Marksheet</Card.Title><br />
                    {marksheet.length === 0 ? (
                        <p>Loading...</p>
                    ) : (
                        <>
                            <Button variant="primary" onClick={generatePDF} className="mb-3">
                                Generate PDF Report
                            </Button>
                            <br></br>
                            <Table striped hover responsive>
                                <thead>
                                    <tr>
                                        <th>Registration No</th>
                                        <th>Student Name</th>
                                        <th>Assessment</th>
                                        <th>Marks</th>
                                        <th>Total Marks</th>
                                        <th>Grade</th>
                                        <th>Pass/Fail</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {marksheet.map((student) => (
                                        <tr key={student.registrationNo}>
                                            <td>{student.registrationNo}</td>
                                            <td>{student.name}</td>
                                            <td>
                                                {/* Render marks for each assessment */}
                                                {Object.entries(student.totalMarks).map(([assessmentName, marks]) => (
                                                    <div key={assessmentName}>
                                                        <p>{assessmentName}:</p>
                                                    </div>
                                                ))}
                                            </td>
                                            <td>
                                                {/* Render marks for each assessment */}
                                                {Object.entries(student.totalMarks).map(([assessmentName, marks]) => (
                                                    <div key={assessmentName}>
                                                        <p>{marks}</p>
                                                    </div>
                                                ))}
                                            </td>
                                            <td>{student.finalGrade.toFixed(2)}</td> {/* Round final grade to 2 decimal places */}
                                            <td>{student.letterGrade}</td>
                                            <td>{determinePassFailStatus(student.finalGrade)}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </Table>
                        </>
                    )}
                </Card.Body>
            </Card>
        </Container>
    );
};

export default Marksheet;
