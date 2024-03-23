import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import "./AddPresentationSheduleRecordComp.scss";

const AddRecord = () => {
  const [groupNo, setGroupNo] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [venue, setVenue] = useState("");
  const [pannelID, setPannelID] = useState(""); // State for pannelID
  const [pannelIDOptions, setPannelIDOptions] = useState([]); // State to store pannelID options
  const [error, setError] = useState(null);
  const [emptyFields, setEmptyFields] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch pannelID options from backend
    const fetchPannelIDs = async () => {
      try {
        const response = await fetch("http://localhost:3001/presentation-pannel");
        if (response.ok) {
          const data = await response.json();
          const pannelIDs = data.map(item => item.pannelID);
          setPannelIDOptions(pannelIDs);
        } else {
          throw new Error("Failed to fetch pannelIDs");
        }
      } catch (error) {
        console.error("Error fetching pannelIDs:", error);
        // Handle error if needed
      }
    };

    fetchPannelIDs();
  }, []); // Empty dependency array ensures this effect runs only once on component mount

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
    if (!pannelID.trim()) { // Validate pannelID
      emptyFields.push("pannelID");
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
      pannelID, // Include pannelID in the data to be sent to backend
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
      setPannelID(""); // Reset pannelID after successful submission
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
                  maxWidth: "800px",
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
                }}
              >
                <option value="">Select a venue</option>
                <option value="Venue 1">Venue 1</option>
                <option value="Venue 2">Venue 2</option>
                <option value="Venue 3">Venue 3</option>
                {/* Add more options as needed */}
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="pannelID">Pannel ID</label>
              <select
                className="form-control"
                id="pannelID"
                value={pannelID}
                onChange={(e) => setPannelID(e.target.value)}
                required
                style={{
                  maxWidth: "800px",
                  height: "45px",
                  border: "1px solid #ffb43c"
                }}
              >
                <option value="">Select a Pannel ID</option>
                {pannelIDOptions.map((option, index) => (
                  <option key={index} value={option}>{option}</option>
                ))}
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

