import React, { useState, useEffect } from "react";import './registration.css';
//import GroupRegistrationForm from "../../componant/Student/grpRegForm";
import GroupRegistrationForm from "../../componant/Student/tempo";
import RegData from '../../componant/Student/RegFetchdata'
// import rPublish from '../../componant/Student/Reserch'
import './registration.css';
import axios from 'axios'; 
import { Link } from 'react-router-dom';


function Registration() {
  
    const [showAddPannelModal, setShowAddPannelModal] = useState(false);
    const [showRegFetchdata, setShowRegFetchdata] = useState(false);
    const [showResearchPublicationForm, setShowResearchPublicationForm] = useState(false); // State to manage the visibility of the ResearchPublicationForm

    const [registrationData, setRegistrationData] = useState(null);


    const fetchRegistrationData = async () => {
      try {
          const response = await axios.get('/api/registrationdata'); // Adjust the endpoint as per your backend
          setRegistrationData(response.data);
      } catch (error) {
          console.error('Error fetching registration data:', error);
      }
  };

  useEffect(() => {
      // Fetch registration data when component mounts
      fetchRegistrationData();
  }, [])


  function toggleContent(event) {
    const parentElement = event.target.closest(".registration-section-head");
    
    const content = parentElement.nextElementSibling;
    
    if (content.style.display === "none" || content.style.display === "") {
      content.style.display = "block";
      event.target.innerHTML = "-";
    } else {
      content.style.display = "none";
      event.target.innerHTML = "+";
    }
  }
  function toggleContent2(event2) {
    const parentElement2 = event2.target.closest(".research-publicaton-head");
    
    const research = parentElement2.nextElementSibling;
    
    if (research.style.display === "none" || research.style.display === "") {
      research.style.display = "block";
      event2.target.innerHTML = "-";
    } else {
      research.style.display = "none";
      event2.target.innerHTML = "+";
    }
  }
  function toggleContent3(event3) {
    console.log("Button clicked"); // Log to check if the event handler is triggered

    const parentElement3 = event3.target.closest(".registration-assesment1-head");
    console.log("Parent element:", parentElement3); // Log to check the parent element

    if (!parentElement3) return;

    const assesment = parentElement3.nextElementSibling;
    console.log("Assesment element:", assesment); // Log to check the assesment element

    if (!assesment) return;

    // Toggle the display directly without checking the current state
    if (assesment.style.display === "none") {
        assesment.style.display = "block";
        event3.target.innerHTML = "-";
    } else {
        assesment.style.display = "none";
        event3.target.innerHTML = "+";
    }
}


  return (
    <div className="registration-container">
      <div className="horizontal-line"></div>
      <header className="registration-header">
        <div className="registration-title-container">
          <img className="registration-logo" src="logo.svg" alt="User" />
        </div>
      </header>
      <main className="registration-main">
        <section className="staff-members">
          <h2>Staff members to contact regarding inquiries related to the module:</h2>
          <p>Ms. Virajini (virajini.g@sliit.lk) – For any assessment-related inquiries or issues</p>
          <p>Ms. Poojani (poojani.g@sliit.lk) – For inquiries about group formation or submission of group details</p>
          <p>Dr. Dilshan (dilshan.i@sliit.lk) – For any concerns about the final examination paper</p>
        </section>
        <section className="email-guidelines">
          <h2>Notice: Sending emails to staff members</h2>
          <p>When sending emails to staff members, please adhere to the following guidelines:</p>
          <p>Send emails from your SLIIT account. Emails sent from other accounts will not receive a response.</p>
          <p>Ensure that you mention the module name and project group number.</p>
          <p>Only send the email to the relevant staff member.</p>
          <p>Refrain from copying emails sent to one staff member to other module members.</p>
          <p>Avoid sending the same email as separate emails to multiple staff members.</p>
          <p>When communicating your message, refrain from sending lengthy emails generated by AI tools. Instead, concisely state your concerns directly.</p>
        </section>
        <br></br>
            <br></br>
            <br></br>
        <section className="registration-sections">
          <section className="assessments-section">
            <h1>ASSESMENTS</h1>
          </section>
          <br></br>
          <article className="registration-section1">
            <article className="registration-section-head">
              <h3>GROUP REGISTRATION</h3>
              <button onClick={toggleContent}>+</button>
            </article>
            <p className="content" style={{ display: 'none' }}><br></br>NOTICE <br></br> If you notice any errors or if your group information is not included, send an email to itpm.it3040@gmail.com before February 17, 2024.

For groups listed under the "No Sub" sheet, it is mandatory to specify their assigned lab group in Column G next to each student before February 17, 2024.

Kindly note that no teams have been allocated a team number for the ITPM module yet. <br></br>Register using form below <br></br> 
<br></br>
{registrationData && (
                            <div>
                                {/* Display retrieved data  */}
                                <p>{registrationData.batch}</p>
                            </div>
                        )}
                        <br />
                        {/* Registration form button */}
<button onClick={() => setShowAddPannelModal(true)} className="Russa_PresentationPannelTable_addNew"  
        style={{
          display: 'inline-block',
          padding: '8px 16px', // Smaller button size
          border: '2px solid black', // Black frame
          backgroundColor: '#333', // Ash background color
          textDecoration: 'none',
          color: 'white', // White text
          fontSize: '14px', // Smaller font size
          fontWeight: 'bold',
          marginRight: '10px', // Add space between buttons

        }}>Register Here </button>
<Link
        to="/FetchReg"
        className="Supun_FetchData view-group-button"
        style={{
          display: 'inline-block',
          padding: '8px 16px', // Smaller button size
          border: '2px solid black', // Black frame
          backgroundColor: '#333', // Ash background color
          textDecoration: 'none',
          color: 'white', // White text
          fontSize: '14px', // Smaller font size
          fontWeight: 'bold',
        }}
      >
        View Group
      </Link></p>
          </article>
          <br></br>
          <article className="registration-section2">
            <h3>ASSESMENT 1</h3>
            <button onClick={(event) => toggleContent3(event)}>+</button>
          </article>
          <br></br>
          <article className="registration-section3">
            <h3>ASSESMENT 2</h3>
            <button onClick={toggleContent}>+</button>
          </article>
        </section>
<br></br>
        <article className="research-publicaton-head">
          <h2>RESEARCH PUBLICATION</h2>
          <button onClick={toggleContent2}>+</button>
          </article>
          
            <p className="research" style={{ display: 'none' }}><br></br>NOTICE <br></br> If you notice any errors or if your group information is not included, send an email to itpm.it3040@gmail.com before February 17, 2024.

For groups listed under the "No Sub" sheet, it is mandatory to specify their assigned lab group in Column G next to each student before February 17, 2024.

Kindly note that no teams have been allocated a team number for the ITPM module yet. <br></br>Register using form below <br></br><br></br>
<br></br>
<Link
        to="/Research"
        className="Supun_FetchData view-group-button"
        style={{
          display: 'inline-block',
          padding: '8px 16px', // Smaller button size
          border: '2px solid black', // Black frame
          backgroundColor: '#333', // Ash background color
          textDecoration: 'none',
          color: 'white', // White text
          fontSize: '14px', // Smaller font size
          fontWeight: 'bold',
        }}
      >
        Publish Research
      </Link></p>
           
<br></br>
            <br></br>
            <br></br>
          <article className="semester-mark">
            <h3>SEMESTER MARKS</h3> 
            </article>
            <br></br>
            <article className="semester-mark-head">
              <h3>PRESENTATION 1 MARK</h3>
              <button onClick={toggleContent}>+</button>
            </article>
            <br></br>
            <article className="semester-mark-head">
              <h3>PRESENTATION 2 MARK</h3>
              <button onClick={toggleContent}>+</button>
            </article>
            <br></br>
            <article className="semester-mark-head">
              <h3>PRESENTATION 3 MARK</h3>
              <button onClick={toggleContent}>+</button>
            </article>
         
        
      </main>
      {showAddPannelModal && <GroupRegistrationForm onClose={() => { setShowAddPannelModal(false) }} />}
      {showRegFetchdata && <RegData onClose={() => { setShowRegFetchdata(false) }} />}
      {showResearchPublicationForm && <rPublish onClose={() => { setShowResearchPublicationForm(false) }} />}


    </div>
  );
}

export default Registration;











