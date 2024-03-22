import React from 'react';
import { BrowserRouter, Navigate, Routes, Route} from 'react-router-dom'
import SidebarSup from './componant/SidebarSup';

import OTPver from './componant/OTPverify'

import ReportMarks from './screens/supervisor/ReportMarks';
import Addrecord from './screens/project-member/add-record-page/AddRecordPage';
import DisplayRMarks from './screens/supervisor/DisplayRMarks';


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



          </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
