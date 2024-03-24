import React, { useState, useEffect } from "react";

const FormPart = ({ panelID, setPanelId, examiners, setExaminers, handleSubmit }) => {
  const [projectMembers, setProjectMembers] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3001/api/projectMembers")
      .then(response => response.json())
      .then(data => {
        console.log("Fetched project members:", data);
        setProjectMembers(data);
      })
      .catch(error => console.error("Error fetching project members:", error));
  }, []);

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setExaminers(prevState => ({
      ...prevState,
      [id]: value
    }));
  };

  return (
    <div>
      <div className="form-group">
        <label htmlFor="groupNo" className="PanelName">Panel Name</label>
        <input 
          type="text" 
          className="form-control_" 
          id="panelID"
          placeholder="Enter Panel Name"
          value={panelID}
          onChange={(e) => setPanelId(e.target.value)}
          required
          style={{
            maxWidth: "800px",
            height: "45px",
            border: "1px solid #ffb43c",
          }}
        />
      </div>
      <div className="row">
        {projectMembers.map((member, index) => (
          <div className="col" key={index}>
            <label htmlFor={`examiner_${index + 1}`}>Examiner {index + 1}</label>
            <select
              className="form-control_" 
              id={`examiner_${index + 1}`}
              value={examiners[`examiner_${index + 1}`]}
              onChange={handleInputChange}
              required
              style={{
                maxWidth: "800px",
                height: "45px",
                border: "1px solid #ffb43c"
              }}
            >
              <option value="">Select an Examiner</option>
              {projectMembers.map((member, index) => (
                <option key={index} value={member.name}>{member.name}</option>
              ))}
            </select>
          </div>
        ))}
      </div> 
      <div className="text-center">
        <button type="submit" className="btn btn-primary" id="R_Button" onClick={handleSubmit}>
          Create Panel
        </button>
      </div> 
    </div>
  );
};

export default FormPart;

