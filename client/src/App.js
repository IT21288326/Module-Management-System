import React from 'react';
import { BrowserRouter, Navigate, Routes, Route} from 'react-router-dom'
import SidebarSup from './componant/SidebarSup';

import OTPver from './componant/OTPverify'

import ReportMarks from './screens/supervisor/ReportMarks';
import Addrecord from './screens/project-member/add-record-page/AddRecordPage';
import DisplayRMarks from './screens/supervisor/DisplayRMarks';
import PresentationSheduleTable from './screens/project-member/presentation-shedule-tab-page/PresentationSheduletabPage';
import UpdatePresentationShedule from './screens/project-member/update-presetation-shedule-page/UpdatepresetationShedulePage';
import PrsentationMarks from './screens/examiner/prsentationMarks';
import PresentationsTable from './screens/examiner/DisplayPMarks'
import SidebarExaminer from './componant/SidebarExaminer';
function App() {
  return (
    <div className="App">
      <BrowserRouter>
          <Routes>
            <Route path='/' element={<SidebarSup />} />
            <Route path='/ex' element={<SidebarExaminer />} />
            <Route path='/displayrmarks' element={<DisplayRMarks />} />
            <Route path='/PrsentationMarks' element={<PrsentationMarks />} />
            <Route path='/displayPmarks' element={<PresentationsTable />} />
            <Route path='/otp' element={<OTPver/> } />
            <Route path='/reportmarks' element={<ReportMarks />} />
            <Route path='/presentation-shedule/addrecord' element={<Addrecord />} />
            <Route path='/presentation-shedule' element={<PresentationSheduleTable />} />
            <Route path='/presentation-shedule/update/:id' element={<UpdatePresentationShedule />} />


          </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
