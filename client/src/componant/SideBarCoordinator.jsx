import React, { useState, useEffect } from 'react';
import ReportMarks from '../screens/supervisor/ReportMarks';
import ReportsTable from '../screens/supervisor/DisplayRMarks';
import TableWithStudents from '../screens/supervisor/SearchGroups';
import DashboardCoordinator from './Dashboard/DashboardCoordinator';

export default function SideBarCoordinator() {
  const [showReportMarks, setShowReportMarks] = useState(false);
  const [showProjectDetails, setShowProjectDetails] = useState(false); // State for controlling project details visibility
  const [showDashboard, setShowDashboard] = useState(true); // State for controlling dashboard visibility

  const handleAboutClick = () => {
    setShowReportMarks(true);
    setShowProjectDetails(false); // Ensure only one component is shown at a time
    setShowDashboard(false); // Hide dashboard when other links are clicked
  };

  const handleOtherClick = () => {
    setShowReportMarks(false);
    setShowProjectDetails(false); // Ensure only one component is shown at a time
    setShowDashboard(false); // Hide dashboard when other links are clicked
  };

  const handleProjectDetailsClick = () => {
    setShowProjectDetails(!showProjectDetails); // Toggle the visibility state
    setShowReportMarks(false); // Ensure only one component is shown at a time
    setShowDashboard(false); // Hide dashboard when other links are clicked
  };

  const handleDashboardClick = () => {
    setShowDashboard(true); // Always show dashboard when clicked
    setShowReportMarks(false); // Ensure only one component is shown at a time
    setShowProjectDetails(false); // Ensure only one component is shown at a time
  };

  return (
    <div>
      <div className="wrapper d-flex align-items-stretch">
        <nav id="sidebar">
          <div className="p-4 pt-5">
            <a href="#" className="img logo rounded-circle mb-5" style={{backgroundImage: 'url(images/logo.jpg)'}} />
            <ul className="list-unstyled components mb-5">
              <li>
                <a href="#" onClick={handleDashboardClick}>Dashboard</a> {/* Click handler added */}
              </li>
              <li className="active">
                <a href="#homeSubmenu" data-toggle="collapse" aria-expanded="false" className="dropdown-toggle">Marks</a>
                <ul className="collapse list-unstyled" id="homeSubmenu">
                  <li>
                    <a href="#" onClick={handleAboutClick}>Enter Marks for Reports</a>
                  </li> 
                  <li>
                    <a href="#" onClick={handleOtherClick}>View Marks</a>
                  </li>
                </ul>
              </li>
              <li>
                <a href="#" onClick={handleProjectDetailsClick}>Supervising Project Details</a> {/* Click handler added */}
              </li>
            </ul>
          </div>
        </nav>
        
        {/* Page Content  */}
        <div id="content" className="p-4 p-md-5">
          {showReportMarks ? <ReportMarks /> : null}
          {showProjectDetails ? <TableWithStudents /> : null} {/* Conditionally render TableWithStudents */}
          {showDashboard ? <DashboardCoordinator /> : null} {/* Conditionally render SupervisorDashboard */}
          {!showReportMarks && !showProjectDetails && !showDashboard && <ReportsTable />} {/* Conditionally render ReportsTable */}
        </div>
      </div>
    </div>
  );
}
