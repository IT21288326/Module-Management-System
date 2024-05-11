import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Modal, Button, Form, Card, ListGroup, Col, Row } from 'react-bootstrap';
import jsPDF from 'jspdf';

const UserManagement = () => {
    const [users, setUsers] = useState([]);
    const [roleFilter, setRoleFilter] = useState('');
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedUser, setSelectedUser] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [newStaffRoles, setNewStaffRoles] = useState([]);

    // Fetch users based on the specified role
    const fetchUsersByRole = async (role) => {
        try {
            const response = await axios.get('http://localhost:3001/api/users/all', {
                params: { role }
            });
            setUsers(response.data);
        } catch (error) {
            console.error('Error fetching users by role:', error);
        }
    };
    

    useEffect(() => {
        fetchUsersByRole(roleFilter);
    }, [roleFilter]);

    const handleUserClick = (user) => {
        setSelectedUser(user);
        setNewStaffRoles(user.staffRoles);
        setShowModal(true);
    };

    const filterUsers = () => {
        return users.filter(user => {
            return (
                user.Fullname.toLowerCase().includes(searchQuery.toLowerCase()) ||
                (roleFilter === 'student' && user.ALstream.toLowerCase().includes(searchQuery.toLowerCase())) ||
                (roleFilter === 'staffMember' && (
                    user.designation.toLowerCase().includes(searchQuery.toLowerCase()) ||
                    user.staffRoles.some(role => role.toLowerCase().includes(searchQuery.toLowerCase()))
                ))
            );
        });
    };

    const handleCloseModal = () => {
        setShowModal(false);
        setSelectedUser(null);
    };

    const handleDeleteUser = async () => {
        if (selectedUser) {
            try {
                await axios.delete(`http://localhost:3001/api/users/${selectedUser._id}`);
                setUsers(users.filter(user => user._id !== selectedUser._id));
                handleCloseModal();
            } catch (error) {
                console.error('Error deleting user:', error);
            }
        }
    };

    const handleStaffRolesChange = async () => {
        if (selectedUser && newStaffRoles !== selectedUser.staffRoles) {
            try {
                const response = await axios.put(`http://localhost:3001/api/users/${selectedUser._id}`, {
                    staffRoles: newStaffRoles
                });
                setUsers(users.map(user => user._id === selectedUser._id ? response.data : user));
                setSelectedUser(response.data);
            } catch (error) {
                console.error('Error updating staff roles:', error);
            }
        }
    };

    const handleRoleCheckboxChange = (role) => {
        setNewStaffRoles(prevRoles => {
            if (prevRoles.includes(role)) {
                return prevRoles.filter(r => r !== role);
            } else {
                return [...prevRoles, role];
            }
        });
    };

    // Function to generate and download the PDF report
    const generatePDFReport = () => {
        // Create a new instance of jsPDF
        const doc = new jsPDF();

        // Get the filtered list of users
        const filteredUsers = filterUsers();

        // Set the PDF title and headers
        doc.setFontSize(18);
        doc.text('Users Report', 14, 22);

        doc.setFontSize(12);
        doc.text('Name', 14, 32);
        doc.text('Email', 60, 32);
        doc.text('Role', 100, 32);

        // Initialize y position for rows
        let yPos = 42;

        // Populate the PDF with filtered user data
        filteredUsers.forEach((user, index) => {
            doc.text(user.Fullname, 14, yPos);
            doc.text(user.Email, 60, yPos);
  
            yPos += 10;
        });

        // Save the PDF
        doc.save('users_report.pdf');
    };

    return (
        <div className="user-management container mt-4">
            <h2>User Management</h2>

            {/* Role filter selection */}
            <div className="mb-3">
                <Form.Label htmlFor="roleFilter">Filter by role:</Form.Label>
                <Form.Control
                    as="select"
                    id="roleFilter"
                    value={roleFilter}
                    onChange={(e) => setRoleFilter(e.target.value)}
                >
          
                    <option value="student">Students</option>
                    <option value="staffMember">Staff Members</option>
                </Form.Control>
            </div>

            {/* Search input for filtering */}
            <div className="mb-3">
                <Form.Label htmlFor="searchQuery">Search:</Form.Label>
                <Form.Control
                    type="text"
                    id="searchQuery"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
            </div>

            {/* Export PDF button */}
            <Button variant="primary" onClick={generatePDFReport} className="mb-3">
                Export Users to PDF
            </Button>

            {/* List of users */}
            <Row>
                {filterUsers().map(user => (
                    <Col md={4} key={user._id} className="mb-3">
                        <Card onClick={() => handleUserClick(user)} style={{ cursor: 'pointer' }}>
                            <Card.Body>
                                <Card.Title>{user.Fullname}</Card.Title>
                                <Card.Text>
                                    {roleFilter === 'student' ? user.Email : user.Email}
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>

            {/* Modal to display selected user details */}
            <Modal show={showModal} onHide={handleCloseModal}>
                <Modal.Header closeButton>
                    <Modal.Title>{selectedUser?.Fullname}'s Details</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {selectedUser && (
                        <ListGroup>
                            <ListGroup.Item><strong>Full Name:</strong> {selectedUser.Fullname}</ListGroup.Item>
                            <ListGroup.Item><strong>Email:</strong> {selectedUser.Email}</ListGroup.Item>
                            <ListGroup.Item><strong>Role:</strong> {selectedUser.role}</ListGroup.Item>
                            <ListGroup.Item><strong>NIC:</strong> {selectedUser.Nic}</ListGroup.Item>
                            <ListGroup.Item><strong>Personal Email:</strong> {selectedUser.personalEmailAddress}</ListGroup.Item>
                            <ListGroup.Item><strong>Address Permanent:</strong> {selectedUser.AddressPer}</ListGroup.Item>
                            <ListGroup.Item><strong>Temporary Address:</strong> {selectedUser.Addresstemp}</ListGroup.Item>
                            <ListGroup.Item><strong>Contact No:</strong> {selectedUser.contactNo}</ListGroup.Item>
                            {selectedUser.role === 'student' && (
                                <>
                                    <ListGroup.Item><strong>AL Stream:</strong> {selectedUser.ALstream}</ListGroup.Item>
                                    <ListGroup.Item><strong>Guardian Name:</strong> {selectedUser.GuardianName}</ListGroup.Item>
                                    <ListGroup.Item><strong>Guardian Contact No:</strong> {selectedUser.GuardianContactNo}</ListGroup.Item>
                                </>
                            )}
                            {selectedUser.role === 'staffMember' && (
                                <>
                                    <ListGroup.Item><strong>Designation:</strong> {selectedUser.designation}</ListGroup.Item>
                                    <ListGroup.Item><strong>Staff Roles:</strong> {selectedUser.staffRoles.join(', ')}</ListGroup.Item>
                                    <ListGroup.Item>
                                        <Form.Label>Change Staff Roles:</Form.Label>
                                        <div>
                                            {[
                                                'projectCoordinator',
                                                'projectMember',
                                                'co-supervisor',
                                                'supervisor',
                                                'examiner'
                                            ].map(role => (
                                                <Form.Check
                                                    key={role}
                                                    type="checkbox"
                                                    label={role.replace(/([A-Z])/g, ' $1').trim()}
                                                    checked={newStaffRoles.includes(role)}
                                                    onChange={() => handleRoleCheckboxChange(role)}
                                                />
                                            ))}
                                        </div>
                                        <Button
                                            variant="success"
                                            onClick={handleStaffRolesChange}
                                            className="mt-2"
                                        >
                                            Change Staff Roles
                                        </Button>
                                    </ListGroup.Item>
                                </>
                            )}
                        </ListGroup>
                    )}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="danger" onClick={handleDeleteUser}>
                        Remove User
                    </Button>
                    <Button variant="secondary" onClick={handleCloseModal}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default UserManagement;
