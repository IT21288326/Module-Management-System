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
  const [presentationSchedules, setPresentationSchedules] = useState([]);
  const [duration, setDuration] = useState(10); // Default duration value

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


  const handleStartTimeChange = (e) => {
    const selectedTime = e.target.value;
    const selectedHour = parseInt(selectedTime.split(':')[0]);
    const selectedMinute = parseInt(selectedTime.split(':')[1]);
  
    // Convert selected time to total minutes since midnight for comparison
    const selectedTimeInMinutes = selectedHour * 60 + selectedMinute;
    const minTimeInMinutes = 7 * 60; // 07:00 AM in minutes (7 * 60)
    const maxTimeInMinutes = 20 * 60; // 08:00 PM in minutes (20 * 60)
  
    if (selectedTimeInMinutes < minTimeInMinutes || selectedTimeInMinutes > maxTimeInMinutes) {
      // Reset startTime to the nearest valid time within the allowed range
      const nearestValidTimeInMinutes = Math.max(minTimeInMinutes, Math.min(selectedTimeInMinutes, maxTimeInMinutes));
      const nearestValidHour = Math.floor(nearestValidTimeInMinutes / 60);
      const nearestValidMinute = nearestValidTimeInMinutes % 60;
      const formattedNearestValidTime = `${nearestValidHour.toString().padStart(2, '0')}:${nearestValidMinute.toString().padStart(2, '0')}`;
      
      setStartTime(formattedNearestValidTime); // Update startTime state with the nearest valid time
    } else {
      // Set the selected time if it's within the allowed range
      setStartTime(selectedTime);
    }
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
          setPresentationSchedules(data);
        } else {
          throw new Error("Failed to fetch presentation schedules");
        }
      } catch (error) {
        console.error("Error fetching presentation schedules:", error);
      }
    };

    fetchPresentationSchedules();
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

  const isGroupNoUsed = (groupNoToCheck) => {
    return presentationSchedules.some((schedule) => schedule.groupNo === groupNoToCheck);
  };

  const isExaminerAvailable = (examiner, date, startTime, endTime) => {
    return presentationSchedules.some(schedule => {
      if (
        schedule.examiner_1 === examiner ||
        schedule.examiner_2 === examiner ||
        schedule.examiner_3 === examiner
      ) {
        const scheduleStartTime = new Date(`${schedule.date}T${schedule.startTime}`);
        const scheduleEndTime = new Date(`${schedule.date}T${schedule.endTime}`);
        const checkStartTime = new Date(`${date}T${startTime}`);
        const checkEndTime = new Date(`${date}T${endTime}`);

        if (
          (checkStartTime >= scheduleStartTime && checkStartTime < scheduleEndTime) ||
          (checkEndTime > scheduleStartTime && checkEndTime <= scheduleEndTime) ||
          (checkStartTime <= scheduleStartTime && checkEndTime >= scheduleEndTime)
        ) {
          return true; // Examiner is not available during this time
        }
      }
      return false;
    });
  };

  const handleDurationChange = (e) => {
    setDuration(parseInt(e.target.value));
  };

  const calculateEndTime = () => {
    if (startTime) {
      const [hours, minutes] = startTime.split(':').map(Number);
      const startTimeInMinutes = hours * 60 + minutes;
      const endTimeInMinutes = startTimeInMinutes + duration;
      
      const newHours = Math.floor(endTimeInMinutes / 60);
      const newMinutes = endTimeInMinutes % 60;
      
      const formattedEndTime = `${newHours.toString().padStart(2, '0')}:${newMinutes.toString().padStart(2, '0')}`;
      setEndTime(formattedEndTime);
    }
  };

  useEffect(() => {
    calculateEndTime();
  }, [startTime, duration]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if endTime is after startTime
    if (startTime >= endTime) {
      Swal.fire("Error", "End Time must be after Start Time", "error");
      return;
    }

    // Check for empty fields
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
    if (!presentationType.trim()) {
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

    // Check examiner availability
    const busyExaminers = [];
    if (isExaminerAvailable(examiner_1, date, startTime, endTime)) {
      busyExaminers.push(examiner_1);
    }
    if (isExaminerAvailable(examiner_2, date, startTime, endTime)) {
      busyExaminers.push(examiner_2);
    }
    if (isExaminerAvailable(examiner_3, date, startTime, endTime)) {
      busyExaminers.push(examiner_3);
    }

    if (busyExaminers.length > 0) {
      Swal.fire(
        "Time Clashed",
        `${busyExaminers.join(", ")} is/are already assigned to different presentation during this specified time on entered date.`,
        "error"
      );
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
        updatePresentationScheduleList();
        onClose();
        Swal.fire("Done", "Record added successfully!", "success");
      }
    } catch (error) {
      console.error("Error adding record:", error);
      Swal.fire("Error", "Something went wrong!", "error");
    }
  };

  return (
    <div className="Russa_add_pr_shd">
      <div className="Russa_modal-overlay">
        <div className="Russa_modal-content">
          <button className="Russa_close-modal-button" onClick={onClose}>
            <CancelIcon />
          </button>
          <h1 className="Russa_add_pr_shd_form-title">Add New Schedule Record</h1>
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
                  type="time"
                  id="startTime"
                  placeholder="Enter starting time (Hours:Minutes)"
                  value={startTime}
                  onChange={handleStartTimeChange}
                  min="07:00"
                  max="20:00"
                />
              </div>


              <div className="user-input-box">
                <label htmlFor="duration">Duration (minutes)</label>
                <select
                  id="duration"
                  value={duration}
                  onChange={handleDurationChange}
                >
                  <option value={10}>10 minutes</option>
                  <option value={15}>15 minutes</option>
                  <option value={20}>20 minutes</option>
                  <option value={30}>30 minutes</option>
                  <option value={40}>40 minutes</option>
                  <option value={50}>50 minutes</option>
                  <option value={60}>60 minutes</option>
                </select>
              </div>

              <div className="user-input-box">
                <label htmlFor="endTime">End Time</label>
                <input
                  type="time"
                  id="endTime"
                  value={endTime}
                  disabled // Disable end time field
                />
              </div>

              <div className="user-input-box">
                <label htmlFor="venue">Venue</label>
                <select
                  id="venue"
                  value={venue}
                  onChange={(e) => setVenue(e.target.value)}
                >
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
                  {/* Add more venue options as needed */}
                </select>
              </div>

              <div className="user-input-box">
                <label htmlFor="presentationType">Presentation Type</label>
                <select
                  id="presentationType"
                  value={presentationType}
                  onChange={(e) => setPresentationType(e.target.value)}
                >
                  <option value="">Choose a Presentation Type</option>
                  <option value="Proposal">Proposal Presentation</option>
                  <option value="Progress 1">Progress 1 Presentation</option>
                  <option value="Progress 2">Progress 2 Presentation</option>
                  <option value="Final">Final Presentation</option>
                  {/* Add more presentation type options as needed */}
                </select>
              </div>

              <div className="user-input-box">
                <label htmlFor="examiner_1">Examiner 1</label>
                <select
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

