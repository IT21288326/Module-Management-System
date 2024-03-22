import React from 'react';
import { BrowserRouter, Navigate, Routes, Route} from 'react-router-dom'
import SidebarSup from './componant/SidebarSup';
import ReportMarks from './screens/supervisor/ReportMarks';
import Addrecord from './screens/project-member/add-record-page/AddRecordPage';


function App() {
  return (
    <div className="App">
      <BrowserRouter>
          <Routes>
            <Route path='/' element={<SidebarSup />} />
            <Route path='/reportmarks' element={<ReportMarks />} />
            <Route path='/presentation-shedule/addrecord' element={<Addrecord />} />
          </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
