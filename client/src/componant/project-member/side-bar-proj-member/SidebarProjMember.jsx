import React, { useState } from 'react';
import PresentationSheduleTable from '../presentation-shedule-tab-comp/PresentationSheduletabComp';
import PresentationPannelTable from '../../../componant/project-member/presentation-pannel-tab-comp/PresentationPanneltabComp'; // Import PresentationPannelTable

export default function SidebarProjMember() {
  const [showPresentationSchedule, setShowPresentationSchedule] = useState(false);
  const [showPresentationPannel, setShowPresentationPannel] = useState(false); // State for presentation pannel

  const handleAboutClick = () => {
    setShowPresentationSchedule(false);
    setShowPresentationPannel(false); // Close presentation pannel
  };

  const handleOtherClick = () => {
    setShowPresentationSchedule(true);
    setShowPresentationPannel(false); // Close presentation pannel
  };

  const handlePresentationPannelClick = () => {
    setShowPresentationSchedule(false);
    setShowPresentationPannel(true); // Open presentation pannel
  };

  return (
    <div>
      <div className="wrapper d-flex align-items-stretch">
        <nav id="sidebar">
          <div className="p-4 pt-5">
            <a href="#" className="img logo rounded-circle mb-5" style={{backgroundImage: 'url(images/logo.jpg)'}} />
            <ul className="list-unstyled components mb-5">
              <li>
                <a href="#">Assessments</a>
              </li>

              <li>
                <a href="#">Portfolio</a>
              </li>

              <li>
                <a href="#homeSubmenu" data-toggle="collapse" aria-expanded="false" className="dropdown-toggle">Presentation Management</a>
                <ul className="collapse list-unstyled" id="homeSubmenu">
                  <li>
                  <a href="#" onClick={handlePresentationPannelClick}>Presentation Pannel</a>
                  </li> 
                  <li>
                    <a href="#" onClick={handleOtherClick}>Presentation Schedule</a>
                  </li>
                </ul>
              </li>
              {/* Add the Presentation Pannel link */}
              
               
              
            </ul>
          </div>
        </nav>
        
        {/* Page Content  */}
        <div id="content" className="p-4 p-md-5">
          {showPresentationSchedule && <PresentationSheduleTable />}
          {showPresentationPannel && <PresentationPannelTable />} {/* Render PresentationPannelTable if showPresentationPannel is true */}
        </div>
      </div>
    </div>
  );
}




