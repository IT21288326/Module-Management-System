import React from 'react';
import { BrowserRouter, Navigate, Routes, Route} from 'react-router-dom'
import SidebarSup from './componant/SidebarSup';
import OTPver from './componant/OTPverify'

function App() {
  return (
    <div className="App">
      <BrowserRouter>
          <Routes>
            <Route path='/' element={<SidebarSup />} />
            <Route path='/otp' element={<OTPver/>
          } />
          </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
