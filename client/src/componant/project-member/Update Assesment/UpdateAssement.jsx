import React, { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import CancelIcon from "@mui/icons-material/Cancel";
import "./updateAssement.scss";

const UpdateAssesment = ({ onClose, AssesmentId, onSuccess }) => {
  const [values, setValues] = useState({
    assement_Name:"",
    description: "",
    assement_type: "",
    dateAdded: "", // Initialize dateAdded state
  });

  useEffect(() => {
    axios
      .get(`http://localhost:3001/assesment/${AssesmentId}`)
      .then((res) => {
        const { assement_Name, description, assement_type, dateAdded} = res.data;
        setValues({
          assement_Name,
          description,
          assement_type,
          dateAdded: dateAdded ? new Date(dateAdded).toISOString().split('T')[0] : '', 
        });
      })
      .catch((err) => {
        console.log(err);
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Failed to fetch Assesment details!",
          footer: `Error: ${err}`,
        });
      });
  }, [AssesmentId]);

  // Function to handle form submission
  const handleUpdate = (e) => {
    e.preventDefault();

    axios
      .put(`http://localhost:3001/assesment/${AssesmentId}`, values)
      .then((res) => {
        console.log(res);
        Swal.fire(
          "Done!",
          "Assesment Details Updated Successfully!",
          "success"
        );
        onSuccess(); // Trigger the callback to reload data
        onClose(); // Close the modal after successful update
      })
      .catch((err) => {
        console.log(err);
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Failed to update Assesment details!",
          footer: `Error: ${err}`,
        });
      });
  };

  return (
    <div className="Russa_update_assesment">
      <div className="Russa_modal-overlay">
        <div className="Russa_modal-content">
          <button className="Russa_close-modal-button" onClick={onClose}>
            <CancelIcon />
          </button>
          <h1 className="Russa_add_pr_shd_form-title">Add New Schedule Record</h1>
          <form onSubmit={handleUpdate}>
              <div className="user-input-box">
                <label htmlFor="assessmentName">Assessment Name</label>
                <input
                  id="assessmentName"
                  type="text" 
                  className="form-control" 
                  value={values.assement_Name} 
                  onChange={(e) =>
                    setValues({ ...values, assement_Name: e.target.value })
                  } 
                  required
                />
              </div>
              
              <div className="user-input-box">
                <label>Assessment Type:</label>
                <input 
                  type="text" 
                  className="form-control" 
                  value={values.assement_type} 
                  onChange={(e) =>
                    setValues({ ...values, assement_type: e.target.value })
                  } 
                  required 
                  readOnly
                />
              </div>

              <div className="user-input-box">
                <label>Updated Date:</label>
                <input 
                  type="date" 
                  className="form-control" 
                  value={values.dateAdded} 
                  onChange={(e) =>
                    setValues({ ...values, dateAdded: e.target.value })
                  } 
                  readOnly // Set the input field to read-only
                  required 
                />
              </div>

              <div className="user-input-box">
                <label>Description:</label>
                <input 
                  type='textarea'
                  className="form-control" 
                  value={values.description} 
                  onChange={(e) =>
                    setValues({ ...values, description: e.target.value })
                  }
                  required 
                />
              </div>

            <div className="form-submit-btn">
              <input type="submit" value="Save Record" />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UpdateAssesment;
