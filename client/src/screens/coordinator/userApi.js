import React, { useState, useEffect } from 'react';
import axios from 'axios';

const UserManagement = () => {
    // State variables to manage data and state
    const [users, setUsers] = useState([]);
    const [roleFilter, setRoleFilter] = useState('');
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedUser, setSelectedUser] = useState(null);

    // Function to fetch all users from the server
    const fetchUsers = async () => {
        try {
            // Fetch users with optional role filtering
            const response = await axios.get('/api/users', {
                params: { role: roleFilter }
            });

            // Set the fetched users to state
            setUsers(response.data);
        } catch (error) {
            console.error('Error fetching users:', error);
        }
    };

    // Fetch users when the component mounts and when the roleFilter changes
    useEffect(() => {
        fetchUsers();
    }, [roleFilter]);

    // Function to handle user selection
    const handleUserClick = (user) => {
        setSelectedUser(user);
    };

    // Function to filter users based on the search query
    const filterUsers = () => {
        // Filter the list of users based on the search query
        return users.filter((user) => {
            // Check the user's details based on their role
            if (roleFilter === 'student') {
                // Filter students by specialization and name
                return (
                    user.ALstream.toLowerCase().includes(searchQuery.toLowerCase()) ||
                    user.Fullname.toLowerCase().includes(searchQuery.toLowerCase())
                );
            } else if (roleFilter === 'staffMember') {
                // Filter staff members by designation and staff roles
                return (
                    user.designation.toLowerCase().includes(searchQuery.toLowerCase()) ||
                    user.staffRoles.some((role) => role.toLowerCase().includes(searchQuery.toLowerCase()))
                );
            }

            // If no role filter is applied, return all users
            return true;
        });
    };

    return (
        <div className="user-management">
            <h2>User Management</h2>

            {/* Role filter selection */}
            <div className="role-filter">
                <label htmlFor="roleFilter">Filter by role:</label>
                <select
                    id="roleFilter"
                    value={roleFilter}
                    onChange={(e) => setRoleFilter(e.target.value)}
                >
                    <option value="">All</option>
                    <option value="student">Students</option>
                    <option value="staffMember">Staff Members</option>
                </select>
            </div>

            {/* Search input for filtering */}
            <div className="search-input">
                <label htmlFor="searchQuery">Search:</label>
                <input
                    type="text"
                    id="searchQuery"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
            </div>

            {/* List of users */}
            <div className="user-list">
                {filterUsers().map((user) => (
                    <div
                        key={user._id}
                        className="user-item"
                        onClick={() => handleUserClick(user)}
                    >
                        {/* Display user details */}
                        <div>
                            <strong>{user.Fullname}</strong> - {user.role === 'student' ? user.ALstream : user.designation}
                        </div>
                    </div>
                ))}
            </div>

            {/* Display selected user details */}
            {selectedUser && (
                <div className="user-details">
                    <h3>{selectedUser.Fullname}'s Details</h3>
                    <p><strong>Email:</strong> {selectedUser.Email}</p>
                    <p><strong>Role:</strong> {selectedUser.role}</p>
                    {selectedUser.role === 'student' && (
                        <>
                            <p><strong>AL Stream:</strong> {selectedUser.ALstream}</p>
                            <p><strong>Guardian's Name:</strong> {selectedUser.GuardianName}</p>
                            <p><strong>Guardian's Contact:</strong> {selectedUser.GuardianContactNo}</p>
                        </>
                    )}
                    {selectedUser.role === 'staffMember' && (
                        <>
                            <p><strong>Designation:</strong> {selectedUser.designation}</p>
                            <p><strong>Staff Roles:</strong> {selectedUser.staffRoles.join(', ')}</p>
                        </>
                    )}
                </div>
            )}
        </div>
    );
};

export default UserManagement;
