import React from 'react';
import { BrowserRouter, Navigate, Routes, Route} from 'react-router-dom'

import SidebarSup from './componant/SidebarSup';

import Reg from '../src/screens/student/Registration'

import OTPver from './componant/OTPverify'
import ReportMarks from './screens/supervisor/ReportMarks';
import StudentSignUpForm from './screens/authentication/signupFormstudent';
import StaffSignUpForm from './screens/authentication/signupFormstaffmembrt';
import DisplayRMarks from './screens/supervisor/DisplayRMarks';
import PrsentationMarks from './screens/examiner/prsentationMarks';
import PresentationsTable from './screens/examiner/DisplayPMarks'
import SidebarExaminer from './componant/SidebarExaminer';
import SidebarProjMember from './componant/project-member/side-bar-proj-member/SidebarProjMember';
import AssignProjectForm from './screens/coordinator/assignProjectMember';
import LoginForm from './screens/authentication/login';
import AddProjectCoordinator from './screens/coordinator/addNewCoordinator';


import TableWithStudents from './screens/supervisor/SearchGroups'
import DashboardCoordinator from './componant/Dashboard/DashboardCoordinator';
import DonutChart from './componant/Dashboard/Dounut';
import LineChart from './componant/Dashboard/Line';
import InProgress from './componant/Dashboard/InProgress';
import SupervisorDashboard from './componant/Dashboard/SupervisorDashboard';
import SideBarCoordinator from './componant/SideBarCoordinator';
import MarksTable from './screens/coordinator/marksTable';
import DisplayMarks from './screens/co-supervisor/DisplayMarks';
import SidebarCoSup from './componant/SidebarCoSupervisor';
import Edit from './screens/co-supervisor/edit';
import backgroundImage from './img/back1.jpg';

import GroupRegistrationForm from './componant/Student/grpRegForm'
import GroupRegistrationTable from './componant/Student/RegFetchdata';
import MarksheetStatistics from './screens/supervisor/MarksheetStatistics'

import MarkSheet from './screens/supervisor/AssesmentMarks';
import MarkingForm from './screens/supervisor/MarkingForm';
import MarkingTableNew from './screens/supervisor/MarkingTableNew';
import Update from './screens/supervisor/Update';

import UseControl from './screens/coordinator/UsersControl'


import ResearchPublicationForm from './componant/Student/Research';

import Marksheet from './screens/supervisor/final_marksheet';




function App() {
  return (
    <div className="app" style={{
      background:
        '-webkit-linear-gradient(90deg, hsla(186, 33%, 94%, 1) 0%, hsla(216, 41%, 79%, 1) 100%)',
          width: '100%',
          height: '100%'
    }}>
      <BrowserRouter>
          <Routes>

          {/* shashi */}
            <Route path='/signUp-student' element={<StudentSignUpForm />} />
            <Route path='/signUp-staff' element={<StaffSignUpForm />} />
            <Route path='/otp' element={<OTPver/> } />
            <Route path='/assignProjectMember' element={<AssignProjectForm/>} />
            <Route path='/login' element={<LoginForm/>} />            
            <Route path='/markTable' element={<MarksTable/>} />
            <Route path='/addnewPC' element={<AddProjectCoordinator/>} />
            <Route path='/userControl' element={<UseControl/>}/>
          {/* savidya */}
            <Route path='/' element={<SidebarSup />} />
            <Route path='/marksheet' element={<MarkSheet />} />
            <Route path='/marksheetstat' element={<MarksheetStatistics />} />

            <Route path='/ex' element={<SidebarExaminer />} />
            <Route path='/displayrmarks' element={<DisplayRMarks />} />
            <Route path='/PrsentationMarks' element={<PrsentationMarks />} />
            <Route path='/displayPmarks' element={<PresentationsTable />} />
            <Route path='/reportmarks' element={<ReportMarks />} />
            <Route path='/TableWithStudents' element={<TableWithStudents/>}/>
            <Route path='/dashboardC' element={<DashboardCoordinator/>}/>
            <Route path='/dounut' element={<DonutChart/>}/>
            <Route path='/line' element={<LineChart/>}/>
            <Route path='/inprogress' element={<InProgress/>}/>
            <Route path='/dashboardS' element={<SupervisorDashboard/>}/>
            <Route path='/coo' element={<SideBarCoordinator/>}/>
            <Route path='/update' element={<DisplayMarks/>}/>
            <Route path='/co-sup' element={<SidebarCoSup/>}/>
            <Route path='/edit' element={<Edit/>}/>
            <Route path='/last' element={<MarkingForm/>}/>
            <Route path='/lastta' element={<MarkingTableNew/>}/>
            <Route path='/lastup' element={<Update/>}/>
            <Route path='/finalgrade' element={<Marksheet/>}/>

          {/* Rusith */}
            <Route path='/projMemberSideBar' element={<SidebarProjMember />} />
            
            
              
          {/* Supun */}
            <Route path='/Registration' element={<Reg />} />
            <Route path='/Regform' element={<GroupRegistrationForm />} />
            <Route path='FetchReg' element={<GroupRegistrationTable/>} />

            <Route path='/research' element={<ResearchPublicationForm/>} />



            
            
       

          </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
