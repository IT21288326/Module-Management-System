import React, { useState } from 'react';
import PresentationsTable from '../screens/examiner/DisplayPMarks';
import PrsentationMarks from '../screens/examiner/prsentationMarks';
import SupervisorDashboard from './Dashboard/SupervisorDashboard';

export default function SidebarSup() {
  const [activeLink, setActiveLink] = useState("Dashboard"); // State to keep track of active link

  const handleLinkClick = (linkName) => {
    setActiveLink(linkName); // Update the active link when clicked
  };

  return (
    <div>
      <div className="wrapper d-flex align-items-stretch">
        <nav id="sidebar">
          <div className="p-4 pt-5">
            <a href="#" className="img logo rounded-circle mb-5" style={{backgroundImage: 'url(images/logo.jpg)'}} />
            <ul className="list-unstyled components mb-5">
              <li className={activeLink === "Dashboard" ? "active" : ""}>
                <a href="#" onClick={() => handleLinkClick("Dashboard")}>Dashboard</a>
              </li>
              <li className={activeLink === "Marks" ? "active" : ""}>
                <a href="#homeSubmenu" data-toggle="collapse" aria-expanded="false" className="dropdown-toggle">Marks</a>
                <ul className="collapse list-unstyled" id="homeSubmenu">
                  <li>
                    <a href="#" onClick={() => handleLinkClick("Enter Marks")}>Enter Marks for Reports</a>
                  </li>
                  <li>
                    <a href="#" onClick={() => handleLinkClick("View Marks")}>View Marks</a>
                  </li>
                </ul>
              </li>
            </ul>
          </div>
        </nav>

        {/* Page Content  */}
        <div id="content" className="p-4 p-md-5">
          {activeLink === "Enter Marks" && <PrsentationMarks />}
          {activeLink === "View Marks" && <PresentationsTable />}
          {activeLink === "Dashboard" && <SupervisorDashboard />}
        </div>
      </div>
    </div>
  );
}
