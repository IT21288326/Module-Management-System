import React, { useState, useEffect } from "react";
import "./GrpregForm.scss" 




const GroupRegistrationForm = ({onClose}) => {
  return (
    <div className="imesh_grpReg">
      <div className="modal-overlay">
        <div className="modal-content">
          <button className="close-modal-button" onClick={onClose}>&times;</button>
          <h1 className="imesh_grpReg_form-title">Group Registration</h1>
          <form >
            <div className="imesh_grpReg_main-user-info">
              <div className="user-input-box">
                <label htmlFor="batch">Batch</label>
                <input
                  type="text"
                  className="form-control"
                  id="batch"
                  placeholder="Enter a Panel Name"
                //  // value={batch}
                //   onChange={(e) => setbatch(e.target.value)}
                />
              </div>

              <div className="user-input-box">
                <label htmlFor="spec">Specialization</label>
                <input
                  className="form-control"
                  id="spec"
                  type="text"
                  placeholder="Enter a Specialization"
                />                 
              </div>

              <div className="user-input-box">
                <label htmlFor="leaderRegNo">Leader Registration No</label>
                <input
                  className="form-control"
                  id="leaderRegNo"
                  type="text"
                  placeholder="Enter Leader Registration No"
                />
               </div>

              <div className="user-input-box">
                <label htmlFor="leaderName">Leader Name:</label>
                <input
                  className="form-control"
                  id="leaderName"
                  type="text"
                  placeholder="Enter leader Name"
                />                 
              </div>

              <div className="user-input-box">
                <label htmlFor="leaderContact">Leader Contact No:</label>
                <input
                  className="form-control"
                  id="leaderContact"
                  type="text"
                  placeholder="Enter leader Contact No"
                />   
              </div>

              <div className="user-input-box">
                <label htmlFor="leaderemail">Leader Email Address:</label>
                <input
                  className="form-control"
                  id="leaderemail"
                  type="text"
                  placeholder="Enter a leader Email Address"
                />   
              </div>

              <div className="user-input-box">
                <label htmlFor="m1RegNo">Member 1 Registration No:</label>
                <input
                  className="form-control"
                  id="m1RegNo"
                  type="text"
                  placeholder="Enter a Member 1 Registration No"
                />   
              </div>

              <div className="user-input-box">
                <label htmlFor="m1Name">Member 1 Name:</label>
                <input
                  className="form-control"
                  id="m1Name"
                  type="text"
                  placeholder="Enter a Member 1 Name"
                />   
              </div>

              <div className="user-input-box">
                <label htmlFor="m1Contact">Member 1 Contact No:</label>
                <input
                  className="form-control"
                  id="m1Contact"
                  type="text"
                  placeholder="Enter a Member 1 Contact No"
                />   
              </div>

              <div className="user-input-box">
                <label htmlFor="m1Email">Member 1 Email Address:</label>
                <input
                  className="form-control"
                  id="m1Email"
                  type="text"
                  placeholder="Enter a Member 1 Email Address"
                />   
              </div>

              <div className="user-input-box">
                <label htmlFor="m2RegNo">Member 2 Registration No:</label>
                <input
                  className="form-control"
                  id="m2RegNo"
                  type="text"
                  placeholder="Enter a Member 2 Registration No"
                />   
              </div>

              <div className="user-input-box">
                <label htmlFor="m2Name">Member 2 Name:</label>
                <input
                  className="form-control"
                  id="m2Name"
                  type="text"
                  placeholder="Enter a Member 2 Name"
                />   
              </div>

              <div className="user-input-box">
                <label htmlFor="m2Contact">Member 2 Contact No:</label>
                <input
                  className="form-control"
                  id="m2Contact"
                  type="text"
                  placeholder="Enter a Member 2 Contact No"
                />   
              </div>

              <div className="user-input-box">
                <label htmlFor="m2Email">Member 2 Email Address:</label>
                <input
                  className="form-control"
                  id="m2Email"
                  type="text"
                  placeholder="Enter a Member 2 Email Address"
                />   
              </div>

              <div className="user-input-box">
                <label htmlFor="m3RegNo">Member 3 Registration No:</label>
                <input
                  className="form-control"
                  id="m3RegNo"
                  type="text"
                  placeholder="Enter a Member 3 Registration No"
                />   
              </div>

              <div className="user-input-box">
                <label htmlFor="m3Name">Member 3 Name:</label>
                <input
                  className="form-control"
                  id="m3Name"
                  type="text"
                  placeholder="Enter a Member 3 Name"
                />   
              </div>

              <div className="user-input-box">
                <label htmlFor="m3Contact">Member 3 Contact No:</label>
                <input
                  className="form-control"
                  id="m3Contact"
                  type="text"
                  placeholder="Enter a Member 3 Contact No"
                />   
              </div>

              <div className="user-input-box">
                <label htmlFor="m3Email">Member 3 Email Address:</label>
                <input
                  className="form-control"
                  id="m3Email"
                  type="text"
                  placeholder="Enter a Member 3 Email Address"
                />   
              </div>

              <div className="user-input-box">
                <label htmlFor="m4RegNo">Member 4 Registration No:</label>
                <input
                  className="form-control"
                  id="m4RegNo"
                  type="text"
                  placeholder="Enter a Member 4 Registration No"
                />   
              </div>

              <div className="user-input-box">
                <label htmlFor="m4Name">Member 4 Name:</label>
                <input
                  className="form-control"
                  id="m4Name"
                  type="text"
                  placeholder="Enter a Member 4 Name"
                />   
              </div>

              <div className="user-input-box">
                <label htmlFor="m4Contact">Member 4 Contact No:</label>
                <input
                  className="form-control"
                  id="m4Contact"
                  type="text"
                  placeholder="Enter a Member 4 Contact No"
                />   
              </div>

              <div className="user-input-box">
                <label htmlFor="m4Email">Member 4 Email Address:</label>
                <input
                  className="form-control"
                  id="m4Email"
                  type="text"
                  placeholder="Enter a Member 4 Email Address"
                />   
              </div>

              <div className="user-input-box">
                <label htmlFor="supervisor">Supervisor</label>
                <select id="supervisor">
                 <option value="">Select Supervisor </option>
                 <option value="supervisor1">supervisor 1</option>
                 <option value="supervisor2">supervisor 2</option>
                 <option value="supervisor3">supervisor 3</option>
                </select>
              </div>

              <div className="user-input-box">
                <label htmlFor="coSupervisor">Co-Supervisor</label>
                <select id="coSupervisor">
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
