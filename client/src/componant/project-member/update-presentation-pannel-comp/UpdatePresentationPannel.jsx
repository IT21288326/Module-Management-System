import React, { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import "./updatePresentationPannel.scss";

const UpdatePresentationPannel = ({ id, onClose }) => {
  const [values, setValues] = useState({
    pannelID: "",
    examiner_1: "",
    examiner_2: "",
    examiner_3: "",
  });
  const [staffMemberOptions, setStaffMemberOptions] = useState([]);
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [panelResponse, staffResponse] = await Promise.all([
          axios.get(`http://localhost:3001/presentation-pannel/${id}`),
          axios.get("http://localhost:3001/api/projectMembers"),
        ]);
        const panelData = panelResponse.data;
        const staffData = staffResponse.data;
        setValues({
          pannelID: panelData.pannelID,
          examiner_2: panelData.examiner_2,
          examiner_3: panelData.examiner_3,
        });
        setStaffMemberOptions(staffData);
        if (panelData.examiner_1) {
          setValues(prevValues => ({
            ...prevValues,
            examiner_1: panelData.examiner_1
          }));
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [id]);

  const handleUpdate = async (e) => {
    e.preventDefault();

    // Check if any examiner dropdown has not been selected
    if (!values.examiner_1 || !values.examiner_2 || !values.examiner_3) {
      Swal.fire("Error", "Please select an examiner for all fields!", "error");
      return;
    }

    try {
      const response = await axios.put(`http://localhost:3001/presentation-pannel/update/${id}`, values);
      if (response.status === 200) {
        Swal.fire("Done!", "Presentation Panel Updated Successfully!", "success").then((result) => {
          if (result.isConfirmed) {
            onClose();
          }
        });
      } else {
        throw new Error("Failed to update panel");
      }
    } catch (error) {
      console.error("Error updating panel:", error);
      Swal.fire("Error!", "Failed to update Presentation Panel", "error");
    }
  };

  return (
    <div className="Russa_update_pr_pannel">
      <div className="modal-overlay">
        <div className="modal-content">
          <button className="close-modal-button" onClick={onClose}>
            &times;
          </button>
          <h1 className="Russa_update_pr_pannel_form-title">Update Presentation Panel</h1>
          <form onSubmit={handleUpdate}>
            <div className="Russa_update_pr_pannel_main-user-info">
              <div className="user-input-box">
                <label htmlFor="pannelID">Panel Name</label>
                <input
                  type="text"
                  className="form-control"
                  id="pannelID"
                  placeholder="Enter a Panel Name"
                  value={values.pannelID}
                  onChange={(e) => setValues({ ...values, pannelID: e.target.value })}
                  disabled
                />
              </div>

              <div className="user-input-box">
                <label htmlFor="examiner_1">Examiner 1</label>
                <select
                  className="form-control"
                  id="examiner_1"
                  value={values.examiner_1}
                  onChange={(e) => setValues({ ...values, examiner_1: e.target.value })}
                >
                  <option value="">Choose examiner</option>
                  {staffMemberOptions.map((option) => (
                    <option
                      key={option}
                      value={option}
                      disabled={values.examiner_2 === option || values.examiner_3 === option}
                      style={{ color: values.examiner_2 === option || values.examiner_3 === option ? "gray" : "black" }}
                    >
                      {option}
                    </option>
                  ))}
                </select>
              </div>

              <div className="user-input-box">
                <label htmlFor="examiner_2">Examiner 2</label>
                <select
                  className="form-control"
                  id="examiner_2"
                  value={values.examiner_2}
                  onChange={(e) => setValues({ ...values, examiner_2: e.target.value })}
                >
                  <option value="">Choose examiner</option>
                  {staffMemberOptions.map((option) => (
                    <option
                      key={option}
                      value={option}
                      disabled={values.examiner_1 === option || values.examiner_3 === option}
                      style={{ color: values.examiner_1 === option || values.examiner_3 === option ? "gray" : "black" }}
                    >
                      {option}
                    </option>
                  ))}
                </select>
              </div>

              <div className="user-input-box">
                <label htmlFor="examiner_3">Examiner 3</label>
                <select
                  className="form-control"
                  id="examiner_3"
                  value={values.examiner_3}
                  onChange={(e) => setValues({ ...values, examiner_3: e.target.value })}
                >
                  <option value="">Choose examiner</option>
                  {staffMemberOptions.map((option) => (
                    <option
                      key={option}
                      value={option}
                      disabled={values.examiner_1 === option || values.examiner_2 === option}
                      style={{ color: values.examiner_1 === option || values.examiner_2 === option ? "gray" : "black" }}
                    >
                      {option}
                    </option>
                  ))}
                </select>
              </div>

            </div>
            <div className="form-submit-btn">
              <input type="submit" value="Update Panel Details" />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UpdatePresentationPannel;
