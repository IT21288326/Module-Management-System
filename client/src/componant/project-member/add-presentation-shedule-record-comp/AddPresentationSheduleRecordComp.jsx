import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import "./AddPresentationSheduleRecordComp.scss";

const AddRecord = () => {
  const [groupNo, setGroupNo] = useState("");
  const [date, setDate] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [venue, setVenue] = useState("");
  const [pannelID, setPannelID] = useState("");
  const [pannelIDOptions, setPannelIDOptions] = useState([]);
  const [groupNoOptions, setGroupNoOptions] = useState([]);
  const [error, setError] = useState(null);
  const [emptyFields, setEmptyFields] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPanelIDs = async () => {
      try {
        const response = await fetch("http://localhost:3001/pannel-Ids");
        
        if (response.ok) {
          const data = await response.json();
          setPannelIDOptions(data);
        } else {
          throw new Error("Failed to fetch panel IDs");
        }
      } catch (error) {
        console.error("Error fetching panel IDs:", error);
      }
    };

    fetchPanelIDs();
  }, []);

  useEffect(() => {
    const fetchGroupNumbers = async () => {
      try {
        const response = await fetch("http://localhost:3001/groupNumbers");
        
        if (response.ok) {
          const data = await response.json();
          setGroupNoOptions(data);
        } else {
          throw new Error("Failed to fetch group numbers");
        }
      } catch (error) {
        console.error("Error fetching group numbers:", error);
      }
    };

    fetchGroupNumbers();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const emptyFields = [];
    if (!groupNo.trim()) {
      emptyFields.push("groupNo");
    }
    if (!date.trim()) {
      emptyFields.push("date");
    }
    if (!startTime.trim()) {
      emptyFields.push("startTime");
    }
    if (!endTime.trim()) {
      emptyFields.push("endTime");
    }
    if (!venue.trim()) {
      emptyFields.push("venue");
    }
    if (!pannelID.trim()) {
      emptyFields.push("pannelID");
    }

    if (emptyFields.length > 0) {
      setEmptyFields(emptyFields);
      return;
    }

    const timeRegex = /^([01]\d|2[0-3]):([0-5]\d)$/;
    if (!timeRegex.test(startTime) || !timeRegex.test(endTime)) {
      Swal.fire("Error", "Please enter a valid time (format: HH:MM)", "error");
      return;
    }

    const presentation_Shedule = {
      groupNo,
      date,
      startTime,
      endTime,
      venue,
      pannelID,
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
      setStartTime("");
      setEndTime("");
      setVenue("");
      setPannelID("");
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
              <label htmlFor="groupNo">Group Number</label>
              <select
                className="form-control"
                id="groupNo"
                value={groupNo}
                onChange={(e) => setGroupNo(e.target.value)}
                required
                style={{
                  maxWidth: "800px",
                  height: "45px",
                  border: "1px solid #ffb43c"
                }}
              >
                <option value="">Select a group No</option>
                {groupNoOptions.map((option, index) => (
                  <option key={index} value={option}>{option}</option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="date">Shedule Date</label>
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
              <label htmlFor="startTime">Starting Time</label>
              <input
                type="text"
                className="form-control"
                id="startTime"
                placeholder="Enter starting time (Hours:Minutes)"
                value={startTime}
                onChange={(e) => setStartTime(e.target.value)}
                required
                style={{
                  maxWidth: "800px",
                  height: "45px",
                  border: "1px solid #ffb43c"
                }}
              />
            </div>

            <div className="form-group">
              <label htmlFor="endTime">End Time</label>
              <input
                type="text"
                className="form-control"
                id="endTime"
                placeholder="Enter ending time (Hours:Minutes)"
                value={endTime}
                onChange={(e) => setEndTime(e.target.value)}
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
              <label htmlFor="pannelID">Panel ID</label>
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
                <option value="">Select a Panel ID</option>
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



