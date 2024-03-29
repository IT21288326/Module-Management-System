// import React, { useState, useEffect } from "react";
// import Swal from "sweetalert2";
// import "./addPresentationPannelComp.scss";

// const AddPresentationPannel = ({ onClose }) => {
//   const [pannelID, setPannelID] = useState("");
//   const [examiner_1, setExaminer_1] = useState("");
//   const [examiner_2, setExaminer_2] = useState("");
//   const [examiner_3, setExaminer_3] = useState("");
//   const [examinerOptions, setExaminerOptions] = useState([]);

//   useEffect(() => {
//     const fetchExaminers = async () => {
//       try {
//         const response = await fetch("http://localhost:3001/api/projectMembers");
//         if (response.ok) {
//           const data = await response.json();
//           setExaminerOptions(data);
//         } else {
//           throw new Error("Failed to fetch examiners");
//         }
//       } catch (error) {
//         console.error("Error fetching examiners:", error);
//       }
//     };

//     fetchExaminers();
//   }, []);

//   const handleExaminerChange = (e, setter, otherExaminers) => {
//     const selectedExaminer = e.target.value;
//     if (!otherExaminers.includes(selectedExaminer)) {
//       setter(selectedExaminer);
//     } else {
//       Swal.fire("Error", "This examiner has already been selected.", "error");
//     }
//   };

//   const renderOptions = (selectedExaminer, otherExaminers) => {
//     return examinerOptions.map((option, index) => {
//       const disabled = otherExaminers.includes(option) && option !== selectedExaminer;
//       const style = disabled ? { color: "gray" } : {};
//       return (
//         <option key={index} value={option} disabled={disabled} style={style}>
//           {option}
//         </option>
//       );
//     });
//   };

//   const validatePanelName = (name) => {
//     const pattern = /^(?=pannel)(?!pannel0)[a-z0-9]+$/;

//     if (name.length > 12) {
//       return "Panel Name must be less than or equal to 12 characters.";
//     }

//     if (!pattern.test(name)) {
//       return "Panel Name must start with 'pannel'(CAPITAL letters not allowed) followed by numbers, and '0' is not allowed as the first digit after 'pannel'.";
//     }

//     return null;
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     const validationError = validatePanelName(pannelID);
//     if (validationError) {
//       Swal.fire("Error", validationError, "error");
//       return;
//     }

//     const emptyFields = [];
//     if (!examiner_1.trim()) {
//       emptyFields.push("Examiner 1");
//     }
//     if (!examiner_2.trim()) {
//       emptyFields.push("Examiner 2");
//     }
//     if (!examiner_3.trim()) {
//       emptyFields.push("Examiner 3");
//     }

//     if (emptyFields.length > 0) {
//       emptyFields.forEach(field => {
//         Swal.fire("Error", `${field} cannot be empty!`, "error");
//       });
//       return;
//     }

//     try {
//       const panelExists = await checkPanelID();
//       if (panelExists) {
//         Swal.fire("Error", "This Panel already exists!", "error");
//         return;
//       }

//       const presentation_Pannel = {
//         pannelID,
//         examiner_1,
//         examiner_2,
//         examiner_3,
//       };

//       const response = await fetch("http://localhost:3001/presentation-pannel", {
//         method: "POST",
//         body: JSON.stringify(presentation_Pannel),
//         headers: {
//           "Content-Type": "application/json",
//         },
//       });

//       const json = await response.json();

//       if (!response.ok) {
//         console.error("Error adding panel:", json.error);
//       } else {
//         setPannelID("");
//         setExaminer_1("");
//         setExaminer_2("");
//         setExaminer_3("");
//         onClose();
//         Swal.fire("Done", "Panel added successfully!", "success");
//       }
//     } catch (error) {
//       console.error("Error adding panel:", error);
//     }
//   };

//   const checkPanelID = async () => {
//     try {
//       const response = await fetch(`http://localhost:3001/presentation-pannel/panel/${pannelID}`);
//       const data = await response.json();
//       return data.exists; // Assuming the backend returns whether the panel ID exists or not
//     } catch (error) {
//       console.error("Error checking panel ID:", error);
//       return false;
//     }
//   };

//   return (
//     <div className="Russa_add_pr_pannel">
//       <div className="modal-overlay">
//         <div className="modal-content">
//           <button className="close-modal-button" onClick={onClose}>&times;</button>
//           <h1 className="Russa_add_pr_pannel_form-title">Add New Examiner Panel</h1>
//           <form onSubmit={handleSubmit}>
//             <div className="Russa_add_pr_pannel_main-user-info">
//               <div className="user-input-box">
//                 <label htmlFor="pannelID">Panel Name</label>
//                 <input
//                   type="text"
//                   className="form-control"
//                   id="pannelID"
//                   placeholder="Enter a Panel Name"
//                   value={pannelID}
//                   onChange={(e) => setPannelID(e.target.value)}
//                 />
//               </div>

//               <div className="user-input-box">
//                 <label htmlFor="examiner_1">Examiner 1</label>
//                 <select
//                   className="form-control"
//                   id="examiner_1"
//                   value={examiner_1}
//                   onChange={(e) => handleExaminerChange(e, setExaminer_1, [examiner_2, examiner_3])}
//                 >
//                   <option value="">Select an examiner</option>
//                   {renderOptions(examiner_1, [examiner_2, examiner_3])}
//                 </select>
//               </div>

//               <div className="user-input-box">
//                 <label htmlFor="examiner_2">Examiner 2</label>
//                 <select
//                   className="form-control"
//                   id="examiner_2"
//                   value={examiner_2}
//                   onChange={(e) => handleExaminerChange(e, setExaminer_2, [examiner_1, examiner_3])}
//                 >
//                   <option value="">Select an examiner</option>
//                   {renderOptions(examiner_2, [examiner_1, examiner_3])}
//                 </select>
//               </div>

//               <div className="user-input-box">
//                 <label htmlFor="examiner_3">Examiner 3</label>
//                 <select
//                   className="form-control"
//                   id="examiner_3"
//                   value={examiner_3}
//                   onChange={(e) => handleExaminerChange(e, setExaminer_3, [examiner_1, examiner_2])}
//                 >
//                   <option value="">Select an examiner</option>
//                   {renderOptions(examiner_3, [examiner_1, examiner_2])}
//                 </select>
//               </div>
//             </div>

//             <div className="form-submit-btn">
//               <input type="submit" value='Save Panel Details' />
//             </div>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AddPresentationPannel;







import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import "./addPresentationPannelComp.scss";

const AddPresentationPannel = ({ onClose }) => {
  const [pannelID, setPannelID] = useState("");
  const [examiner_1, setExaminer_1] = useState("");
  const [examiner_2, setExaminer_2] = useState("");
  const [examiner_3, setExaminer_3] = useState("");
  const [examinerOptions, setExaminerOptions] = useState([]);

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

  const validatePanelName = (name) => {
    const pattern = /^(?=pannel)(?!pannel0)[a-z0-9]+$/;

    if (name.length > 12) {
      return "Panel Name must be less than or equal to 12 characters.";
    }

    if (!pattern.test(name)) {
      return "Panel Name must start with 'pannel'(CAPITAL letters not allowed) followed by numbers, and '0' is not allowed as the first digit after 'pannel'.";
    }

    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationError = validatePanelName(pannelID);
    if (validationError) {
      Swal.fire("Error", validationError, "error");
      return;
    }

    const emptyFields = [];
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
      emptyFields.forEach(field => {
        Swal.fire("Error", `${field} cannot be empty!`, "error");
      });
      return;
    }

    try {
      const panelExists = await checkPanelID();
      if (panelExists) {
        Swal.fire("Error", "This Panel already exists!", "error");
        return;
      }

      const presentation_Pannel = {
        pannelID,
        examiner_1,
        examiner_2,
        examiner_3,
      };

      const response = await fetch("http://localhost:3001/presentation-pannel", {
        method: "POST",
        body: JSON.stringify(presentation_Pannel),
        headers: {
          "Content-Type": "application/json",
        },
      });

      const json = await response.json();

      if (!response.ok) {
        console.error("Error adding panel:", json.error);
      } else {
        setPannelID("");
        setExaminer_1("");
        setExaminer_2("");
        setExaminer_3("");
        onClose();
        Swal.fire("Done", "Panel added successfully!", "success");
      }
    } catch (error) {
      console.error("Error adding panel:", error);
    }
  };

  const checkPanelID = async () => {
    try {
      const response = await fetch(`http://localhost:3001/presentation-pannel/panel/${pannelID}`);
      const data = await response.json();
      return data.exists; // Assuming the backend returns whether the panel ID exists or not
    } catch (error) {
      console.error("Error checking panel ID:", error);
      return false;
    }
  };

  return (
    <div className="Russa_add_pr_pannel">
      <div className="modal-overlay">
        <div className="modal-content">
          <button className="close-modal-button" onClick={onClose}>&times;</button>
          <h1 className="Russa_add_pr_pannel_form-title">Add New Examiner Panel</h1>
          <form onSubmit={handleSubmit}>
            <div className="Russa_add_pr_pannel_main-user-info">
              <div className="user-input-box">
                <label htmlFor="pannelID">Panel Name</label>
                <input
                  type="text"
                  className="form-control"
                  id="pannelID"
                  placeholder="Enter a Panel Name"
                  value={pannelID}
                  onChange={(e) => setPannelID(e.target.value)}
                />
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
              <input type="submit" value='Save Panel Details' />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddPresentationPannel;
