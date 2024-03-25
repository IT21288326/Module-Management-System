// import React, { useState, useEffect } from "react";
// import './updatepresetationSheduleComp.scss';
// import axios from "axios";
// import { useNavigate, useParams } from "react-router-dom";
// import Swal from "sweetalert2";

// const UpdatePresentationShedule = () => {
//   const { id } = useParams();
//   const [values, setValues] = useState({
//     groupNo:"",
//     date: new Date().toISOString().split('T')[0], // Set initial date to current date
//     time:"",
//     venue:"",
//     pannelID: "", // Added pannelID field
//   });
//   const [pannelIDOptions, setPannelIDOptions] = useState([]);
//   const [examiners, setExaminers] = useState([]);
//   const [prevDateRecord, setPrevDateRecord] = useState(null);
//   const navigate = useNavigate();

//   useEffect(() => {
//     axios
//       .get(`http://localhost:3001/presentation-shedule/${id}`)
//       .then((res) => {
//         setValues({
//           groupNo: res.data.groupNo,
//           date: res.data.date,
//           time: res.data.time,
//           venue: res.data.venue,
//           pannelID: res.data.pannelID, // Set pannelID value
//         });

//         // Fetch previous record of the date
//         axios
//           .get(`http://localhost:3001/presentation-shedule/previousRecord/${res.data.date}`)
//           .then((prevRes) => {
//             setPrevDateRecord(prevRes.data);
//           })
//           .catch((err) => console.log(err));
//       })
//       .catch((err) => console.log(err));

//     // Fetch pannelIDs for the dropdown
//     axios
//       .get("http://localhost:3001/presentation-pannel")
//       .then((res) => {
//         const pannelIDs = res.data.map(item => item.pannelID);
//         setPannelIDOptions(pannelIDs);
//       })
//       .catch((err) => console.log(err));
//   }, []);

//   useEffect(() => {
//     // Fetch examiners based on the selected panel ID
//     if (values.pannelID) {
//       axios
//         .get(`http://localhost:3001/examiners?pannelID=${values.pannelID}`)
//         .then((res) => {
//           setExaminers(res.data);
//         })
//         .catch((err) => console.log(err));
//     } else {
//       setExaminers([]);
//     }
//   }, [values.pannelID]);

//   const handleUpdate = (e) => {
//     e.preventDefault();
  
//     axios
//       .put(`http://localhost:3001/presentation-shedule/update/${id}`, values)
//       .then((res) => {
//         console.log(res);
//         Swal.fire(
//           "Done!",
//           "Presentation Shedule Details Updated Successfully!",
//           "success"
//         );
//         navigate("/projMemberSideBar#presentationSchedule"); // Navigate to Presentation Schedule in sidebar
//       })
//       .catch((err) => console.log(err));
//   };
  
//   return (
//       <div className="R_container_update">
//         <div className="R_form-container_update">
//           <form onSubmit={handleUpdate}>
//             <div>
//               <div className="form-group">
//                 <label htmlFor="groupNo">Group No</label>
//                 <input
//                   type="text"
//                   className="form-control"
//                   id="groupNo"
//                   placeholder="Enter a group number"
//                   value={values.groupNo}
//                   onChange={(e) => setValues({...values, groupNo: e.target.value})}
//                   required
//                   disabled
//                 />
//               </div>

//               <div className="form-group">
//                 <label htmlFor="date">Date</label>
//                 <input
//                   type="date"
//                   className="form-control"
//                   id="date"
//                   value={values.date}
//                   onChange={(e) => setValues({...values, date: e.target.value})}
//                   required
//                 />
//               </div>

//               <div className="form-group">
//                 <label htmlFor="time">Time</label>
//                 <input
//                   type="text"
//                   className="form-control"
//                   id="time"
//                   placeholder="Enter a time (Hours:Minutes)"
//                   value={values.time}
//                   onChange={(e) => setValues({...values, time: e.target.value})}
//                   required
//                 />
//               </div>

//               <div className="form-group">
//                 <label htmlFor="venue">Venue</label>
//                 <select
//                   className="form-control"
//                   id="venue"
//                   value={values.venue}
//                   onChange={(e) => setValues({...values, venue: e.target.value})}
//                   required
//                 >
//                   <option value="">Select a venue</option>
//                   <option value="Venue 1">Venue 1</option>
//                   <option value="Venue 2">Venue 2</option>
//                   <option value="Venue 3">Venue 3</option>
//                 </select>
//               </div>
              
//               <div className="form-group">
//                 <label htmlFor="pannelID">Panel ID</label>
//                 <select
//                   className="form-control"
//                   id="pannelID"
//                   value={values.pannelID}
//                   onChange={(e) => setValues({...values, pannelID: e.target.value})}
//                   required
//                 >
//                   <option value="">Select a Panel ID</option>
//                   {pannelIDOptions.map((option, index) => (
//                     <option key={index} value={option}>{option}</option>
//                   ))}
//                 </select>
//               </div>

//             </div>
//             <div className="text-center">
//               <button type="submit" className="btn btn-primary" id="R_Button">
//                 Update Record
//               </button>
//             </div>
//           </form>
//         </div>
//       </div>
//   );
// };

// export default UpdatePresentationShedule;
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
    startTime:"",
    endTime:"",
    venue:"",
    pannelID: "", // Added pannelID field
  });
  const [pannelIDOptions, setPannelIDOptions] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`http://localhost:3001/presentation-shedule/${id}`)
      .then((res) => {
        setValues({
          groupNo: res.data.groupNo,
          date: res.data.date,
          startTime: res.data.startTime,
          endTime: res.data.endTime,
          venue: res.data.venue,
          pannelID: res.data.pannelID, // Set pannelID value
        });
      })
      .catch((err) => console.log(err));

    // Fetch pannelIDs for the dropdown
    axios
      .get("http://localhost:3001/presentation-pannel")
      .then((res) => {
        const pannelIDs = res.data.map(item => item.pannelID);
        setPannelIDOptions(pannelIDs);
      })
      .catch((err) => console.log(err));
  }, []);

  const handleUpdate = (e) => {
    e.preventDefault();
  
    axios
      .put(`http://localhost:3001/presentation-shedule/update/${id}`, values)
      .then((res) => {
        console.log(res);
        Swal.fire(
          "Done!",
          "Presentation Schedule Details Updated Successfully!",
          "success"
        );
        navigate("/projMemberSideBar#presentationSchedule"); // Navigate to Presentation Schedule in sidebar
      })
      .catch((err) => console.log(err));
  };
  
  return (
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
              <label htmlFor="startTime">Start Time</label>
              <input
                type="text"
                className="form-control"
                id="startTime"
                placeholder="Enter start time (HH:MM)"
                pattern="(?:[01]\d|2[0123]):(?:[012345]\d)"
                value={values.startTime}
                onChange={(e) => setValues({...values, startTime: e.target.value})}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="endTime">End Time</label>
              <input
                type="text"
                className="form-control"
                id="endTime"
                placeholder="Enter end time (HH:MM)"
                pattern="(?:[01]\d|2[0123]):(?:[012345]\d)"
                value={values.endTime}
                onChange={(e) => setValues({...values, endTime: e.target.value})}
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
            
            <div className="form-group">
              <label htmlFor="pannelID">Panel ID</label>
              <select
                className="form-control"
                id="pannelID"
                value={values.pannelID}
                onChange={(e) => setValues({...values, pannelID: e.target.value})}
                required
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
              Update Record
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdatePresentationShedule;
