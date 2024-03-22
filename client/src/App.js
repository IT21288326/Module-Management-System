import React from 'react';
import { BrowserRouter, Navigate, Routes, Route} from 'react-router-dom'
import SidebarSup from './componant/SidebarSup';
import ReportMarks from './screens/supervisor/ReportMarks';


function App() {
  return (
    <div className="App">
      <BrowserRouter>
          <Routes>
            <Route path='/' element={<SidebarSup />} />
            <Route path='/reportmarks' element={<ReportMarks />} />
          </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
