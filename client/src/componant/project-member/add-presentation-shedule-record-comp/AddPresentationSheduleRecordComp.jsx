import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import CancelIcon from '@mui/icons-material/Cancel';
import "./addPresentationSheduleRecordComp.scss";

const AddRecord = ({ onClose, updatePresentationScheduleList }) => {
  const [groupNo, setGroupNo] = useState("");
  const [date, setDate] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [venue, setVenue] = useState("");
  const [presentationType, setPresentationType] = useState("");
  const [examiner_1, setExaminer_1] = useState("");
  const [examiner_2, setExaminer_2] = useState("");
  const [examiner_3, setExaminer_3] = useState("");
  const [examinerOptions, setExaminerOptions] = useState([]);
  const [groupNoOptions, setGroupNoOptions] = useState([]);
  const [presentationShedules, setPresentationShedules] = useState([]);

useEffect(() => {
    const fetchExaminers = async () => {
      try {
        const response = await fetch("http://localhost:3001/api/projectMembers");
        if (response.ok) {
          const data = await response.json();
          setExaminerOptions(data);
        } else {
          throw new Error("Failed to fetch examiners");
        }
      } catch (error) {
        console.error("Error fetching examiners:", error);
      }
    };

    fetchExaminers();
  }, []);

  const handleExaminerChange = (e, setter, otherExaminers) => {
    const selectedExaminer = e.target.value;
    if (!otherExaminers.includes(selectedExaminer)) {
      setter(selectedExaminer);
    } else {
      Swal.fire("Error", "This examiner has already been selected.", "error");
    }
  };

  const renderOptions = (selectedExaminer, otherExaminers) => {
    return examinerOptions.map((option, index) => {
      const disabled = otherExaminers.includes(option) && option !== selectedExaminer;
      const style = disabled ? { color: "gray" } : {};
      return (
        <option key={index} value={option} disabled={disabled} style={style}>
          {option}
        </option>
      );
    });
  };

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

  useEffect(() => {
    const fetchPresentationSchedules = async () => {
      try {
        const response = await fetch("http://localhost:3001/presentation-shedule");
        if (response.ok) {
          const data = await response.json();
          setPresentationShedules(data);
        } else {
          throw new Error("Failed to fetch presentation schedules");
        }
      } catch (error) {
        console.error("Error fetching presentation schedules:", error);
      }
    };

    fetchPresentationSchedules();
  }, []);

  const isGroupNoUsed = (groupNoToCheck) => {
    return presentationShedules.some((schedule) => schedule.groupNo === groupNoToCheck);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const emptyFields = [];
    if (!groupNo.trim()) {
      emptyFields.push("Group Number");
    }
    if (!date.trim()) {
      emptyFields.push("Schedule Date");
    }
    if (!startTime.trim()) {
      emptyFields.push("Starting Time");
    }
    if (!endTime.trim()) {
      emptyFields.push("End Time");
    }
    if (!venue.trim()) {
      emptyFields.push("Venue");
    }
    if (!venue.trim()) {
      emptyFields.push("Presentation Type");
    }
    if (!examiner_1.trim()) {
      emptyFields.push("Examiner 1");
    }
    if (!examiner_2.trim()) {
      emptyFields.push("Examiner 2");
    }
    if (!examiner_3.trim()) {
      emptyFields.push("Examiner 3");
    }
    if (emptyFields.length > 0) {
      emptyFields.forEach((field) => {
        Swal.fire("Error", `${field} is required`, "error");
      });
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
      presentationType,
      examiner_1,
      examiner_2,
      examiner_3,   
    };

    try {
      const response = await fetch("http://localhost:3001/presentation-shedule", {
        method: "POST",
        body: JSON.stringify(presentation_Shedule),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        const json = await response.json();
        if (response.status === 500) {
          Swal.fire("Error", "This Group already exists!", "error");
        } else {
          Swal.fire("Error", json.error || "Something went wrong!", "error");
        }
      } else {
        updatePresentationScheduleList(); // Update presentation schedule list in parent component
        onClose(); // Call the onClose function to close the modal
        Swal.fire("Done", "Record added successfully!", "success");
      }
    } catch (error) {
      console.error("Error adding record:", error);
      Swal.fire("Error", "Something went wrong!", "error");
    }
  };

  return (
    <div className="Russa_add_pr_shd">
      <div className="modal-overlay">
        <div className="modal-content">
          <button className="close-modal-button" onClick={onClose}>
            <CancelIcon />
          </button>
          <h1 className="Russa_add_pr_shd_form-title">Add New Shedule Record</h1>
          <form onSubmit={handleSubmit}>
            <div className="Russa_add_pr_shd_main-user-info">
              <div className="user-input-box">
                <label htmlFor="groupNo">Group Number</label>
                <select
                  id="groupNo"
                  value={groupNo}
                  onChange={(e) => setGroupNo(e.target.value)}
                >
                  <option value="">Select a group No</option>
                  {groupNoOptions.map((option, index) => (
                    <option
                      key={index}
                      value={option}
                      disabled={isGroupNoUsed(option)}
                      style={isGroupNoUsed(option) ? { color: "gray" } : {}}
                    >
                      {option}
                    </option>
                  ))}
                </select>
              </div>

              <div className="user-input-box">
                <label htmlFor="date">Schedule Date</label>
                <input
                  type="date"
                  id="date"
                  placeholder="Enter a date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  min={new Date().toISOString().split("T")[0]}
                />
              </div>

              <div className="user-input-box">
                <label htmlFor="startTime">Starting Time</label>
                <input
                  type="text"
                  id="startTime"
                  placeholder="Enter starting time (Hours:Minutes)"
                  value={startTime}
                  onChange={(e) => setStartTime(e.target.value)}
                />
              </div>

              <div className="user-input-box">
                <label htmlFor="endTime">End Time</label>
                <input
                  type="text"
                  id="endTime"
                  placeholder="Enter ending time (Hours:Minutes)"
                  value={endTime}
                  onChange={(e) => setEndTime(e.target.value)}
                />
              </div>

              <div className="user-input-box">
                <label htmlFor="venue">Venue</label>
                <select
                  id="venue"
                  value={venue}
                  onChange={(e) => setVenue(e.target.value)}
                >
                  <option style={{ color: "white" }} value="">
                    Choose a Venue
                  </option>
                  <option value="">Select a venue</option>
                  <option value="Venue 1">Venue 1</option>
                  <option value="Venue 2">Venue 2</option>
                  <option value="Venue 3">Venue 3</option>
                  <option value="Venue 4">Venue 4</option>
                  <option value="Venue 5">Venue 5</option>
                  <option value="Venue 6">Venue 6</option>
                  <option value="Venue 7">Venue 7</option>
                  <option value="Venue 8">Venue 8</option>
                  <option value="Venue 9">Venue 9</option>
                  <option value="Venue 10">Venue 10</option>
                  <option value="Venue 11">Venue 11</option>
                  <option value="Venue 12">Venue 12</option>
                  <option value="Venue 13">Venue 13</option>
                  <option value="Venue 14">Venue 14</option>
                  <option value="Venue 15">Venue 15</option>
                  <option value="Venue 16">Venue 16</option>
                  <option value="Venue 17">Venue 17</option>
                  <option value="Venue 18">Venue 18</option>
                  <option value="Venue 19">Venue 19</option>
                  <option value="Venue 20">Venue 20</option>
                  {/* Add more options as needed */}
                </select>
              </div>

              <div className="user-input-box">
                <label htmlFor="presentationType">Presentation Type</label>
                <select
                  className="form-control"
                  id="presentationType"
                  value={presentationType}
                  onChange={(e) => setPresentationType(e.target.value)}
                >
                  <option value="">Choose a Presentation Type</option>
                  <option value="Proposal">Proposal Presentation</option>
                  <option value="Progress 1">Progress 1 Presentation</option>
                  <option value="Progress 2">Progress 2 Presentation</option>
                  <option value="Final">Final Presentation</option>
                  {/* Add more options as needed */}
                </select>
              </div>
                
              <div className="user-input-box">
                <label htmlFor="examiner_1">Examiner 1</label>
                <select
                  className="form-control"
                  id="examiner_1"
                  value={examiner_1}
                  onChange={(e) => handleExaminerChange(e, setExaminer_1, [examiner_2, examiner_3])}
                >
                  <option value="">Select an examiner</option>
                  {renderOptions(examiner_1, [examiner_2, examiner_3])}
                </select>
              </div>

              <div className="user-input-box">
                <label htmlFor="examiner_2">Examiner 2</label>
                <select
                  className="form-control"
                  id="examiner_2"
                  value={examiner_2}
                  onChange={(e) => handleExaminerChange(e, setExaminer_2, [examiner_1, examiner_3])}
                >
                  <option value="">Select an examiner</option>
                  {renderOptions(examiner_2, [examiner_1, examiner_3])}
                </select>
              </div>

              <div className="user-input-box">
                <label htmlFor="examiner_3">Examiner 3</label>
                <select
                  className="form-control"
                  id="examiner_3"
                  value={examiner_3}
                  onChange={(e) => handleExaminerChange(e, setExaminer_3, [examiner_1, examiner_2])}
                >
                  <option value="">Select an examiner</option>
                  {renderOptions(examiner_3, [examiner_1, examiner_2])}
                </select>
              </div>
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

export default AddRecord;

