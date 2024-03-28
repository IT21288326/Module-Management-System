import React, { useState } from 'react';
import PresentationsTable from '../screens/examiner/DisplayPMarks';
import PrsentationMarks from '../screens/examiner/prsentationMarks';

export default function SidebarExaminer() {
  const [showReportMarks, setShowReportMarks] = useState(false);

  const handleAboutClick = () => {
    setShowReportMarks(true);
  };

  const handleOtherClick = () => {
    setShowReportMarks(false);
  };

  return (
    <div>
      <div className="wrapper d-flex align-items-stretch">
        <nav id="sidebar">
          <div className="p-4 pt-5">
            <a href="#" className="img logo rounded-circle mb-5" style={{backgroundImage: 'url(images/logo.jpg)'}} />
            <ul className="list-unstyled components mb-5">
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
                <a href="#" onClick={handleOtherClick}>Portfolio</a>
              </li>
            </ul>
          </div>
        </nav>
        
        {/* Page Content  */}
        <div id="content" className="p-4 p-md-5">
          {showReportMarks ? <PrsentationMarks /> : <PresentationsTable />}
        </div>
      </div>
    </div>
  );
}
