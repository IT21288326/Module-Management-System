import React, { useState } from 'react';
import SupervisorDashboard from './Dashboard/SupervisorDashboard';
import DisplayMarks from '../screens/co-supervisor/DisplayMarks';
import Update from '../screens/supervisor/Update'
export default function SidebarCoSup() {
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
                <a href="#" onClick={() => handleLinkClick("Marks")}>Display Marks</a>
              </li>
            </ul>
          </div>
        </nav>

        {/* Page Content  */}
        <div id="content" className="p-4 p-md-5">
          {activeLink === "Marks" && <Update />}
          {activeLink === "Dashboard" && <SupervisorDashboard />}
        </div>
      </div>
    </div>
  );
}
