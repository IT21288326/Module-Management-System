import React, { useState, useEffect } from "react";
import './updatepresetationSheduleComp.scss';
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";

const UpdatePresentationShedule = () => {
  const { id } = useParams();
  const [values, setValues] = useState({
    groupNo:"",
    date: new Date().toISOString().split('T')[0], // Set initial date to current date
    time:"",
    venue:"",
  });
  const [prevDateRecord, setPrevDateRecord] = useState(null);

  useEffect(() => {
    axios
      .get(`http://localhost:3001/presentation-shedule/${id}`)
      .then((res) => {
        setValues({
          groupNo: res.data.groupNo,
          date: res.data.date,
          time: res.data.time,
          venue: res.data.venue,
        });

        // Fetch previous record of the date
        axios
          .get(`http://localhost:3001/presentation-shedule/previousRecord/${res.data.date}`)
          .then((prevRes) => {
            setPrevDateRecord(prevRes.data);
          })
          .catch((err) => console.log(err));
      })
      .catch((err) => console.log(err));
  }, []);

  const navigate = useNavigate();
  const handleUpdate = (e) => {
    e.preventDefault();
  
    axios
      .put(`http://localhost:3001/presentation-shedule/update/${id}`, values)
      .then((res) => {
        console.log(res);
        Swal.fire(
          "Done!",
          "Presentation Shedule Details Updated Successfully!",
          "success"
        );
        navigate("/presentation-shedule");
      })
      .catch((err) => console.log(err));
  };
  
  return (
    <>
      <div className="R_container_update">
        <div className="R_form-container_update">
          <form onSubmit={handleUpdate}>
            <div>
              <div className="form-group">
                <label htmlFor="groupNo">Group No</label>
                <input
                  type="text"
                  className="form-control"
                  id="groupNo"
                  placeholder="Enter a group number"
                  value={values.groupNo}
                  onChange={(e) => setValues({...values, groupNo: e.target.value})}
                  required
                  disabled
                />
              </div>

              <div className="form-group">
                <label htmlFor="date">Date</label>
                <input
                  type="date"
                  className="form-control"
                  id="date"
                  value={values.date}
                  onChange={(e) => setValues({...values, date: e.target.value})}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="time">Time</label>
                <input
                  type="text"
                  className="form-control"
                  id="time"
                  placeholder="Enter a time (Hours:Minutes)"
                  value={values.time}
                  onChange={(e) => setValues({...values, time: e.target.value})}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="venue">Venue</label>
                <select
                  className="form-control"
                  id="venue"
                  value={values.venue}
                  onChange={(e) => setValues({...values, venue: e.target.value})}
                  required
                >
                  <option value="">Select a venue</option>
                  <option value="Venue 1">Venue 1</option>
                  <option value="Venue 2">Venue 2</option>
                  <option value="Venue 3">Venue 3</option>
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
    </>
  );
};

export default UpdatePresentationShedule;
