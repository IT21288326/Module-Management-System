import React from 'react'
import { useState } from 'react';
import ReportMarks from '../screens/supervisor/ReportMarks'

export default function SidebarSup() {
  const [showReportMarks, setShowReportMarks] = useState(false);

  const handleAboutClick = () => {
    setShowReportMarks(true);
  };

  const handleOtherClick = () => {
    setShowReportMarks(false);
    // You can add logic here to handle other clicks if needed
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
          <a href="#pageSubmenu" data-toggle="collapse" aria-expanded="false" className="dropdown-toggle">Pages</a>
          <ul className="collapse list-unstyled" id="pageSubmenu">
            <li>
              <a href="#">Page 1</a>
            </li>
            <li>
              <a href="#">Page 2</a>
            </li>33
            <li>
              <a href="#">Page 3</a>
            </li>
          </ul>
        </li>
        <li>
          <a href="#" onClick={handleOtherClick}>Portfolio</a>
        </li>
        <li>
          <a href="#">Contact</a>
        </li>
      </ul>
    </div>
  </nav>
  
{/* Page Content  */}
<div id="content" className="p-4 p-md-5">
{showReportMarks && <ReportMarks />}
</div>

    {/* <ReportMarks></ReportMarks> */}
    </div>


    </div>
  )
}
