import React from 'react';
import { BrowserRouter, Navigate, Routes, Route} from 'react-router-dom'
import SidebarSup from './componant/SidebarSup';

import OTPver from './componant/OTPverify'

import ReportMarks from './screens/supervisor/ReportMarks';
import Addrecord from './screens/project-member/add-record-page/AddRecordPage';
import DisplayRMarks from './screens/supervisor/DisplayRMarks';
import PresentationSheduleTable from './screens/project-member/presentation-shedule-tab-page/PresentationSheduletabPage';
import UpdatePresentationShedule from './screens/project-member/update-presetation-shedule-page/UpdatepresetationShedulePage';
import SidebarProjMember from './componant/project-member/SidebarProjMember';
import Addpresentationpannel from './screens/project-member/add-presentation-pannel-page/PresentationPannelPage'
import Updatepresentationshedule from './screens/project-member/update-presentation-pannel-page/UpdatePresentationPannelPage'
import PresentationPannelTablep from './screens/project-member/presentation-pannel-tab-page/PresentationPanneltabPage'

function App() {
  return (
    <div className="App">
      <BrowserRouter>
          <Routes>
            <Route path='/' element={<SidebarSup />} />
            <Route path='/displayrmarks' element={<DisplayRMarks />} />
            <Route path='/otp' element={<OTPver/> } />
            <Route path='/reportmarks' element={<ReportMarks />} />
            <Route path='/presentation-shedule/addrecord' element={<Addrecord />} />
            <Route path='/presentation-shedule' element={<PresentationSheduleTable />} />
            <Route path='/presentation-shedule/update/:id' element={<UpdatePresentationShedule />} />
            <Route path='/projMemberSideBar' element={<SidebarProjMember />} />
            <Route path='/presentation-pannel/addpresentationpannel' element={<Addpresentationpannel />} />
            <Route path='/presentation-pannel/update/:id' element={<Updatepresentationshedule/>} />
            <Route path='/presentation-pannel' element={<PresentationPannelTablep/>} />

          </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
