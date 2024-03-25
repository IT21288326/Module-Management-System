import React, { useState, useEffect } from "react";
import './updatePresentationPannelComp.scss';
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";

const UpdatePresentationPannel = () => {
  const { id } = useParams();
  const [error, setError] = useState(null);
  const [values, setValues] = useState({
    pannelID: "",
    examiner_1: "",
    examiner_2: "",
    examiner_3: ""
  });

  useEffect(() => {
    axios
      .get(`http://localhost:3001/presentation-pannel/${id}`)
      .then((res) => {
        const { pannelID, examiner_1, examiner_2, examiner_3 } = res.data;
        setValues({
          pannelID,
          examiner_1,
          examiner_2,
          examiner_3
        });
      })
      .catch((err) => {
        setError(err);
      });
  }, [id]);

  const navigate = useNavigate();

  const handleUpdate = (e) => {
    e.preventDefault();
  
    axios
      .put(`http://localhost:3001/presentation-pannel/update/${id}`, values)
      .then((res) => {
        console.log(res);
        Swal.fire(
          "Done!",
          "Panel Details Updated Successfully!",
          "success"
        );
        // navigate("/supplierdash");
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="R_container_">
      <div className="R_form-container_">          
        <form onSubmit={handleUpdate}>
          <div>
            <div className="form-group">
              <label htmlFor="groupNo" className="PannelName">Panel Name</label>
              <input 
                type="text" 
                className="form-control_" 
                id="pannelID"
                placeholder="Enter Panel Name"
                value={values.pannelID}
                onChange={(e) => setValues({...values, pannelID: e.target.value})}
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
                value={values.examiner_1}
                onChange={(e) => setValues({...values, examiner_1: e.target.value})}
                required
                style={{
                  maxWidth: "800px",
                  height: "45px",
                  border: "1px solid #ffb43c"
                }}
              >
                <option value="">Select an Examiner</option>
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
                value={values.examiner_2}
                onChange={(e) => setValues({...values, examiner_2: e.target.value})}
                required
                style={{
                  maxWidth: "800px",
                  height: "45px",
                  border: "1px solid #ffb43c"
                }}
              >
                <option value="">Select an Examiner</option>
                <option value="examiner 1">Kamal</option>
                <option value="examiner 2">Amal</option>
                <option value="examiner 3">Sameera</option>
                {/* Add more options as needed */}
              </select>
            </div>
            <div className="col">
              <label htmlFor="examiner_3">Examiner 03</label>
              <select
                className="form-control_" 
                id="examiner_3"
                value={values.examiner_3}
                onChange={(e) => setValues({...values, examiner_3: e.target.value})}
                required
                style={{
                  maxWidth: "800px",
                  height: "45px",
                  border: "1px solid #ffb43c"
                }}
              >
                <option value="">Select an Examiner</option>
                <option value="examiner 1">Kamal</option>
                <option value="examiner 2">Amal</option>
                <option value="examiner 3">Sameera</option>
                {/* Add more options as needed */}
              </select>
            </div>
          </div> 
          <div className="text-center">
            <button type="submit" className="btn btn-primary" id="R_Button">
              Update Panel
            </button>
          </div>            
        </form>
      </div>
    </div>
  );
};

export default UpdatePresentationPannel;
