import React, { useState, useEffect } from "react";
import '../add-presentation-shedule-record-comp/AddPresentationSheduleRecordComp.scss'; 

import axios from "axios";
import { useParams } from "react-router-dom";
import Swal from "sweetalert2";

const UpdatePresentationPannel = () => {
  const { id } = useParams();
  const [values, setValues] = useState({
    pannelID:"",
    examiner_1:"",
    // examiner_2:"",
    // examiner_3:"",
  });
  const [staffMemberOptions, setStaffMemberOptions] = useState([]);

  useEffect(() => {
    axios
      .get(`http://localhost:3001/presentation-pannel/${id}`)
      .then((res) => {
        setValues({
          pannelID: res.data.pannelID,
          examiner_1: res.data.examiner_1,
        //   examiner_2: res.data.examiner_2,
        //   examiner_3: res.data.examiner_3,
        });
      })
      .catch((err) => console.log(err));

    axios
      .get("http://localhost:3001/api/projectMembers")
      .then((res) => {
        const staffMembers = res.data;
        setStaffMemberOptions(staffMembers);
      })
      .catch((err) => console.log(err));
  }, [id]);

  const handleUpdate = (e) => {
    e.preventDefault();
  
    axios
      .put(`http://localhost:3001/presentation-pannel/update/${id}`, values)
      .then((res) => {
        console.log(res);
        Swal.fire(
          "Done!",
          "Presentation Pannel Updated Successfully!",
          "success"
        );
      })
      .catch((err) => console.log(err));
  };
  
  return (
    <div className="R_container_update">
      <div className="R_form-container_update">
        <form onSubmit={handleUpdate}>
          <div>
            <div className="form-group">
              <label htmlFor="pannelID">Panel Name</label>
              <input
                type="text"
                className="form-control"
                id="pannelID"
                placeholder="Enter a Panel Name"
                disabled
                value={values.pannelID}
                onChange={(e) => setValues({...values, pannelID: e.target.value})}
                style={{
                  maxWidth: "800px",
                  height: "45px",
                  border: "1px solid #ffb43c"
                }}
              />
            </div>

            <div className="form-group">
              <label htmlFor="examiner_1">Examiner 1</label>
              <select
                className="form-control"
                id="examiner_1"
                value={values.examiner_1}
                onChange={(e) => setValues({...values, examiner_1: e.target.value})}
                style={{
                  maxWidth: "800px",
                  height: "45px",
                  border: "1px solid #ffb43c"
                }}
              >
                <option value="">Select an examiner</option>
                {staffMemberOptions.map((option, index) => (
                  <option key={index} value={option}>{option}</option>
                ))}
              </select>
            </div>
          </div>
          <div className="text-center">
            <button type="submit" className="btn btn-primary" id="R_Button">
              Update Record
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdatePresentationPannel;


