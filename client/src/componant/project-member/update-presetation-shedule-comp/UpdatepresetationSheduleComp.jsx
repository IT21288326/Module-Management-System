import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import './updatepresetationSheduleComp.scss'; // Re-import CSS file
import CancelIcon from '@mui/icons-material/Cancel';
import axios from "axios";

const UpdatePresentationShedule = ({ id, onClose, updatePresentationScheduleList }) => {
  const [values, setValues] = useState({
    groupNo: "",
    date: new Date().toISOString().split('T')[0],
    startTime: "",
    endTime: "",
    venue: "",
    presentationType: "",
    pannelID: "",
  });

  const [staffMemberOptions, setStaffMemberOptions] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [sheduleResponse, staffResponse] = await Promise.all([
          axios.get(`http://localhost:3001/presentation-shedule/${id}`),
          axios.get("http://localhost:3001/api/projectMembers"),
        ]);
        const sheduleData = sheduleResponse.data;
        const staffData = staffResponse.data;
        setValues({
          pannelID: sheduleData.pannelID,
          groupNo: sheduleData.groupNo,
          date: sheduleData.date,
          startTime: sheduleData.startTime,
          endTime: sheduleData.endTime,
          venue: sheduleData.venue,
          presentationType: sheduleData.presentationType,
          examiner_2: sheduleData.examiner_2,
          examiner_3: sheduleData.examiner_3,
        });
        setStaffMemberOptions(staffData);
        if (sheduleData.examiner_1) {
          setValues(prevValues => ({
            ...prevValues,
            examiner_1: sheduleData.examiner_1
          }));
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [id]);  

  const handleUpdate = (e) => {
    e.preventDefault();

    // Validate time format
    const timeRegex = /^(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/;
    if (!timeRegex.test(values.startTime) || !timeRegex.test(values.endTime)) {
      Swal.fire("Error", "Please enter a valid time in HH:MM format", "error");
      return;
    }

    axios
      .put(`http://localhost:3001/presentation-shedule/update/${id}`, values)
      .then((res) => {
        console.log(res);
        Swal.fire(
          "Done!",
          "Presentation Schedule Details Updated Successfully!",
          "success"
        );
        updatePresentationScheduleList(); // Update the presentation schedule list
        onClose();
      })
      .catch((err) => console.log(err));
  };
  
  return (
    <div className="Russa_update_pr_shd">
      <div className="modal-overlay">
        <div className="modal-content">
          <button className="close-modal-button" onClick={onClose}>
            <CancelIcon />
          </button>
          <h1 className="Russa_update_pr_shd_form-title">Update Presentation shedule</h1>
          <form onSubmit={handleUpdate}>
            <div className="Russa_update_pr_shd_main-user-info">
              <div className="user-input-box">
                <label htmlFor="groupNo">Group No</label>
                    <input
                    type="text"
                    className="form-control"
                    id="groupNo"
                    placeholder="Enter a group number"
                    value={values.groupNo}
                    onChange={(e) => setValues({...values, groupNo: e.target.value})}

                    disabled
                    />
              </div>

              <div className="user-input-box">
                <label htmlFor="date">Date</label>
                    <input
                    type="date"
                    className="form-control"
                    id="date"
                    value={values.date}
                    onChange={(e) => setValues({...values, date: e.target.value})}
                    min={new Date().toISOString().split('T')[0]}
                    />
              </div>

              <div className="user-input-box">
              <label htmlFor="startTime">Start Time</label>
                <input
                  type="text"
                  className="form-control"
                  id="startTime"
                  placeholder="Enter start time (HH:MM)"
                  value={values.startTime}
                  onChange={(e) => setValues({...values, startTime: e.target.value})}
                  
                />
              </div>

              <div className="user-input-box">
              <label htmlFor="endTime">End Time</label>
                <input
                  type="text"
                  className="form-control"
                  id="endTime"
                  placeholder="Enter end time (HH:MM)"
                  value={values.endTime}
                  onChange={(e) => setValues({...values, endTime: e.target.value})}
                  
                />
              </div>

              <div className="user-input-box">
                <label htmlFor="venue">Venue</label>
                  <select
                    className="form-control"
                    id="venue"
                    value={values.venue}
                    onChange={(e) => setValues({...values, venue: e.target.value})}
                    
                  >
                    <option value="">Choose a venue</option>
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
                  </select>
              </div>

              <div className="user-input-box">
                <label htmlFor="presentationType">Presentation Type</label>
                <select
                  className="form-control"
                  id="presentationType"
                  value={values.presentationType}
                  onChange={(e) => setValues({ ...values, presentationType: e.target.value })}
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
              <input type="submit" value="Update Shedule Details" />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UpdatePresentationShedule;








