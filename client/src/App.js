import React from 'react';
import { BrowserRouter, Navigate, Routes, Route} from 'react-router-dom'
import SidebarSup from './componant/SidebarSup';

import OTPver from './componant/OTPverify'

import ReportMarks from './screens/supervisor/ReportMarks';
import Addrecord from './screens/project-member/add-record-page/AddRecordPage';
import StudentSignUpForm from './screens/authentication/signupFormstudent';
import StaffSignUpForm from './screens/authentication/signupFormstaffmembrt';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
          <Routes>
            <Route path='/' element={<SidebarSup />} />

            <Route path='/otp' element={<OTPver/> } />

            <Route path='/reportmarks' element={<ReportMarks />} />
            <Route path='/presentation-shedule/addrecord' element={<Addrecord />} />
            <Route path='/signUp-student' element={<StudentSignUpForm />} />

            <Route path='/signUp-staff' element={<StaffSignUpForm />} />



          </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
