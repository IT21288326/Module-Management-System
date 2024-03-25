import React, { useState } from 'react';
import PresentationSheduleTable from '../../screens/project-member/presentation-shedule-tab-page/PresentationSheduletabPage';
import AddPresentationPannel from '../../screens/project-member/add-presentation-pannel-page/PresentationPannelPage';

export default function SidebarProjMember() {
  const [showPresentationSchedule, setShowPresentationSchedule] = useState(false);

  const handleAboutClick = () => {
    setShowPresentationSchedule(false);
  };

  const handleOtherClick = () => {
    setShowPresentationSchedule(true);
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
                    <a href="#" onClick={handleAboutClick}>Presentation Pannels</a>
                  </li> 
                  <li>
                    <a href="#" onClick={handleOtherClick}>Presentation Schedule</a>
                  </li>
                </ul>
              </li>
            </ul>
          </div>
        </nav>
        
        {/* Page Content  */}
        <div id="content" className="p-4 p-md-5">
          {showPresentationSchedule && <PresentationSheduleTable />}
        </div>
      </div>
    </div>
  );
}
