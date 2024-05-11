import React, { useState } from 'react';
import PresentationSheduleTable from '../presentation-shedule-tab-comp/PresentationSheduletabComp';
import SupervisorDashboard from '../../Dashboard/SupervisorDashboard';
import PresentationMarkingRubricsView from '../Presentations Marking Rubrics  view/PresentationMarkingRubricsView';
import ReportMarkingRubricsView from '../Reports Marking Rubrics view/ReportMarkingRubricsView'
import ViewReportAssessments from '../View Assements/ViewReportAssesment'
import ViewPresentationAssessments from '../View Assements/ViewPresentationAssesment'
import ViewVivaAssessments from '../View Assements/ViewVivaAssesment'
import FinalMarkComp from '../Final Marking Rubric/FinalMarkingComp'

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

              <li className={activeLink === "Assesments" ? "active" : ""}>
                <a href="#assesments" data-toggle="collapse" aria-expanded="false" className="dropdown-toggle">Assesments</a>
                <ul className="collapse list-unstyled" id="assesments">
                  <li>
                    <a href="#" onClick={() => handleLinkClick("Presentations")}>Presentations</a>
                  </li>
                  <li>
                    <a href="#" onClick={() => handleLinkClick("Reports")}>Reports</a>
                  </li>
                  <li>
                    <a href="#" onClick={() => handleLinkClick("Vivas")}>Vivas</a>
                  </li>
                </ul>
              </li>

              <li className={activeLink === "MarkingRubrics" ? "active" : ""}>
                <a href="#homeSubmenu" data-toggle="collapse" aria-expanded="false" className="dropdown-toggle">Marking Rubrics</a>
                <ul className="collapse list-unstyled" id="homeSubmenu">
                  <li>
                    <a href="#" onClick={() => handleLinkClick("Presentations Marking Rubrics")}>Presentations Marking Rubrics</a>
                  </li>
                  <li>
                    <a href="#" onClick={() => handleLinkClick("Reports Marking Rubrics")}>Report Marking Rubrics</a>
                  </li>
                  <li>
                    <a href="#" onClick={() => handleLinkClick("Marking Wegihts")}>Marking Wegihts</a>
                  </li>
                  
                </ul>
              </li>

              <li className={activeLink === "PresentationSheduleTable" ? "active" : ""}>
                <a href="#" onClick={() => handleLinkClick("PresentationSheduleTable")}>Presentation Schedule</a>
              </li>
            </ul>
          </div>
        </nav>

        {/* Page Content  */}
        <div id="content" className="p-4 p-md-5">
          {activeLink === "PresentationSheduleTable" && <PresentationSheduleTable />}
          {activeLink === "Dashboard" && <SupervisorDashboard />}
          {activeLink === "Presentations Marking Rubrics" && <PresentationMarkingRubricsView/>}
          {activeLink === "Reports Marking Rubrics" && <ReportMarkingRubricsView/>}
          {activeLink === "Presentations" && <ViewPresentationAssessments/>}
          {activeLink === "Reports" && <ViewReportAssessments/>}
          {activeLink === "Vivas" && <ViewVivaAssessments/>}
          {activeLink === "Marking Wegihts" && <FinalMarkComp/>}
        </div>
      </div>
    </div>
  );
}
