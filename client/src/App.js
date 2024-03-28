import React from 'react';
import { BrowserRouter, Navigate, Routes, Route} from 'react-router-dom'
import SidebarSup from './componant/SidebarSup';
import Reg from '../src/screens/student/Registration'

function App() {
  return (
    <div className="App">
      <BrowserRouter>
          <Routes>
            <Route path='/' element={<SidebarSup />} />
            <Route path='/Registration' element={<Reg />} />

          </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
