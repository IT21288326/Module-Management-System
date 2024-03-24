import React, { useState } from "react";
import Swal from "sweetalert2";
import './addPresentationPannelComp.scss'
// import { useNavigate } from "react-router-dom";
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
import '../../../componant/project-member/add-presentation-shedule-record-comp/AddPresentationSheduleRecordComp.scss'

const AddPresentationPannel = () => {
  const [pannelID, setPannelId] = useState("");
  const [examiner_1, setExaminer_1] = useState("");
  const [examiner_2, setExaminer_2] = useState("");
  const [examiner_3, setExaminer_3] = useState("");


  const [error, setError] = useState(null);
  const [emptyFields, setEmptyFields] = useState([]);
//   const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const emptyFields = [];
    if (!pannelID.trim()) {
      emptyFields.push("pannelId");
    }
    if (!examiner_1.trim()) {
      emptyFields.push("examiner_1");
    }
    if (!examiner_2.trim()) {
      emptyFields.push("examiner_2");
    }
    if (!examiner_3.trim()) {
      emptyFields.push("examiner_3");
    }
    
    if (emptyFields.length > 0) {
      setEmptyFields(emptyFields);
      return;
    }
  
  
    const presentation_Pannel = {
        pannelID,
        examiner_1,
        examiner_2,
        examiner_3
    };
  
    const response = await fetch("http://localhost:3001/presentation-pannel", {
      method: "POST",
      body: JSON.stringify(presentation_Pannel),
      headers: {
        "Content-Type": "application/json",
      },
    });
  
    const json = await response.json();
  
    if (!response.ok) {
      if (response.status === 500) {
        Swal.fire("Error", "This Pannel Name already exists!", "error");
      } else {
        setError(json.error);
      }
    } else {
      setPannelId("");
      setExaminer_1("");
      setExaminer_2("");
      setExaminer_3("");
      
      Swal.fire("Done", "Pannel added successfully!", "success");
    //   navigate("/supplierdash");
    }
  };
  

  return (
    <div className="R_container_">
        <div className="R_form-container_">          
            <form onSubmit={handleSubmit}>
              <div>
                <div className="form-group">
                  <label htmlFor="groupNo" className="PannelName">Pannel Name</label>
                  <input 
                          type="text" 
                          className="form-control_" 
                          id="pannelID"
                          placeholder="Enter Pannel Name"
                          value={pannelID}
                          onChange={(e) => setPannelId(e.target.value)}
                          required
                          style={{
                            maxWidth: "800px",
                            height: "45px",
                            border: "1px solid #ffb43c",
                          }}
                      />
                </div>
              </div>
                <div className="row">
                    <div className="col">
                        <label htmlFor="examiner_1">Examiner 01</label>
                        <select
                            className="form-control_" 
                            id="examiner_1"
                            value={examiner_1}
                            onChange={(e) => setExaminer_1(e.target.value)}
                            required
                            style={{
                              maxWidth: "800px",
                              height: "45px",
                              border: "1px solid #ffb43c"
                            }}
                        >
                            <option value="">Select a examiner</option>
                            <option value="examiner 1">Kamal</option>
                            <option value="examiner 2">Amal</option>
                            <option value="examiner 3">Sameera</option>
                            {/* Add more options as needed */}
                        </select>
                    </div>
                    <div className="col">
                        <label htmlFor="examiner_2">Examiner 02</label>
                        <select
                            className="form-control_" 
                            id="examiner_2"
                            value={examiner_2}
                            onChange={(e) => setExaminer_2(e.target.value)}
                            required
                            style={{
                              maxWidth: "800px",
                              height: "45px",
                              border: "1px solid #ffb43c"
                            }}
                        >
                            <option value="">Select a Examiner</option>
                            <option value="examiner 1">kamal</option>
                            <option value="examiner 2">Aamal</option>
                            <option value="examiner 3">Sameera</option>
                            {/* Add more options as needed */}
                        </select>
                    </div>
                    <div className="col">
                        <label htmlFor="examiner_3">Pannel Name</label>
                        <select
                            className="form-control_" 
                            id="examiner_3"
                            value={examiner_3}
                            onChange={(e) => setExaminer_3(e.target.value)}
                            required
                            style={{
                              maxWidth: "800px",
                              height: "45px",
                              border: "1px solid #ffb43c"
                            }}
                        >
                            <option value="">Select a Examiner</option>
                            <option value=" examiner 1">Kamal</option>
                            <option value="examiner 2">Amal</option>
                            <option value="examiner 3">Sameera</option>
                            {/* Add more options as needed */}
                        </select>
                    </div>
                </div> 
                <div className="text-center">
                  <button type="submit" className="btn btn-primary" id="R_Button">
                    Create Pannel
                  </button>
                </div>            
            </form>
        </div>
    </div>


    
   
    
  );
};

export default AddPresentationPannel;
