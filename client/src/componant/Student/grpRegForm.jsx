import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import "./GrpregForm.scss" 




const GroupRegistrationForm = ({onClose}) => {

  const [batch, setBatch] = useState("");
  const [specialization, setSpecialization] = useState("");
  const [leadersRegistrationNO, setLeadersRegistrationNO] = useState("");
  const [leaderName, setLeaderName] = useState("");
  const [leaderContactNo, setLeaderContactNo] = useState("");
  const [leaderEmailAddress, setLeaderEmailAddress] = useState("");
  const [member1RegistrationNO, setMember1RegistrationNO] = useState("");
  const [member1Name, setMember1Name] = useState("");
  const [member1ContactNo, setmMmber1ContactNo] = useState("");
  const [member1EmailAddress, setMember1EmailAddress] = useState("");
  const [member2RegistrationNO, setMember2RegistrationNO] = useState("");
  const [member2Name, setMember2Name] = useState("");
  const [member2ContactNo, setmMmber2ContactNo] = useState("");
  const [member2EmailAddress, setMember2EmailAddress] = useState("");
  const [member3RegistrationNO, setMember3RegistrationNO] = useState("");
  const [member3Name, setMember3Name] = useState("");
  const [member3ContactNo, setmMmber3ContactNo] = useState("");
  const [member3EmailAddress, setMember3EmailAddress] = useState("");
  const [member4RegistrationNO, setMember4RegistrationNO] = useState("");
  const [member4Name, setMember4Name] = useState("");
  const [member4ContactNo, setmMmber4ContactNo] = useState("");
  const [member4EmailAddress, setMember4EmailAddress] = useState("");
  const [title, setTitle] = useState("");
  const [area, setArea] = useState("");
  const [supervisor, setSupervisor] = useState("");
  const [cosupervisor, setCosupervisor] = useState("");
 

  
  const handleSubmit = async (e) => {
    e.preventDefault();


    const emptyFields = [];
    if (!batch.trim()) {
      emptyFields.push("Batch");
    }
    if (!specialization.trim()) {
      emptyFields.push("specialization");
    }
    if (!leaderName.trim()) {
      emptyFields.push("leader Name");
    }
    if (!leaderContactNo.trim()) {
      emptyFields.push("leader Contact No");
    }
    if (!leaderEmailAddress.trim()) {
      emptyFields.push("leaderEmailAddress");
    }
    if (!member1RegistrationNO.trim()) {
      emptyFields.push("Member 1 Registration NO");
    }
    if (!member1Name.trim()) {
      emptyFields.push(" member 1 Name");
    }
    if (!member1ContactNo.trim()) {
      emptyFields.push("member 1 Contact No");
    }
    if (!member1EmailAddress.trim()) {
      emptyFields.push("member 1 Email Address");
    }
    if (!member2RegistrationNO.trim()) {
      emptyFields.push("Member 2 Registration NO");
    }
    if (!member2Name.trim()) {
      emptyFields.push(" member 2 Name");
    }
    if (!member2ContactNo.trim()) {
      emptyFields.push("member 2 Contact No");
    }
    if (!member2EmailAddress.trim()) {
      emptyFields.push("member 2 Email Address");
    }if (!member3RegistrationNO.trim()) {
      emptyFields.push("Member 3 Registration NO");
    }
    if (!member3Name.trim()) {
      emptyFields.push(" member 3 Name");
    }
    if (!member3ContactNo.trim()) {
      emptyFields.push("member 3 Contact No");
    }
    if (!member3EmailAddress.trim()) {
      emptyFields.push("member 3 Email Address");
    }if (!member4RegistrationNO.trim()) {
      emptyFields.push("Member 4 Registration NO");
    }
    if (!member4Name.trim()) {
      emptyFields.push(" member 4 Name");
    }
    if (!member4ContactNo.trim()) {
      emptyFields.push("member 4 Contact No");
    }
    if (!member4EmailAddress.trim()) {
      emptyFields.push("member 4 Email Address");
    }
    if (!title.trim()) {
      emptyFields.push("Title");
    }
    if (!area.trim()) {
      emptyFields.push("Area");
    }
    if (!supervisor.trim()) {
      emptyFields.push("Supervisor");
    }
    if (!cosupervisor.trim()) {
      emptyFields.push("Cosupervisor");
    }

    if (emptyFields.length > 0) {
      emptyFields.forEach(field => {
        Swal.fire("Error", `${field} cannot be empty!`, "error");
      });
      return;
    }

    try {
      

      const registration_form = {
        batch,
        specialization,
        leadersRegistrationNO,
        leaderName,
        leaderContactNo,
        leaderEmailAddress,
        member1RegistrationNO,
        member1Name,
        member1ContactNo,
        member1EmailAddress,
        member2RegistrationNO,
        member2Name,
        member2ContactNo,
        member2EmailAddress,
        member3RegistrationNO,
        member3Name,
        member3ContactNo,
        member3EmailAddress,
        member4RegistrationNO,
        member4Name,
        member4ContactNo,
        member4EmailAddress,
        title,
        area,
        supervisor,
        cosupervisor
      };

      const response = await fetch("http://localhost:3001/api/GrpRergistration", {
        method: "POST",
        body: JSON.stringify(registration_form),
        headers: {
          "Content-Type": "application/json",
        },
      });

      const json = await response.json();

      if (!response.ok) {
        console.error("Error Registration Fail:", json.error);
      } else {

        setBatch("");
        setSpecialization("");
        setLeadersRegistrationNO("");
        setLeaderName("");
        setLeaderContactNo("");
        setLeaderEmailAddress("");
        setMember1RegistrationNO("");
        setMember1Name("");
        setmMmber1ContactNo("");
        setMember1EmailAddress("");
        setMember2RegistrationNO("");
        setMember2Name("");
        setmMmber2ContactNo("");
        setMember2EmailAddress("");
        setMember3RegistrationNO("");
        setMember3Name("");
        setmMmber3ContactNo("");
        setMember3EmailAddress("");
        setMember4RegistrationNO("");
        setMember4Name("");
        setmMmber4ContactNo("");
        setMember4EmailAddress("");
        setTitle("");
        setArea("");
        setSupervisor("");
        setCosupervisor("");
        onClose();
        Swal.fire("Done", "Registration successfully!", "success");
      }
    } catch (error) {
      console.error("Error Registration:", error);
    }
  };




  return (
    <div className="imesh_grpReg">
      <div className="modal-overlay">
        <div className="modal-content">
          <button className="close-modal-button" onClick={onClose}>&times;</button>
          <h1 className="imesh_grpReg_form-title">Group Registration</h1>
          <form onSubmit={handleSubmit}>
            <div className="imesh_grpReg_main-user-info">
              <div className="user-input-box">
                <label htmlFor="batch">Batch</label>
                <input
                  type="text"
                  className="form-control"
                  id="batch"
                  placeholder="Enter your Batch"
                  onChange={(e) => setBatch(e.target.value)}
                />
              </div>

              <div className="user-input-box">
                <label htmlFor="spec">Specialization</label>
                <input
                  className="form-control"
                  id="spec"
                  type="text"
                  placeholder="Enter a Specialization"
                  onChange={(e) => setSpecialization(e.target.value)}

                />                 
              </div>

              <div className="user-input-box">
                <label htmlFor="title">Title:</label>
                <input
                  className="form-control"
                  id="title"
                  type="text"
                  placeholder="Enter the Title"
                  onChange={(e) => setTitle(e.target.value)}
                />   
              </div>

              <div className="user-input-box">
                <label htmlFor="area">Area</label>
                <input
                  className="form-control"
                  id="area"
                  type="text"
                  placeholder="Enter the Area"
                  onChange={(e) => setArea(e.target.value)}
                />   
              </div>

              <div className="user-input-box">
                <label htmlFor="leaderRegNo">Leader Registration No</label>
                <input
                  className="form-control"
                  id="leaderRegNo"
                  type="text"
                  placeholder="Enter Leader Registration No"
                  onChange={(e) => setLeadersRegistrationNO(e.target.value)}
                />
               </div>

              <div className="user-input-box">
                <label htmlFor="leaderName">Leader Name:</label>
                <input
                  className="form-control"
                  id="leaderName"
                  type="text"
                  placeholder="Enter leader Name"
                  onChange={(e) => setLeaderName(e.target.value)}
                />                 
              </div>

              <div className="user-input-box">
                <label htmlFor="leaderContact">Leader Contact No:</label>
                <input
                  className="form-control"
                  id="leaderContact"
                  type="text"
                  placeholder="Enter leader Contact No"
                  onChange={(e) => setLeaderContactNo(e.target.value)}
                />   
              </div>

              <div className="user-input-box">
                <label htmlFor="leaderemail">Leader Email Address:</label>
                <input
                  className="form-control"
                  id="leaderemail"
                  type="text"
                  placeholder="Enter a leader Email Address"
                  onChange={(e) => setLeaderEmailAddress(e.target.value)}
                />   
              </div>

              <div className="user-input-box">
                <label htmlFor="m1RegNo">member 1 Registration No:</label>
                <input
                  className="form-control"
                  id="m1RegNo"
                  type="text"
                  placeholder="Enter a member 1 Registration No"
                  onChange={(e) => setMember1RegistrationNO(e.target.value)}
                />   
              </div>

              <div className="user-input-box">
                <label htmlFor="m1Name">member 1 Name:</label>
                <input
                  className="form-control"
                  id="m1Name"
                  type="text"
                  placeholder="Enter a member 1 Name"
                  onChange={(e) => setMember1Name(e.target.value)}
                />   
              </div>

              <div className="user-input-box">
                <label htmlFor="m1Contact">member 1 Contact No:</label>
                <input
                  className="form-control"
                  id="m1Contact"
                  type="text"
                  placeholder="Enter a member 1 Contact No"
                  onChange={(e) => setmMmber1ContactNo(e.target.value)}
                />   
              </div>

              <div className="user-input-box">
                <label htmlFor="m1Email">member 1 Email Address:</label>
                <input
                  className="form-control"
                  id="m1Email"
                  type="text"
                  placeholder="Enter a member 1 Email Address"
                  onChange={(e) => setMember1EmailAddress(e.target.value)}
                />   
              </div>

              <div className="user-input-box">
                <label htmlFor="m2RegNo">member 2 Registration No:</label>
                <input
                  className="form-control"
                  id="m2RegNo"
                  type="text"
                  placeholder="Enter a member 2 Registration No"
                  onChange={(e) => setMember2RegistrationNO(e.target.value)}
                />   
              </div>

              <div className="user-input-box">
                <label htmlFor="m2Name">member 2 Name:</label>
                <input
                  className="form-control"
                  id="m2Name"
                  type="text"
                  placeholder="Enter a member 2 Name"
                  onChange={(e) => setMember2Name(e.target.value)}
                />   
              </div>

              <div className="user-input-box">
                <label htmlFor="m2Contact">member 2 Contact No:</label>
                <input
                  className="form-control"
                  id="m2Contact"
                  type="text"
                  placeholder="Enter a member 2 Contact No"
                  onChange={(e) => setmMmber2ContactNo(e.target.value)}
                />   
              </div>

              <div className="user-input-box">
                <label htmlFor="m2Email">member 2 Email Address:</label>
                <input
                  className="form-control"
                  id="m2Email"
                  type="text"
                  placeholder="Enter a member 2 Email Address"
                  onChange={(e) => setMember2EmailAddress(e.target.value)}
                />   
              </div>

              <div className="user-input-box">
                <label htmlFor="m3RegNo">member 3 Registration No:</label>
                <input
                  className="form-control"
                  id="m3RegNo"
                  type="text"
                  placeholder="Enter a member 3 Registration No"
                  onChange={(e) => setMember3RegistrationNO(e.target.value)}
                />   
              </div>

              <div className="user-input-box">
                <label htmlFor="m3Name">member 3 Name:</label>
                <input
                  className="form-control"
                  id="m3Name"
                  type="text"
                  placeholder="Enter a member 3 Name"
                  onChange={(e) => setMember3Name(e.target.value)}
                />   
              </div>

              <div className="user-input-box">
                <label htmlFor="m3Contact">member 3 Contact No:</label>
                <input
                  className="form-control"
                  id="m3Contact"
                  type="text"
                  placeholder="Enter a member 3 Contact No"
                  onChange={(e) => setmMmber3ContactNo(e.target.value)}
                />   
              </div>

              <div className="user-input-box">
                <label htmlFor="m3Email">member 3 Email Address:</label>
                <input
                  className="form-control"
                  id="m3Email"
                  type="text"
                  placeholder="Enter a member 3 Email Address"
                  onChange={(e) => setMember3EmailAddress(e.target.value)}
                />   
              </div>

              <div className="user-input-box">
                <label htmlFor="m4RegNo">member 4 Registration No:</label>
                <input
                  className="form-control"
                  id="m4RegNo"
                  type="text"
                  placeholder="Enter a member 4 Registration No"
                  onChange={(e) => setMember4RegistrationNO(e.target.value)}
                />   
              </div>

              <div className="user-input-box">
                <label htmlFor="m4Name">member 4 Name:</label>
                <input
                  className="form-control"
                  id="m4Name"
                  type="text"
                  placeholder="Enter a member 4 Name"
                  onChange={(e) => setMember4Name(e.target.value)}
                />   
              </div>

              <div className="user-input-box">
                <label htmlFor="m4Contact">member 4 Contact No:</label>
                <input
                  className="form-control"
                  id="m4Contact"
                  type="text"
                  placeholder="Enter a member 4 Contact No"
                  onChange={(e) => setmMmber4ContactNo(e.target.value)}
                />   
              </div>

              <div className="user-input-box">
                <label htmlFor="m4Email">member 4 Email Address:</label>
                <input
                  className="form-control"
                  id="m4Email"
                  type="text"
                  placeholder="Enter a member 4 Email Address"
                  onChange={(e) => setMember4EmailAddress(e.target.value)}
                />   
              </div>

              <div className="user-input-box">
                <label htmlFor="supervisor">Supervisor</label>
                <select id="supervisor"
                onChange={(e) => setSupervisor(e.target.value)}>
                 <option value="">Select Supervisor </option>
                 <option value="supervisor1">supervisor 1</option>
                 <option value="supervisor2">supervisor 2</option>
                 <option value="supervisor3">supervisor 3</option>
                </select>
              </div>

              <div className="user-input-box">
                <label htmlFor="coSupervisor">Co-Supervisor</label>
                <select id="coSupervisor"
                onChange={(e) => setCosupervisor(e.target.value)}>
                 <option value="">Select Supervisor </option>
                 <option value="coSupervisor1">Co-Supervisor 1</option>
                 <option value="coSupervisor2">Co-Supervisor 2</option>
                 <option value="coSupervisor3">Co-Supervisor 3</option>
                </select>
              </div>
            </div>

            <div className="form-submit-btn">
              <input type="submit" value="REGISTER" />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default GroupRegistrationForm;
