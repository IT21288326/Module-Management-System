import React from 'react';
import { Navbar, Nav, NavDropdown } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

function Sidebar() {
  return (
    <div>
      <Navbar bg="dark" variant="dark" expand="lg">
        <Navbar.Brand href="#">Dashboard</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link href="#profile">My Profile</Nav.Link>
            <NavDropdown title="My Task" id="basic-nav-dropdown">
              <NavDropdown.Item href="#task1">Task 1</NavDropdown.Item>
              <NavDropdown.Item href="#task2">Task 2</NavDropdown.Item>
              <NavDropdown.Item href="#task3">Task 3</NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
      {/* Your main content goes here */}
    </div>
  );
}

export default Sidebar;
