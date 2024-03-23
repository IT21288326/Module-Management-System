import React, { useState } from "react";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import "./AddPresentationSheduleRecordComp.scss";

const AddRecord = () => {
  const [groupNo, setGroupNo] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [venue, setVenue] = useState("");
  const [error, setError] = useState(null);
  const [emptyFields, setEmptyFields] = useState([]);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const emptyFields = [];
    if (!groupNo.trim()) {
      emptyFields.push("groupNo");
    }
    if (!date.trim()) {
      emptyFields.push("date");
    }
    if (!time.trim()) {
      emptyFields.push("time");
    }
    if (!venue.trim()) {
      emptyFields.push("venue");
    }

    if (emptyFields.length > 0) {
      setEmptyFields(emptyFields);
      return;
    }

    // Validate time format (HH:MM)
    const timeRegex = /^([01]\d|2[0-3]):([0-5]\d)$/;
    if (!timeRegex.test(time)) {
      Swal.fire("Error", "Please enter a valid time (format: HH:MM)", "error");
      return;
    }

    const presentation_Shedule = {
      groupNo,
      date,
      time,
      venue,
    };

    const response = await fetch("http://localhost:3001/presentation-shedule", {
  method: "POST",
  body: JSON.stringify(presentation_Shedule),
  headers: {
    "Content-Type": "application/json",
  }
});


    const json = await response.json();

    if (!response.ok) {
      if (response.status === 500) {
        Swal.fire("Error", "This Group already exists!", "error");
      } else {
        setError(json.error);
      }
    } else {
      setGroupNo("");
      setDate("");
      setTime("");
      setVenue("");
      Swal.fire("Done", "record added successfully!", "success");
      navigate("/projMemberSideBar");
    }
  };

  return (
    <div className="R_container">
      <div className="R_form-container">
        <form onSubmit={handleSubmit}>
        <div>
          <div className="form-group">
            <label htmlFor="groupNo">Group No</label>
            <input
              type="text"
              className="form-control"
              id="groupNo"
              placeholder="Enter a group number"
              value={groupNo}
              onChange={(e) => setGroupNo(e.target.value)}
              required
              style={{ 
                maxWidth: "800px", 
                height: "45px",
                border: "1px solid #ffb43c"
              }} 
            />
          </div>

          <div className="form-group">
            <label htmlFor="date">Date</label>
            <input
              type="date"
              className="form-control"
              id="date"
              placeholder="Enter a date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              required
              min={new Date().toISOString().split('T')[0]}
              style={{ 
                maxWidth: "800px" , 
                height: "45px",
                border: "1px solid #ffb43c" 
              }} 
            />
          </div>

          <div className="form-group">
            <label htmlFor="time">Time</label>
            <input
              type="text"
              className="form-control"
              id="time"
              placeholder="Enter a time (Hours:Minutes)"
              value={time}
              onChange={(e) => setTime(e.target.value)}
              required
              style={{
                maxWidth: "800px",
                height: "45px",
                border: "1px solid #ffb43c"
              }} 
            />
          </div>

          <div className="form-group">
            <label htmlFor="venue">Venue</label>
            <select
              className="form-control"
              id="venue"
              value={venue}
              onChange={(e) => setVenue(e.target.value)}
              required
              style={{ 
                maxWidth: "800px",
                height: "45px",
                border: "1px solid #ffb43c"
              }} // Adjust the width as needed
            >
              <option value="">Select a venue</option>
              <option value="Venue 1">Venue 1</option>
              <option value="Venue 2">Venue 2</option>
              <option value="Venue 3">Venue 3</option>
              {/* Add more options as needed */}
            </select>
          </div>

        </div>
          <div className="text-center">
            <button type="submit" className="btn btn-primary" id="R_Button">
              Submit Record
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddRecord;
