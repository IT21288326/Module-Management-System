import React, { useState } from 'react';
import PresentationSheduleTable from '../presentation-shedule-tab-comp/PresentationSheduletabComp';
import SupervisorDashboard from '../../Dashboard/SupervisorDashboard';
import AddAssessment from '../../../screens/coordinator/addAssesment';
import PresentationMarkingRubricsView from '../Presentations Marking Rubrics  view/PresentationMarkingRubricsView';
import ReportMarkingRubricsView from '../Reports Marking Rubrics view/ReportMarkingRubricsView'

export default function SidebarProjMember() {
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
              <li className={activeLink === "Assessment" ? "active" : ""}>
                <a href="#" onClick={() => handleLinkClick("Assessment")}>Assessment</a>
              </li>
              <li className={activeLink === "PresentationSheduleTable" ? "active" : ""}>
                <a href="#" onClick={() => handleLinkClick("PresentationSheduleTable")}>Presentation Schedule</a>
              </li>
              {/* <li className={activeLink === "MarkingRubrics" ? "active" : ""}>
                <a href="#" onClick={() => handleLinkClick("MarkingRubrics")}>Marking Rubrics</a>
              </li> */}


              <li className={activeLink === "MarkingRubrics" ? "active" : ""}>
                <a href="#homeSubmenu" data-toggle="collapse" aria-expanded="false" className="dropdown-toggle">Marking Rubrics</a>
                <ul className="collapse list-unstyled" id="homeSubmenu">
                  <li>
                    <a href="#" onClick={() => handleLinkClick("Presentations Marking Rubrics")}>Presentations Marking Rubrics</a>
                  </li>
                  <li>
                    <a href="#" onClick={() => handleLinkClick("Reports Marking Rubrics")}>Report Marking Rubrics</a>
                  </li>
                </ul>
              </li>


            </ul>
          </div>
        </nav>

        {/* Page Content  */}
        <div id="content" className="p-4 p-md-5">
          {activeLink === "PresentationSheduleTable" && <PresentationSheduleTable />}
          {activeLink === "Dashboard" && <SupervisorDashboard />}
          {activeLink === "Assessment" && <AddAssessment/>}
          {activeLink === "Presentations Marking Rubrics" && <PresentationMarkingRubricsView/>}
          {activeLink === "Reports Marking Rubrics" && <ReportMarkingRubricsView/>}
        </div>
      </div>
    </div>
  );
}
