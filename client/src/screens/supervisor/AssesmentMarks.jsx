
// // // // // // import React, { useState, useEffect } from 'react';
// // // // // // import axios from 'axios';

// // // // // // const MarkingSystem = () => {
// // // // // //     const [state, setState] = useState({
// // // // // //         rubricTypes: [],
// // // // // //         selectedRubricType: '',
// // // // // //         groupRegNo: '',
// // // // // //         rubrics: [],
// // // // // //         groupDetails: null,
// // // // // //         marks: {},
// // // // // //         error: null,
// // // // // //         submissionSuccess: false,
// // // // // //     });

// // // // // //     // Set base URL for axios
// // // // // //     axios.defaults.baseURL = 'http://localhost:3001';

// // // // // //     useEffect(() => {
// // // // // //         const fetchRubricTypes = async () => {
// // // // // //             try {
// // // // // //                 const response = await axios.get('/marksheet/rubric-types');
// // // // // //                 setState({...state, rubricTypes: response.data });
// // // // // //             } catch (error) {
// // // // // //                 setState({...state, error: 'Failed to fetch rubric types.' });
// // // // // //             }
// // // // // //         };

// // // // // //         fetchRubricTypes();
// // // // // //     }, []);

// // // // // //     const handleRubricTypeChange = (event) => {
// // // // // //         setState({...state, selectedRubricType: event.target.value });
// // // // // //     };

// // // // // //     useEffect(() => {
// // // // // //         if (state.selectedRubricType) {
// // // // // //             const fetchRubrics = async () => {
// // // // // //                 try {
// // // // // //                     const response = await axios.get(`/marksheet/rubrics?type=${state.selectedRubricType}`);
// // // // // //                     setState({...state, rubrics: response.data });
// // // // // //                 } catch (error) {
// // // // // //                     setState({...state, error: 'Failed to fetch rubrics.' });
// // // // // //                 }
// // // // // //             };

// // // // // //             fetchRubrics();
// // // // // //         }
// // // // // //     }, [state.selectedRubricType]);

// // // // // //     const fetchGroupDetails = async () => {
// // // // // //         try {
// // // // // //             const response = await axios.get(`/marksheet/group?regNo=${state.groupRegNo}`);
// // // // // //             setState({...state, groupDetails: response.data });
// // // // // //         } catch (error) {
// // // // // //             setState({...state, error: 'Failed to fetch group details.' });
// // // // // //         }
// // // // // //     };

// // // // // // const handleSubmit = async (event) => {
// // // // // //     event.preventDefault();

// // // // // //     // Validate data before sending it to the server
// // // // // //     if (!state.groupDetails) {
// // // // // //         setState({ ...state, error: 'No group details found.' });
// // // // // //         return;
// // // // // //     }

// // // // // //     const marksData = {
// // // // // //         groupRegistrationNo: state.groupDetails.groupRegistrationNo,
// // // // // //         markingType: state.selectedRubricType,
// // // // // //         markingAreas: state.rubrics.map((rubric) => ({
// // // // // //             markingArea: rubric.markingArea,
// // // // // //             members: [
// // // // // //                 {
// // // // // //                     memberRegNo: state.groupDetails.leadersRegistrationNO,
// // // // // //                     memberName: state.groupDetails.leaderName,
// // // // // //                     mark: parseInt(state.marks[`${state.groupDetails.leadersRegistrationNO}_${rubric.markingArea}`], 10) || 0,
// // // // // //                 },
// // // // // //                 // Repeat for other members...
// // // // // //             ],
// // // // // //         })),
// // // // // //     };

// // // // // //     // Log the data being sent to the server
// // // // // //     console.log('Submitting marks data:', marksData);

// // // // // //     try {
// // // // // //         const response = await axios.post('/marksheet/marks', marksData);
// // // // // //         setState({ ...state, submissionSuccess: true, marks: {} });
// // // // // //     } catch (error) {
// // // // // //         console.error('Error during mark submission:', error);
// // // // // //         setState({ ...state, error: `Error: ${error.message}` });
// // // // // //     }
// // // // // // };


// // // // // //     return (
// // // // // //         <div className="container">
// // // // // //             <h1>Marking System</h1>

// // // // // //             {state.error && <p className="text-danger">{state.error}</p>}
// // // // // //             {state.submissionSuccess && <p className="text-success">Marks submitted successfully!</p>}

// // // // // //             <div className="mb-3">
// // // // // //                 <label htmlFor="rubricType">Marking Rubric Type:</label>
// // // // // //                 <select
// // // // // //                     id="rubricType"
// // // // // //                     className="form-select"
// // // // // //                     value={state.selectedRubricType}
// // // // // //                     onChange={handleRubricTypeChange}
// // // // // //                 >
// // // // // //                     <option value="">-- Select Rubric Type --</option>
// // // // // //                     {state.rubricTypes.map((type) => (
// // // // // //                         <option key={type} value={type}>
// // // // // //                             {type}
// // // // // //                         </option>
// // // // // //                     ))}
// // // // // //                 </select>
// // // // // //             </div>

// // // // // //             <div className="mb-3">
// // // // // //                 <label htmlFor="groupRegNo">Group Registration Number:</label>
// // // // // //                 <input
// // // // // //                     id="groupRegNo"
// // // // // //                     className="form-control"
// // // // // //                     type="text"
// // // // // //                     value={state.groupRegNo}
// // // // // //                     onChange={(event) => setState({...state, groupRegNo: event.target.value })}
// // // // // //                 />
// // // // // //                 <button className="btn btn-primary mt-2" onClick={fetchGroupDetails}>Search Group</button>
// // // // // //             </div>

// // // // // //             {state.rubrics.length > 0 && state.groupDetails && (
// // // // // //                 <form onSubmit={handleSubmit}>
// // // // // //                     {state.rubrics.map((rubric) => (
// // // // // //                         <div key={rubric.markingArea} className="mb-4">
// // // // // //                             <h4>{rubric.markingArea} (Max marks: {rubric.marks})</h4>
                            
// // // // // //                             <table className="table table-striped">
// // // // // //                                 <thead>
// // // // // //                                     <tr>
// // // // // //                                         <th>Registration No</th>
// // // // // //                                         <th>Member Name</th>
// // // // // //                                         <th>Mark</th>
// // // // // //                                     </tr>
// // // // // //                                 </thead>
// // // // // //                                 <tbody>
// // // // // //                                     {[
// // // // // //                                         { regNo: state.groupDetails.leadersRegistrationNO, name: state.groupDetails.leaderName },
// // // // // //                                         { regNo: state.groupDetails.Member2RegistrationNO, name: state.groupDetails.Member2Name },
// // // // // //                                         { regNo: state.groupDetails.Member3RegistrationNO, name: state.groupDetails.Member3Name },
// // // // // //                                         { regNo: state.groupDetails.Member4RegistrationNO, name: state.groupDetails.Member4Name },
// // // // // //                                     ].map((member, index) => (
// // // // // //                                         <tr key={index}>
// // // // // //                                             <td>{member.regNo}</td>
// // // // // //                                             <td>{member.name}</td>
// // // // // //                                             <td>
// // // // // //                                                 <input
// // // // // //                                                     type="number"
// // // // // //                                                     className="form-control"
// // // // // //                                                     min="0"
// // // // // //                                                     max={rubric.marks}
// // // // // //                                                     value={state.marks[`${member.regNo}_${rubric.markingArea}`] || ''}
// // // // // //                                                     onChange={(event) => setState({
// // // // // //                                                         ...state,
// // // // // //                                                         marks: {
// // // // // //                                                             ...state.marks,
// // // // // //                                                             [`${member.regNo}_${rubric.markingArea}`]: parseInt(event.target.value),
// // // // // //                                                         },
// // // // // //                                                     })}
// // // // // //                                                 />
// // // // // //                                             </td>
// // // // // //                                         </tr>
// // // // // //                                     ))}
// // // // // //                                 </tbody>
// // // // // //                             </table>
// // // // // //                         </div>
// // // // // //                     ))}
// // // // // //                     <button type="submit" className="btn btn-success">Submit Marks</button>
// // // // // //                 </form>
// // // // // //             )}
// // // // // //         </div>
// // // // // //     );
// // // // // // };

// // // // // // export default MarkingSystem;

// // // // // import React, { useState, useEffect } from 'react';
// // // // // import axios from 'axios';

// // // // // const MarkingSystem = () => {
// // // // //     // Define state variables
// // // // //     const [state, setState] = useState({
// // // // //         rubricTypes: [],
// // // // //         selectedRubricType: '',
// // // // //         groupRegNo: '',
// // // // //         rubrics: [],
// // // // //         groupDetails: null,
// // // // //         marks: {},
// // // // //         error: null,
// // // // //         submissionSuccess: false,
// // // // //     });

// // // // //     // Set base URL for axios
// // // // //     axios.defaults.baseURL = 'http://localhost:3001';

// // // // //     // Fetch rubric types on mount
// // // // //     useEffect(() => {
// // // // //         const fetchRubricTypes = async () => {
// // // // //             try {
// // // // //                 const response = await axios.get('/marksheet/rubric-types');
// // // // //                 setState(prevState => ({ ...prevState, rubricTypes: response.data }));
// // // // //             } catch (error) {
// // // // //                 console.error('Failed to fetch rubric types:', error);
// // // // //                 setState(prevState => ({ ...prevState, error: 'Failed to fetch rubric types.' }));
// // // // //             }
// // // // //         };
// // // // //         fetchRubricTypes();
// // // // //     }, []);

// // // // //     // Handle rubric type change
// // // // //     const handleRubricTypeChange = (event) => {
// // // // //         setState(prevState => ({ ...prevState, selectedRubricType: event.target.value }));
// // // // //     };

// // // // //     // Fetch rubrics when a rubric type is selected
// // // // //     useEffect(() => {
// // // // //         if (state.selectedRubricType) {
// // // // //             const fetchRubrics = async () => {
// // // // //                 try {
// // // // //                     const response = await axios.get(`/marksheet/rubrics?type=${state.selectedRubricType}`);
// // // // //                     setState(prevState => ({ ...prevState, rubrics: response.data }));
// // // // //                 } catch (error) {
// // // // //                     console.error('Failed to fetch rubrics:', error);
// // // // //                     setState(prevState => ({ ...prevState, error: 'Failed to fetch rubrics.' }));
// // // // //                 }
// // // // //             };
// // // // //             fetchRubrics();
// // // // //         }
// // // // //     }, [state.selectedRubricType]);

// // // // //     // Fetch group details based on group registration number
// // // // //     const fetchGroupDetails = async () => {
// // // // //         try {
// // // // //             const response = await axios.get(`/marksheet/group?regNo=${state.groupRegNo}`);
// // // // //             setState(prevState => ({ ...prevState, groupDetails: response.data }));
// // // // //         } catch (error) {
// // // // //             console.error('Failed to fetch group details:', error);
// // // // //             setState(prevState => ({ ...prevState, error: 'Failed to fetch group details.' }));
// // // // //         }
// // // // //     };

// // // // //     // Handle form submission
// // // // //     const handleSubmit = async (event) => {
// // // // //         event.preventDefault();

// // // // //         // Prepare the data to be sent
// // // // //         const marksData = {
// // // // //             groupRegistrationNo: state.groupDetails.groupRegistrationNo,
// // // // //             markingType: state.selectedRubricType,
// // // // //             markingAreas: state.rubrics.map((rubric) => ({
// // // // //                 markingArea: rubric.markingArea,
// // // // //                 members: [
// // // // //                     {
// // // // //                         memberRegNo: state.groupDetails.leadersRegistrationNO,
// // // // //                         memberName: state.groupDetails.leaderName,
// // // // //                         mark: parseInt(state.marks[`${state.groupDetails.leadersRegistrationNO}_${rubric.markingArea}`], 10) || 0,
// // // // //                     },
// // // // //                     {
// // // // //                         memberRegNo: state.groupDetails.Member2RegistrationNO,
// // // // //                         memberName: state.groupDetails.Member2Name,
// // // // //                         mark: parseInt(state.marks[`${state.groupDetails.Member2sRegistrationNO}_${rubric.markingArea}`], 10) || 0,
// // // // //                     },
// // // // //                     {
// // // // //                         memberRegNo: state.groupDetails.Member3RegistrationNO,
// // // // //                         memberName: state.groupDetails.Member3Name,
// // // // //                         mark: parseInt(state.marks[`${state.groupDetails.Member3RegistrationNO}_${rubric.markingArea}`], 10) || 0,
// // // // //                     },
// // // // //                     {
// // // // //                         memberRegNo: state.groupDetails.Member4RegistrationNO,
// // // // //                         memberName: state.groupDetails.Member4Name,
// // // // //                         mark: parseInt(state.marks[`${state.groupDetails.Member4RegistrationNO}_${rubric.markingArea}`], 10) || 0,
// // // // //                     },

// // // // //                 ],
// // // // //             })),
// // // // //         };

// // // // //         // Send POST request to the server
// // // // //         try {
// // // // //             const response = await axios.post('/marksheet/marks', marksData);
// // // // //             console.log('Marks submission successful:', response.data);
// // // // //             setState(prevState => ({
// // // // //                 ...prevState,
// // // // //                 submissionSuccess: true,
// // // // //                 marks: {},
// // // // //             }));
// // // // //         } catch (error) {
// // // // //             console.error('Error during marks submission:', error);
// // // // //             setState(prevState => ({ ...prevState, error: `Error: ${error.message}` }));
// // // // //         }
// // // // //     };

// // // // //     // Render the UI
// // // // //     return (
// // // // //         <div className="container">
// // // // //             <h1>Marking System</h1>

// // // // //             {/* Display error message if any */}
// // // // //             {state.error && <p className="text-danger">{state.error}</p>}

// // // // //             {/* Display success message if marks were submitted successfully */}
// // // // //             {state.submissionSuccess && <p className="text-success">Marks submitted successfully!</p>}

// // // // //             {/* Select rubric type */}
// // // // //             <div className="mb-3">
// // // // //                 <label htmlFor="rubricType">Marking Rubric Type:</label>
// // // // //                 <select
// // // // //                     id="rubricType"
// // // // //                     className="form-select"
// // // // //                     value={state.selectedRubricType}
// // // // //                     onChange={handleRubricTypeChange}
// // // // //                 >
// // // // //                     <option value="">-- Select Rubric Type --</option>
// // // // //                     {state.rubricTypes.map((type) => (
// // // // //                         <option key={type} value={type}>
// // // // //                             {type}
// // // // //                         </option>
// // // // //                     ))}
// // // // //                 </select>
// // // // //             </div>

// // // // //             {/* Input for group registration number */}
// // // // //             <div className="mb-3">
// // // // //                 <label htmlFor="groupRegNo">Group Registration Number:</label>
// // // // //                 <input
// // // // //                     id="groupRegNo"
// // // // //                     className="form-control"
// // // // //                     type="text"
// // // // //                     value={state.groupRegNo}
// // // // //                     onChange={(event) => setState(prevState => ({ ...prevState, groupRegNo: event.target.value }))}
// // // // //                 />
// // // // //                 <button className="btn btn-primary mt-2" onClick={fetchGroupDetails}>Search Group</button>
// // // // //             </div>

// // // // //             {/* Form to input marks */}
// // // // //             {state.rubrics.length > 0 && state.groupDetails && (
// // // // //                 <form onSubmit={handleSubmit}>
// // // // //                     {state.rubrics.map((rubric) => (
// // // // //                         <div key={rubric.markingArea} className="mb-4">
// // // // //                             <h4>{rubric.markingArea} (Max marks: {rubric.marks})</h4>
                            
// // // // //                             <table className="table table-striped">
// // // // //                                 <thead>
// // // // //                                     <tr>
// // // // //                                         <th>Registration No</th>
// // // // //                                         <th>Member Name</th>
// // // // //                                         <th>Mark</th>
// // // // //                                     </tr>
// // // // //                                 </thead>
// // // // //                                 <tbody>
// // // // //                                     {[
// // // // //                                         { regNo: state.groupDetails.leadersRegistrationNO, name: state.groupDetails.leaderName },
// // // // //                                         { regNo: state.groupDetails.Member2RegistrationNO, name: state.groupDetails.Member2Name },
// // // // //                                         { regNo: state.groupDetails.Member3RegistrationNO, name: state.groupDetails.Member3Name },
// // // // //                                         { regNo: state.groupDetails.Member4RegistrationNO, name: state.groupDetails.Member4Name },
// // // // //                                     ].map((member, index) => (
// // // // //                                         <tr key={index}>
// // // // //                                             <td>{member.regNo}</td>
// // // // //                                             <td>{member.name}</td>
// // // // //                                             <td>
// // // // //                                                 <input
// // // // //                                                     type="number"
// // // // //                                                     className="form-control"
// // // // //                                                     min="0"
// // // // //                                                     max={rubric.marks}
// // // // //                                                     value={state.marks[`${member.regNo}_${rubric.markingArea}`] || ''}
// // // // //                                                     onChange={(event) => setState(prevState => ({
// // // // //                                                         ...prevState,
// // // // //                                                         marks: {
// // // // //                                                             ...prevState.marks,
// // // // //                                                             [`${member.regNo}_${rubric.markingArea}`]: parseInt(event.target.value, 10),
// // // // //                                                         },
// // // // //                                                     }))}
// // // // //                                                 />
// // // // //                                             </td>
// // // // //                                         </tr>
// // // // //                                     ))}
// // // // //                                 </tbody>
// // // // //                             </table>
// // // // //                         </div>
// // // // //                     ))}
// // // // //                     <button type="submit" className="btn btn-success">Submit Marks</button>
// // // // //                 </form>
// // // // //             )}
// // // // //         </div>
// // // // //     );
// // // // // };

// // // // // export default MarkingSystem;
// // // // // import React, { useState, useEffect } from 'react';
// // // // // import axios from 'axios';

// // // // // const MarkingSystem = () => {
// // // // //     // Define state variables
// // // // //     const [state, setState] = useState({
// // // // //         rubricTypes: [],
// // // // //         selectedRubricType: '',
// // // // //         groupRegNo: '',
// // // // //         rubrics: [],
// // // // //         groupDetails: null,
// // // // //         marks: {},
// // // // //         error: null,
// // // // //         submissionSuccess: false,
// // // // //     });

// // // // //     // Set base URL for axios
// // // // //     axios.defaults.baseURL = 'http://localhost:3001';

// // // // //     // Fetch rubric types on mount
// // // // //     useEffect(() => {
// // // // //         const fetchRubricTypes = async () => {
// // // // //             try {
// // // // //                 const response = await axios.get('/marksheet/rubric-types');
// // // // //                 setState(prevState => ({ ...prevState, rubricTypes: response.data }));
// // // // //             } catch (error) {
// // // // //                 console.error('Failed to fetch rubric types:', error);
// // // // //                 setState(prevState => ({ ...prevState, error: 'Failed to fetch rubric types.' }));
// // // // //             }
// // // // //         };
// // // // //         fetchRubricTypes();
// // // // //     }, []);

// // // // //     // Handle rubric type change
// // // // //     const handleRubricTypeChange = (event) => {
// // // // //         setState(prevState => ({ ...prevState, selectedRubricType: event.target.value }));
// // // // //     };

// // // // //     // Fetch rubrics when a rubric type is selected
// // // // //     useEffect(() => {
// // // // //         if (state.selectedRubricType) {
// // // // //             const fetchRubrics = async () => {
// // // // //                 try {
// // // // //                     const response = await axios.get(`/marksheet/rubrics?type=${state.selectedRubricType}`);
// // // // //                     setState(prevState => ({ ...prevState, rubrics: response.data }));
// // // // //                 } catch (error) {
// // // // //                     console.error('Failed to fetch rubrics:', error);
// // // // //                     setState(prevState => ({ ...prevState, error: 'Failed to fetch rubrics.' }));
// // // // //                 }
// // // // //             };
// // // // //             fetchRubrics();
// // // // //         }
// // // // //     }, [state.selectedRubricType]);

// // // // //     // Fetch group details based on group registration number
// // // // //     const fetchGroupDetails = async () => {
// // // // //         try {
// // // // //             const response = await axios.get(`/marksheet/group?regNo=${state.groupRegNo}`);
// // // // //             if (response.data) {
// // // // //                 setState(prevState => ({ ...prevState, groupDetails: response.data }));
// // // // //             }
// // // // //         } catch (error) {
// // // // //             console.error('Failed to fetch group details:', error);
// // // // //             setState(prevState => ({ ...prevState, error: 'Failed to fetch group details.' }));
// // // // //         }
// // // // //     };

// // // // //     // Handle form submission
// // // // //     const handleSubmit = async (event) => {
// // // // //         event.preventDefault();
      
// // // // //         // Prepare the data to be sent
// // // // //         const marksData = {
// // // // //           groupRegistrationNo: state.groupDetails.groupRegistrationNo,
// // // // //           markingType: state.selectedRubricType,
// // // // //           markingAreas: state.rubrics ? state.rubrics.map((rubric) => ({
// // // // //             markingArea: rubric.markingArea,
// // // // //             members: state.groupDetails.members.map((member) => ({
// // // // //               memberRegNo: member.regNo,
// // // // //               memberName: member.name,
// // // // //               mark: (state.marks && state.marks[`${member.regNo}_${rubric.markingArea}`]) || 0,
// // // // //             })),
// // // // //           })) : [],
// // // // //         };
      
// // // // //         // Send POST request to the server
// // // // //         if (state.groupDetails && state.rubrics && state.rubrics.length > 0) {
// // // // //           try {
// // // // //             const response = await axios.post('/marksheet/marks', marksData);
// // // // //             console.log('Marks submission successful:', response.data);
// // // // //             setState(prevState => ({
// // // // //               ...prevState,
// // // // //               submissionSuccess: true,
// // // // //               marks: {},
// // // // //               error: null,
// // // // //             }));
// // // // //           } catch (error) {
// // // // //             console.error('Error during marks submission:', error);
// // // // //             setState(prevState => ({ ...prevState, error: `Error: ${error.message}` }));
// // // // //           }
// // // // //         }
// // // // //       };
// // // // //     // Render the UI
// // // // //     return (
// // // // //         <div className="container">
// // // // //             <h1>Marking System</h1>

// // // // //             {/* Display error message if any */}
// // // // //             {state.error && <p className="text-danger">{state.error}</p>}

// // // // //             {/* Display success message if marks were submitted successfully */}
// // // // //             {state.submissionSuccess && <p className="text-success">Marks for {state.groupDetails.groupRegistrationNo} have been submitted successfully!</p>}

// // // // //             {/* Select rubric type */}
// // // // //             <div className="mb-3">
// // // // //                 <label htmlFor="rubricType">Marking Rubric Type:</label>
// // // // //                 <select
// // // // //                     id="rubricType"
// // // // //                     className="form-select"
// // // // //                     value={state.selectedRubricType}
// // // // //                     onChange={handleRubricTypeChange}
// // // // //                 >
// // // // //                     <option value="">-- Select Rubric Type --</option>
// // // // //                     {state.rubricTypes.map((type) => (
// // // // //                         <option key={type} value={type}>
// // // // //                             {type}
// // // // //                         </option>
// // // // //                     ))}
// // // // //                 </select>
// // // // //             </div>

// // // // //             {/* Input for group registration number */}
// // // // //             <div className="mb-3">
// // // // //                 <label htmlFor="groupRegNo">Group Registration Number:</label>
// // // // //                 <input
// // // // //                     id="groupRegNo"
// // // // //                     className="form-control"
// // // // //                     type="text"
// // // // //                     value={state.groupRegNo}
// // // // //                     onChange={(event) => setState(prevState => ({ ...prevState, groupRegNo: event.target.value }))}
// // // // //                 />
// // // // //                 <button className="btn btn-primary mt-2" onClick={fetchGroupDetails}>Search Group</button>
// // // // //             </div>

// // // // //             {/* Form to input marks */}
// // // // //             {state.rubrics.length > 0 && state.groupDetails && (
// // // // //                 <form onSubmit={handleSubmit}>
// // // // //                     {state.rubrics.map((rubric) => (
// // // // //                         <div key={rubric.markingArea} className="mb-4">
// // // // //                             <h4>{rubric.markingArea} (Max marks: {rubric.marks})</h4>
                            
// // // // //                             <table className="table table-striped">
// // // // //                                 <thead>
// // // // //                                     <tr>
// // // // //                                         <th>Registration No</th>
// // // // //                                         <th>Member Name</th>
// // // // //                                         <th>Mark</th>
// // // // //                                     </tr>
// // // // //                                 </thead>
// // // // //                                 <tbody>
// // // // //                                     {[
// // // // //                                         { regNo: state.groupDetails.leadersRegistrationNO, name: state.groupDetails.leaderName },
// // // // //                                         { regNo: state.groupDetails.Member2RegistrationNO, name: state.groupDetails.Member2Name },
// // // // //                                         { regNo: state.groupDetails.Member3RegistrationNO, name: state.groupDetails.Member3Name },
// // // // //                                         { regNo: state.groupDetails.Member4RegistrationNO, name: state.groupDetails.Member4Name },
// // // // //                                     ].map((member, index) => (
// // // // //                                         <tr key={index}>
// // // // //                                             <td>{member.regNo}</td>
// // // // //                                             <td>{member.name}</td>
// // // // //                                             <td>
// // // // //                                                 <input
// // // // //                                                     type="number"
// // // // //                                                     className="form-control"
// // // // //                                                     min="0"
// // // // //                                                     max={rubric.marks}
// // // // //                                                     value={state.marks[`${member.regNo}_${rubric.markingArea}`] || ''}
// // // // //                                                     onChange={(event) => setState(prevState => ({
// // // // //                                                         ...prevState,
// // // // //                                                         marks: {
// // // // //                                                             ...prevState.marks,
// // // // //                                                             [`${member.regNo}_${rubric.markingArea}`]: parseInt(event.target.value, 10),
// // // // //                                                         },
// // // // //                                                     }))}
// // // // //                                                 />
// // // // //                                             </td>
// // // // //                                         </tr>
// // // // //                                     ))}
// // // // //                                 </tbody>
// // // // //                             </table>
// // // // //                         </div>
// // // // //                     ))}
// // // // //                     <button type="submit" className="btn btn-success">Submit Marks</button>
// // // // //                 </form>
// // // // //             )}
// // // // //         </div>
// // // // //     );
// // // // // };

// // // // // export default MarkingSystem;
// // // // import React, { useState, useEffect } from 'react';
// // // // import axios from 'axios';

// // // // const MarkingSystem = () => {
// // // //     // Define state variables
// // // //     const [state, setState] = useState({
// // // //         rubricTypes: [],
// // // //         selectedRubricType: '',
// // // //         groupRegNo: '',
// // // //         rubrics: [],
// // // //         groupDetails: null,
// // // //         error: null,
// // // //     });

// // // //     // Set base URL for axios
// // // //     axios.defaults.baseURL = 'http://localhost:3001';

// // // //     // Fetch rubric types on mount
// // // //     useEffect(() => {
// // // //         const fetchRubricTypes = async () => {
// // // //             try {
// // // //                 const response = await axios.get('/marksheet/rubric-types');
// // // //                 setState(prevState => ({ ...prevState, rubricTypes: response.data }));
// // // //             } catch (error) {
// // // //                 console.error('Failed to fetch rubric types:', error);
// // // //                 setState(prevState => ({ ...prevState, error: 'Failed to fetch rubric types.' }));
// // // //             }
// // // //         };
// // // //         fetchRubricTypes();
// // // //     }, []);

// // // //     // Handle rubric type change
// // // //     const handleRubricTypeChange = (event) => {
// // // //         setState(prevState => ({ ...prevState, selectedRubricType: event.target.value }));
// // // //     };

// // // //     // Fetch rubrics when a rubric type is selected
// // // //     useEffect(() => {
// // // //         if (state.selectedRubricType) {
// // // //             const fetchRubrics = async () => {
// // // //                 try {
// // // //                     const response = await axios.get(`/marksheet/rubrics?type=${state.selectedRubricType}`);
// // // //                     setState(prevState => ({ ...prevState, rubrics: response.data }));
// // // //                 } catch (error) {
// // // //                     console.error('Failed to fetch rubrics:', error);
// // // //                     setState(prevState => ({ ...prevState, error: 'Failed to fetch rubrics.' }));
// // // //                 }
// // // //             };
// // // //             fetchRubrics();
// // // //         }
// // // //     }, [state.selectedRubricType]);

// // // //     // Fetch group details based on group registration number
// // // //     const fetchGroupDetails = async () => {
// // // //         try {
// // // //             const response = await axios.get(`/marksheet/group?regNo=${state.groupRegNo}`);
// // // //             if (response.data) {
// // // //                 setState(prevState => ({ ...prevState, groupDetails: response.data }));
// // // //             }
// // // //         } catch (error) {
// // // //             console.error('Failed to fetch group details:', error);
// // // //             setState(prevState => ({ ...prevState, error: 'Failed to fetch group details.' }));
// // // //         }
// // // //     };

// // // //     // Render the UI
// // // //     return (
// // // //         <div className="container">
// // // //             <h1>Marking System</h1>

// // // //             {/* Display error message if any */}
// // // //             {state.error && <p className="text-danger">{state.error}</p>}

// // // //             {/* Select rubric type */}
// // // //             <div className="mb-3">
// // // //                 <label htmlFor="rubricType">Marking Rubric Type:</label>
// // // //                 <select
// // // //                     id="rubricType"
// // // //                     className="form-select"
// // // //                     value={state.selectedRubricType}
// // // //                     onChange={handleRubricTypeChange}
// // // //                 >
// // // //                     <option value="">-- Select Rubric Type --</option>
// // // //                     {state.rubricTypes.map((type) => (
// // // //                         <option key={type} value={type}>
// // // //                             {type}
// // // //                         </option>
// // // //                     ))}
// // // //                 </select>
// // // //             </div>

// // // //             {/* Input for group registration number */}
// // // //             <div className="mb-3">
// // // //                 <label htmlFor="groupRegNo">Group Registration Number:</label>
// // // //                 <input
// // // //                     id="groupRegNo"
// // // //                     className="form-control"
// // // //                     type="text"
// // // //                     value={state.groupRegNo}
// // // //                     onChange={(event) => setState(prevState => ({ ...prevState, groupRegNo: event.target.value }))}
// // // //                 />
// // // //                 <button className="btn btn-primary mt-2" onClick={fetchGroupDetails}>Search Group</button>
// // // //             </div>

// // // //             {/* Displaying rubrics and group details */}
// // // //             {state.rubrics.length > 0 && state.groupDetails && (
// // // //                 <div>
// // // //                     <h3>Group Details:</h3>
// // // //                     <p>Group Registration No: {state.groupDetails.groupRegistrationNo}</p>
// // // //                     <p>Leader Name: {state.groupDetails.leaderName}</p>
// // // //                     <p>Members: </p>
// // // //                     <ul>
// // // //                         <li>Member 2: {state.groupDetails.Member2Name}</li>
// // // //                         <li>Member 3: {state.groupDetails.Member3Name}</li>
// // // //                         <li>Member 4: {state.groupDetails.Member4Name}</li>
// // // //                     </ul>

// // // //                     <h3>Rubrics:</h3>
// // // //                     {state.rubrics.map((rubric, index) => (
// // // //                         <div key={index}>
// // // //                             <h4>{rubric.markingArea} (Max marks: {rubric.marks})</h4>
// // // //                         </div>
// // // //                     ))}
// // // //                 </div>
// // // //             )}
// // // //         </div>
// // // //     );
// // // // };

// // // // export default MarkingSystem;
// // // // import React, { useState, useEffect } from 'react';
// // // // import axios from 'axios';

// // // // const MarkingSystem = () => {
// // // //     // Define state variables
// // // //     const [state, setState] = useState({
// // // //         rubricTypes: [],
// // // //         selectedRubricType: '',
// // // //         groupRegNo: '',
// // // //         rubrics: [],
// // // //         groupDetails: null,
// // // //         marks: {},
// // // //         comments: {},
// // // //         groupComments: '',
// // // //         error: null,
// // // //         submissionSuccess: false,
// // // //     });

// // // //     // Set base URL for axios
// // // //     axios.defaults.baseURL = 'http://localhost:3001';

// // // //     // Fetch rubric types on mount
// // // //     useEffect(() => {
// // // //         const fetchRubricTypes = async () => {
// // // //             try {
// // // //                 const response = await axios.get('/marksheet/rubric-types');
// // // //                 setState(prevState => ({ ...prevState, rubricTypes: response.data }));
// // // //             } catch (error) {
// // // //                 console.error('Failed to fetch rubric types:', error);
// // // //                 setState(prevState => ({ ...prevState, error: 'Failed to fetch rubric types.' }));
// // // //             }
// // // //         };
// // // //         fetchRubricTypes();
// // // //     }, []);

// // // //     // Handle rubric type change
// // // //     const handleRubricTypeChange = (event) => {
// // // //         setState(prevState => ({ ...prevState, selectedRubricType: event.target.value }));
// // // //     };

// // // //     // Fetch rubrics when a rubric type is selected
// // // //     useEffect(() => {
// // // //         if (state.selectedRubricType) {
// // // //             const fetchRubrics = async () => {
// // // //                 try {
// // // //                     const response = await axios.get(`/marksheet/rubrics?type=${state.selectedRubricType}`);
// // // //                     setState(prevState => ({ ...prevState, rubrics: response.data }));
// // // //                 } catch (error) {
// // // //                     console.error('Failed to fetch rubrics:', error);
// // // //                     setState(prevState => ({ ...prevState, error: 'Failed to fetch rubrics.' }));
// // // //                 }
// // // //             };
// // // //             fetchRubrics();
// // // //         }
// // // //     }, [state.selectedRubricType]);

// // // //     // Fetch group details based on group registration number
// // // //     const fetchGroupDetails = async () => {
// // // //         try {
// // // //             const response = await axios.get(`/marksheet/group?regNo=${state.groupRegNo}`);
// // // //             if (response.data) {
// // // //                 setState(prevState => ({ ...prevState, groupDetails: response.data }));
// // // //             }
// // // //         } catch (error) {
// // // //             console.error('Failed to fetch group details:', error);
// // // //             setState(prevState => ({ ...prevState, error: 'Failed to fetch group details.' }));
// // // //         }
// // // //     };

// // // //     // Handle input changes for marks and comments
// // // //     const handleInputChange = (event, memberRegNo, markingArea, isComment = false) => {
// // // //         const { value } = event.target;
// // // //         const fieldKey = `${memberRegNo}_${markingArea}`;

// // // //         setState(prevState => {
// // // //             if (isComment) {
// // // //                 // Update comments
// // // //                 return {
// // // //                     ...prevState,
// // // //                     comments: {
// // // //                         ...prevState.comments,
// // // //                         [fieldKey]: value,
// // // //                     },
// // // //                 };
// // // //             } else {
// // // //                 // Update marks
// // // //                 return {
// // // //                     ...prevState,
// // // //                     marks: {
// // // //                         ...prevState.marks,
// // // //                         [fieldKey]: value,
// // // //                     },
// // // //                 };
// // // //             }
// // // //         });
// // // //     };

// // // //     // Handle group comments change
// // // //     const handleGroupCommentsChange = (event) => {
// // // //         setState(prevState => ({ ...prevState, groupComments: event.target.value }));
// // // //     };
// // // //     const handleSubmit = async (event) => {
// // // //         event.preventDefault();
    
// // // //         // Prepare the data to be sent
// // // //         const marksData = {
// // // //             groupRegistrationNo: state.groupDetails?.groupRegistrationNo,
// // // //             markingType: state.selectedRubricType,
// // // //             markingAreas: state.rubrics ? state.rubrics.map((rubric) => ({
// // // //                 markingArea: rubric.markingArea,
// // // //                 members: state.groupDetails?.members ? state.groupDetails.members.map((member) => ({
// // // //                     memberRegNo: member.regNo,
// // // //                     memberName: member.name,
// // // //                     mark: (state.marks && state.marks[${member.regNo}_${rubric.markingArea}]) || '',
// // // //                     comment: (state.comments && state.comments[${member.regNo}_${rubric.markingArea}]) || '',
// // // //                 })) : [],
// // // //             })) : [],
// // // //             groupComments: state.groupComments,
// // // //         };
    
// // // //         // Send POST request to the server
// // // //         try {
// // // //             const response = await axios.post('/marksheet/marks', marksData);
// // // //             console.log('Marks submission successful:', response.data);
// // // //             setState(prevState => ({
// // // //                 ...prevState,
// // // //                 submissionSuccess: true,
// // // //                 marks: {},
// // // //                 comments: {},
// // // //                 groupComments: '',
// // // //                 error: null,
// // // //             }));
// // // //         } catch (error) {
// // // //             console.error('Error during marks submission:', error);
// // // //             setState(prevState => ({ ...prevState, error: Error: ${error.message} }));
// // // //         }
// // // //     };

// // // //     // Render the UI
// // // //     return (
// // // //         <div className="container">
// // // //             <h1>Marking System</h1>

// // // //             {/* Display error message if any */}
// // // //             {state.error && <p className="text-danger">{state.error}</p>}

// // // //             {/* Display success message if marks were submitted successfully */}
// // // //             {state.submissionSuccess && (
// // // //                 <p className="text-success">
// // // //                     Marks for {state.groupDetails.groupRegistrationNo} have been submitted successfully!
// // // //                 </p>
// // // //             )}

// // // //             {/* Select rubric type */}
// // // //             <div className="mb-3">
// // // //                 <label htmlFor="rubricType">Marking Rubric Type:</label>
// // // //                 <select
// // // //                     id="rubricType"
// // // //                     className="form-select"
// // // //                     value={state.selectedRubricType}
// // // //                     onChange={handleRubricTypeChange}
// // // //                 >
// // // //                     <option value="">-- Select Rubric Type --</option>
// // // //                     {state.rubricTypes.map((type) => (
// // // //                         <option key={type} value={type}>
// // // //                             {type}
// // // //                         </option>
// // // //                     ))}
// // // //                 </select>
// // // //             </div>

// // // //             {/* Input for group registration number */}
// // // //             <div className="mb-3">
// // // //                 <label htmlFor="groupRegNo">Group Registration Number:</label>
// // // //                 <input
// // // //                     id="groupRegNo"
// // // //                     className="form-control"
// // // //                     type="text"
// // // //                     value={state.groupRegNo}
// // // //                     onChange={(event) => setState(prevState => ({ ...prevState, groupRegNo: event.target.value }))}
// // // //                 />
// // // //                 <button className="btn btn-primary mt-2" onClick={fetchGroupDetails}>Search Group</button>
// // // //             </div>

// // // //             {/* Form to input marks and comments */}
// // // //             {state.rubrics.length > 0 && state.groupDetails && (
// // // //                 <form onSubmit={handleSubmit}>
// // // //                     {state.rubrics.map((rubric) => (
// // // //                         <div key={rubric.markingArea} className="mb-4">
// // // //                             <h4>{rubric.markingArea} (Max marks: {rubric.marks})</h4>

// // // //                             <table className="table table-striped">
// // // //                                 <thead>
// // // //                                     <tr>
// // // //                                         <th>Registration No</th>
// // // //                                         <th>Member Name</th>
// // // //                                         <th>Mark</th>
// // // //                                         <th>Comment</th>
// // // //                                     </tr>
// // // //                                 </thead>
// // // //                                 <tbody>
// // // //                                     {[
// // // //                                         { regNo: state.groupDetails.leadersRegistrationNO, name: state.groupDetails.leaderName },
// // // //                                         { regNo: state.groupDetails.Member2RegistrationNO, name: state.groupDetails.Member2Name },
// // // //                                         { regNo: state.groupDetails.Member3RegistrationNO, name: state.groupDetails.Member3Name },
// // // //                                         { regNo: state.groupDetails.Member4RegistrationNO, name: state.groupDetails.Member4Name },
// // // //                                     ].map((member, index) => (
// // // //                                         <tr key={index}>
// // // //                                             <td>{member.regNo}</td>
// // // //                                             <td>{member.name}</td>
// // // //                                             <td>
// // // //                                                 <input
// // // //                                                     type="number"
// // // //                                                     className="form-control"
// // // //                                                     min="0"
// // // //                                                     max={rubric.marks}
// // // //                                                     value={state.marks[`${member.regNo}_${rubric.markingArea}`] || ''}
// // // //                                                     onChange={(event) => handleInputChange(event, member.regNo, rubric.markingArea)}
// // // //                                                     name="marks"
// // // //                                                 />
// // // //                                             </td>
// // // //                                             <td>
// // // //                                                 <input
// // // //                                                     type="text"
// // // //                                                     className="form-control"
// // // //                                                     value={state.comments[`${member.regNo}_${rubric.markingArea}`] || ''}
// // // //                                                     onChange={(event) => handleInputChange(event, member.regNo, rubric.markingArea, true)}
// // // //                                                     name="comments"
// // // //                                                 />
// // // //                                             </td>
// // // //                                         </tr>
// // // //                                     ))}
// // // //                                 </tbody>
// // // //                             </table>
// // // //                         </div>
// // // //                     ))}
// // // //                     <div className="mb-4">
// // // //                         <h4>Group Comments</h4>
// // // //                         <textarea
// // // //                             className="form-control"
// // // //                             value={state.groupComments}
// // // //                             onChange={handleGroupCommentsChange}
// // // //                             rows="3"
// // // //                             placeholder="Enter group comments here"
// // // //                         />
// // // //                     </div>
// // // //                     <button type="submit" className="btn btn-success">Submit Marks</button>
// // // //                 </form>
// // // //             )}
// // // //         </div>
// // // //     );
// // // // };

// // // // export default MarkingSystem;
// // //++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// // import React, { useState, useEffect } from 'react';
// // import axios from 'axios';

// // const MarkingSystem = () => {
// //     const [state, setState] = useState({
// //         rubricTypes: [],
// //         selectedRubricType: '',
// //         groupRegNo: '',
// //         rubrics: [],
// //         groupDetails: {}, // Initialized as an empty object
// //         marks: {},
// //         comments: {},
// //         groupComments: '',
// //         error: null,
// //         submissionSuccess: false,
// //     });
    

// //     axios.defaults.baseURL = 'http://localhost:3001';

// //     useEffect(() => {
// //         const fetchRubricTypes = async () => {
// //             try {
// //                 const response = await axios.get('/marksheet/rubric-types');
// //                 setState(prevState => ({ ...prevState, rubricTypes: response.data }));
// //             } catch (error) {
// //                 console.error('Failed to fetch rubric types:', error);
// //                 setState(prevState => ({ ...prevState, error: 'Failed to fetch rubric types.' }));
// //             }
// //         };
// //         fetchRubricTypes();
// //     }, []);

// //     const handleRubricTypeChange = (event) => {
// //         setState(prevState => ({ ...prevState, selectedRubricType: event.target.value }));
// //     };

// //     useEffect(() => {
// //         if (state.selectedRubricType) {
// //             const fetchRubrics = async () => {
// //                 try {
// //                     const response = await axios.get(`/marksheet/rubrics?type=${state.selectedRubricType}`);
// //                     setState(prevState => ({ ...prevState, rubrics: response.data }));
// //                 } catch (error) {
// //                     console.error('Failed to fetch rubrics:', error);
// //                     setState(prevState => ({ ...prevState, error: 'Failed to fetch rubrics.' }));
// //                 }
// //             };
// //             fetchRubrics();
// //         }
// //     }, [state.selectedRubricType]);

// // //    const fetchGroupDetails = async () => {
// // //     try {
// // //         const response = await axios.get(`/marksheet/group?regNo=${state.groupRegNo}`);
// // //         console.log('Group details:', response.data);
// // //         if (response.data) {
// // //             setState(prevState => ({ ...prevState, groupDetails: response.data }));
// // //         } else {
// // //             setState(prevState => ({ ...prevState, error: 'No group details found for the provided registration number.' }));
// // //         }
// // //     } catch (error) {
// // //         console.error('Failed to fetch group details:', error);
// // //         setState(prevState => ({ ...prevState, error: 'Failed to fetch group details.' }));
// // //     }
// // // };
// // const fetchGroupDetails = async () => {
// //     try {
// //         const response = await axios.get(`/marksheet/group?regNo=${state.groupRegNo}`);
// //         console.log('Group details:', response.data);
// //         if (response.data) {
// //             setState(prevState => ({ ...prevState, groupDetails: response.data }));
// //         } else {
// //             setState(prevState => ({ ...prevState, error: 'No group details found for the provided registration number.' }));
// //         }
// //     } catch (error) {
// //         console.error('Failed to fetch group details:', error);
// //         setState(prevState => ({ ...prevState, error: 'Failed to fetch group details.' }));
// //     }
// // };


    

// //     const handleInputChange = (event, memberRegNo, markingArea, isComment = false) => {
// //         const { value } = event.target;
// //         const fieldKey = `${memberRegNo}_${markingArea}`;

// //         setState(prevState => {
// //             if (isComment) {
// //                 return {
// //                     ...prevState,
// //                     comments: {
// //                         ...prevState.comments,
// //                         [fieldKey]: value,
// //                     },
// //                 };
// //             } else {
// //                 return {
// //                     ...prevState,
// //                     marks: {
// //                         ...prevState.marks,
// //                         [fieldKey]: value,
// //                     },
// //                 };
// //             }
// //         });
// //     };

// //     const handleGroupCommentsChange = (event) => {
// //         setState(prevState => ({ ...prevState, groupComments: event.target.value }));
// //     };

// //     // const handleSubmit = async (event) => {
// //     //     event.preventDefault();

// //     //     const marksData = {
// //     //         groupRegistrationNo: state.groupDetails?.groupRegistrationNo,
// //     //         markingType: state.selectedRubricType,
// //     //         markingAreas: state.rubrics.map((rubric) => ({
// //     //             markingArea: rubric.markingArea,
// //     //             members: state.groupDetails?.members.map((member) => ({
// //     //                 memberRegNo: member.regNo,
// //     //                 memberName: member.name,
// //     //                 mark: state.marks[`${member.regNo}_${rubric.markingArea}`] || '',
// //     //                 comment: state.comments[`${member.regNo}_${rubric.markingArea}`] || '',
// //     //             })) || [],
// //     //         })) || [],
// //     //         groupComments: state.groupComments,
// //     //     };

// //     //     try {
// //     //         const response = await axios.post('/marksheet/marks', marksData);
// //     //         console.log('Marks submission successful:', response.data);
// //     //         setState(prevState => ({
// //     //             ...prevState,
// //     //             submissionSuccess: true,
// //     //             marks: {},
// //     //             comments: {},
// //     //             groupComments: '',
// //     //             error: null,
// //     //         }));
// //     //     } catch (error) {
// //     //         console.error('Error during marks submission:', error);
// //     //         setState(prevState => ({ ...prevState, error: `Error: ${error.message}` }));
// //     //     }
// //     // };
// //     // Collecting data in the frontend (adjusted code snippet)
// //     const handleSubmit = async (event) => {
// //         event.preventDefault();
    
// //         // Prepare the data to be sent
// //         const marksData = {
// //             groupRegistrationNo: state.groupDetails?.groupRegistrationNo,
// //             markingType: state.selectedRubricType,
// //             memberMarks: [],
// //             groupComments: state.groupComments || '', // Ensure groupComments is not null or undefined
// //         };

// //         if (!state.rubrics) {
// //             console.error('Rubrics are not defined');
// //             return;
// //         }

// //         if (!state.marks) {
// //             console.error('Marks are not defined');
// //             return;
// //         }
// //         if (!state.groupDetails ) {
// //             console.error('Group details not defined');
// //             return;
// //         }
// //         if (!state.groupDetails.members) {
// //             console.error('members are not defined');
// //             return;
// //         }

        
    
// //         // Only proceed if `state.rubrics` and `state.groupDetails.members` are defined
// //         if (state.rubrics && state.groupDetails && state.groupDetails.members) {
// //             state.rubrics.forEach((rubric) => {
// //                 state.groupDetails.members.forEach((member) => {
// //                     const key = `${member.regNo}_${rubric.markingArea}`;
// //                     marksData.memberMarks.push({
// //                         memberRegNo: member.regNo,
// //                         memberName: member.name,
// //                         markingArea: rubric.markingArea,
// //                         mark: state.marks[key] || 0,
// //                         comment: state.comments[key] || '',
// //                     });
// //                 });
// //             });
    
// //             // Send POST request to the server
// //             try {
// //                 const response = await axios.post('/marksheet/marks', marksData);
// //                 console.log('Marks submission successful:', response.data);
// //                 setState((prevState) => ({
// //                     ...prevState,
// //                     submissionSuccess: true,
// //                     marks: {},
// //                     comments: {},
// //                     groupComments: '',
// //                     error: null,
// //                 }));
// //             } catch (error) {
// //                 console.error('Error during marks submission:', error);
// //                 setState((prevState) => ({ ...prevState, error: `Error: ${error.message}` }));
// //             }
// //         } else {
// //             console.error('Rubrics or group details members are not defined');
// //         }
// //     };
    


// //     return (
// //         <div className="container">
// //             <h1>Marking System</h1>

// //             {/* Display error message if any */}
// //             {state.error && <p className="text-danger">{state.error}</p>}

// //             {/* Display success message if marks were submitted successfully */}
// //             {state.submissionSuccess && (
// //                 <p className="text-success">
// //                     Marks for {state.groupDetails?.groupRegistrationNo} have been submitted successfully!
// //                 </p>
// //             )}

// //             {/* Select rubric type */}
// //             <div className="mb-3">
// //                 <label htmlFor="rubricType">Marking Rubric Type:</label>
// //                 <select
// //                     id="rubricType"
// //                     className="form-select"
// //                     value={state.selectedRubricType}
// //                     onChange={handleRubricTypeChange}
// //                 >
// //                     <option value="">-- Select Rubric Type --</option>
// //                     {state.rubricTypes && state.rubricTypes.map((type) => (
// //                         <option key={type} value={type}>
// //                             {type}
// //                         </option>
// //                     ))}
// //                 </select>
// //             </div>

// //             {/* Input for group registration number */}
// //             <div className="mb-3">
// //                 <label htmlFor="groupRegNo">Group Registration Number:</label>
// //                 <input
// //                     id="groupRegNo"
// //                     className="form-control"
// //                     type="text"
// //                     value={state.groupRegNo}
// //                     onChange={(event) => setState(prevState => ({ ...prevState, groupRegNo: event.target.value }))}
// //                 />
// //                 <button className="btn btn-primary mt-2" onClick={fetchGroupDetails}>
// //                     Search Group
// //                 </button>
// //             </div>

// //             {/* Form to input marks and comments */}
// //             {state.rubrics.length > 0 && state.groupDetails && (
// //                 <form onSubmit={handleSubmit}>
// //                     {state.rubrics.map((rubric) => (
// //                         <div key={rubric.markingArea} className="mb-4">
// //                             <h4>{rubric.markingArea} (Max marks: {rubric.marks})</h4>

// //                             <table className="table table-striped">
// //                                 <thead>
// //                                     <tr>
// //                                         <th>Registration No</th>
// //                                         <th>Member Name</th>
// //                                         <th>Mark</th>
// //                                         <th>Comment</th>
// //                                     </tr>
// //                                 </thead>
// //                                 <tbody>
// //                                     {[
// //                                         { regNo: state.groupDetails.leadersRegistrationNO, name: state.groupDetails.leaderName },
// //                                         { regNo: state.groupDetails.Member2RegistrationNO, name: state.groupDetails.Member2Name },
// //                                         { regNo: state.groupDetails.Member3RegistrationNO, name: state.groupDetails.Member3Name },
// //                                         { regNo: state.groupDetails.Member4RegistrationNO, name: state.groupDetails.Member4Name },
// //                                     ].map((member, index) => (
// //                                         <tr key={index}>
// //                                             <td>{member.regNo}</td>
// //                                             <td>{member.name}</td>
// //                                             <td>
// //                                                 <input
// //                                                     type="number"
// //                                                     className="form-control"
// //                                                     min="0"
// //                                                     max={rubric.marks}
// //                                                     value={state.marks[`${member.regNo}_${rubric.markingArea}`] || ''}
// //                                                     onChange={(event) => handleInputChange(event, member.regNo, rubric.markingArea)}
// //                                                 />
// //                                             </td>
// //                                             <td>
// //                                                 <input
// //                                                     type="text"
// //                                                     className="form-control"
// //                                                     value={state.comments[`${member.regNo}_${rubric.markingArea}`] || ''}
// //                                                     onChange={(event) => handleInputChange(event, member.regNo, rubric.markingArea, true)}
// //                                                 />
// //                                             </td>
// //                                         </tr>
// //                                     ))}
// //                                 </tbody>
                                

// //                             </table>
// //                         </div>
// //                     ))}

// //                     <div className="mb-4">
// //                         <h4>Group Comments</h4>
// //                         <textarea
// //                             className="form-control"
// //                             value={state.groupComments}
// //                             onChange={handleGroupCommentsChange}
// //                             rows="3"
// //                             placeholder="Enter group comments here"
// //                         />
// //                     </div>

// //                     <button type="submit" className="btn btn-success">Submit Marks</button>
// //                 </form>
// //             )}
// //         </div>
// //     );
// // };

// // export default MarkingSystem;
// // //+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// // // 
// // // import React, { useState, useEffect } from 'react';
// // // import axios from 'axios';

// // // const AssessmentMarks = () => {
// // //   const [markingRubricsTypes, setMarkingRubricsTypes] = useState([]);
// // //   const [selectedRubricType, setSelectedRubricType] = useState('');
// // //   const [groupRegistrations, setGroupRegistrations] = useState([]);
// // //   const [selectedGroup, setSelectedGroup] = useState('');
// // //   const [studentsMarks, setStudentsMarks] = useState([]);
// // //   const [marks, setMarks] = useState({});

// // //   axios.defaults.baseURL = 'http://localhost:3001';

// // //   useEffect(() => {
// // //     // Fetch marking rubrics types when the component mounts
// // //     axios.get('/marksheet/rubrics')
// // //       .then(response => setMarkingRubricsTypes(response.data))
// // //       .catch(err => console.error(err));
// // //   }, []);

// // //   const handleRubricTypeChange = (e) => {
// // //     setSelectedRubricType(e.target.value);
    
// // //     // Fetch groups when the rubric type changes
// // //     axios.get(`/marksheet/groups?rubricType=${e.target.value}`)
// // //       .then(response => setGroupRegistrations(response.data))
// // //       .catch(err => console.error(err));
// // //   };

// // //   const handleGroupChange = (e) => {
// // //     setSelectedGroup(e.target.value);
    
// // //     // Fetch student information for the selected group
// // //     axios.get(`/marksheet/groups/${e.target.value}/students`)
// // //       .then(response => setStudentsMarks(response.data))
// // //       .catch(err => console.error(err));
// // //   };

// // //   const handleMarkChange = (e, studentId, markingArea) => {
// // //     const { value } = e.target;
// // //     setMarks((prevMarks) => ({
// // //       ...prevMarks,
// // //       [studentId]: {
// // //         ...prevMarks[studentId],
// // //         [markingArea]: value,
// // //       },
// // //     }));
// // //   };

// // //   const handleSubmit = () => {
// // //     // Submit the marks to the server
// // //     axios.post(`/marksheet/marks`, {
// // //       group: selectedGroup,
// // //       rubricType: selectedRubricType,
// // //       marks,
// // //     })
// // //     .then(() => alert('Marks submitted successfully!'))
// // //     .catch(err => console.error(err));
// // //   };

// // //   return (
// // //     <div>
// // //       <h2>Assessment Marks</h2>
// // //       <div>
// // //         <label htmlFor="rubricType">Marking Rubric Type:</label>
// // //         <select id="rubricType" value={selectedRubricType} onChange={handleRubricTypeChange}>
// // //           <option value="">-- Select Rubric Type --</option>
// // //           {markingRubricsTypes.map((type) => (
// // //             <option key={type} value={type}>{type}</option>
// // //           ))}
// // //         </select>
// // //       </div>
      
// // //       <div>
// // //         <label htmlFor="group">Group Registration:</label>
// // //         <select id="group" value={selectedGroup} onChange={handleGroupChange}>
// // //           <option value="">-- Select Group --</option>
// // //           {groupRegistrations.map((group) => (
// // //             <option key={group.GroupRegistrationNo} value={group.GroupRegistrationNo}>
// // //               {group.GroupRegistrationNo} - {group.title}
// // //             </option>
// // //           ))}
// // //         </select>
// // //       </div>
      
// // //       {studentsMarks.length > 0 && (
// // //         <div>
// // //           <h3>Enter Marks for Students</h3>
// // //           {studentsMarks.map((student) => (
// // //             <div key={student.id}>
// // //               <h4>{student.name}</h4>
// // //               {student.markingAreas.map((area) => (
// // //                 <div key={area}>
// // //                   <label>{area}: </label>
// // //                   <input
// // //                     type="number"
// // //                     value={marks[student.id]?.[area] || ''}
// // //                     onChange={(e) => handleMarkChange(e, student.id, area)}
// // //                   />
// // //                 </div>
// // //               ))}
// // //             </div>
// // //           ))}
// // //           <button onClick={handleSubmit}>Submit Marks</button>
// // //         </div>
// // //       )}
// // //     </div>
// // //   );
// // // };

// // // export default AssessmentMarks;
// // //=====================================================
// // // import React, { useEffect, useState } from 'react';
// // // import axios from 'axios';

// // // function AssessmentMarks() {
// // //     const [rubrics, setRubrics] = useState([]);
// // //     const [selectedRubric, setSelectedRubric] = useState('');
// // //     const [groups, setGroups] = useState([]);
// // //     const [selectedGroup, setSelectedGroup] = useState('');
// // //     const [students, setStudents] = useState([]);
// // //     const [marks, setMarks] = useState({});
// // //     const [isLoading, setIsLoading] = useState(false);
// // //     axios.defaults.baseURL = 'http://localhost:3001';
    
// // //     useEffect(() => {
// // //         // Fetch rubrics from the server
// // //         async function fetchRubrics() {
// // //             try {
// // //                 const response = await axios.get('/marksheet/rubrics');
// // //                 setRubrics(response.data);
// // //             } catch (error) {
// // //                 console.error('Error fetching rubrics:', error);
// // //             }
// // //         }
// // //         fetchRubrics();
// // //     }, []);

// // //     useEffect(() => {
// // //         async function fetchGroups() {
// // //             try {
// // //                 const response = await axios.get('/marksheet/groups');
// // //                 setGroups(response.data);
// // //             } catch (error) {
// // //                 console.error('Error fetching groups:', error);
// // //             }
// // //         }
// // //         fetchGroups();
// // //     }, []);

// // //     useEffect(() => {
// // //         if (selectedGroup) {
// // //             // Fetch students in the selected group
// // //             async function fetchStudents() {
// // //                 try {
// // //                     const response = await axios.get(`/marksheet/groups/${selectedGroup}/students`);
// // //                     setStudents(response.data);
// // //                 } catch (error) {
// // //                     console.error('Error fetching students:', error);
// // //                 }
// // //             }
// // //             fetchStudents();
// // //         }
// // //     }, [selectedGroup]);

// // //     const handleMarkChange = (studentId, markingArea, value) => {
// // //         setMarks((prevMarks) => ({
// // //             ...prevMarks,
// // //             [studentId]: {
// // //                 ...prevMarks[studentId],
// // //                 [markingArea]: parseInt(value),
// // //             },
// // //         }));
// // //     };

// // //     const handleSubmit = async () => {
// // //         setIsLoading(true);
// // //         try {
// // //             const data = {
// // //                 group: selectedGroup,
// // //                 rubricType: selectedRubric,
// // //                 marks: Object.entries(marks).map(([studentId, studentMarks]) => ({
// // //                     studentId,
// // //                     marks: Object.entries(studentMarks).map(([markingArea, value]) => ({
// // //                         markingArea,
// // //                         marks: value,
// // //                     })),
// // //                 })),
// // //             };

// // //             const response = await axios.post('/marksheet/submit', data);
// // //             console.log('Marks submitted:', response.data);
// // //         } catch (error) {
// // //             console.error('Error submitting marks:', error);
// // //         }
// // //         setIsLoading(false);
// // //     };

// // //     return (
// // //         <div>
// // //             <h2>Assessment Marks</h2>

// // //             <div>
// // //                 <label htmlFor="rubricSelect">Select Rubric Type:</label>
// // //                 <select
// // //                     id="rubricSelect"
// // //                     value={selectedRubric}
// // //                     onChange={(e) => setSelectedRubric(e.target.value)}
// // //                 >
// // //                     <option value="">-- Select Rubric Type --</option>
// // //                     {rubrics.map((rubric) => (
// // //                         <option key={rubric._id} value={rubric.type}>
// // //                             {rubric.type}
// // //                         </option>
// // //                     ))}
// // //                 </select>
// // //             </div>

// // //             {selectedRubric && (
// // //                 <div>
// // //                     <label htmlFor="groupSelect">Select Group:</label>
// // //                     <select
// // //                         id="groupSelect"
// // //                         value={selectedGroup}
// // //                         onChange={(e) => setSelectedGroup(e.target.value)}
// // //                     >
// // //                         <option value="">-- Select Group --</option>
// // //                         {groups.map((group) => (
// // //                             <option key={group._id} value={group._id}>
// // //                                 {group.GroupRegistrationNo}
// // //                             </option>
// // //                         ))}
// // //                     </select>
// // //                 </div>
// // //             )}

// // //             {selectedGroup && (
// // //                 <div>
// // //                     <h3>Students in Group</h3>
// // //                     <table>
// // //                         <thead>
// // //                             <tr>
// // //                                 <th>Student</th>
// // //                                 {rubrics
// // //                                     .find((r) => r.type === selectedRubric)
// // //                                     ?.marking.map((area) => (
// // //                                         <th key={area.markingArea}>{area.markingArea}</th>
// // //                                     ))}
// // //                             </tr>
// // //                         </thead>
// // //                         <tbody>
// // //                             {students.map((student) => (
// // //                                 <tr key={student.id}>
// // //                                     <td>{student.name}</td>
// // //                                     {rubrics
// // //                                         .find((r) => r.type === selectedRubric)
// // //                                         ?.marking.map((area) => (
// // //                                             <td key={area.markingArea}>
// // //                                                 <input
// // //                                                     type="number"
// // //                                                     min="0"
// // //                                                     max={area.marks}
// // //                                                     value={marks[student.id]?.[area.markingArea] || ''}
// // //                                                     onChange={(e) => handleMarkChange(student.id, area.markingArea, e.target.value)}
// // //                                                 />
// // //                                             </td>
// // //                                         ))}
// // //                                 </tr>
// // //                             ))}
// // //                         </tbody>
// // //                     </table>
// // //                 </div>
// // //             )}

// // //             {selectedGroup && (
// // //                 <button disabled={isLoading} onClick={handleSubmit}>
// // //                     {isLoading ? 'Submitting...' : 'Submit Marks'}
// // //                 </button>
// // //             )}
// // //         </div>
// // //     );
// // // }

// // // export default AssessmentMarks;

// // import React, { useState, useEffect } from 'react';
// // import axios from 'axios';

// // const MarkingForm = () => {
// //     // State variables
// //     const [rubricTypes, setRubricTypes] = useState([]);
// //     const [rubricType, setRubricType] = useState('');
// //     const [groupRegistrationNo, setGroupRegistrationNo] = useState('');
// //     const [groupDetails, setGroupDetails] = useState(null);
// //     const [markingAreas, setMarkingAreas] = useState([]);
// //     const [studentMarks, setStudentMarks] = useState({});
// //     axios.defaults.baseURL = 'http://localhost:3001';
// //     // Fetch available rubric types when the component mounts
// //     useEffect(() => {
// //         const fetchRubricTypes = async () => {
// //             try {
// //                 const response = await axios.get('/marksheet/rubrics');
// //                 setRubricTypes(response.data);
// //             } catch (error) {
// //                 console.error('Failed to fetch rubric types:', error);
// //             }
// //         };
// //         fetchRubricTypes();
// //     }, []);

// //     // Fetch group details when the group registration number changes
// //     useEffect(() => {
// //         if (groupRegistrationNo) {
// //             const fetchGroupDetails = async () => {
// //                 try {
// //                     const response = await axios.get(`/marksheet/groups?regNo=${groupRegistrationNo}`);
// //                     setGroupDetails(response.data);
// //                 } catch (error) {
// //                     console.error('Failed to fetch group details:', error);
// //                     setGroupDetails(null);
// //                 }
// //             };
// //             fetchGroupDetails();
// //         } else {
// //             setGroupDetails(null);
// //         }
// //     }, [groupRegistrationNo]);

// //     // Fetch marking areas and initialize student marks when rubric type changes
// //     useEffect(() => {
// //         if (rubricType && groupDetails) {
// //             const fetchMarkingAreas = async () => {
// //                 try {
// //                     const response = await axios.get(`/marksheet/rubrics?type=${rubricType}`);
// //                     const areas = response.data;
// //                     setMarkingAreas(areas);

// //                     // Initialize student marks for each marking area
// //                     const initialMarks = areas.reduce((acc, area) => {
// //                         acc[area.markingArea] = {};
// //                         groupDetails.members.forEach((member) => {
// //                             acc[area.markingArea][member.registrationNo] = 0;
// //                         });
// //                         return acc;
// //                     }, {});
// //                     setStudentMarks(initialMarks);
// //                 } catch (error) {
// //                     console.error('Failed to fetch marking areas:', error);
// //                 }
// //             };
// //             fetchMarkingAreas();
// //         } else {
// //             setMarkingAreas([]);
// //             setStudentMarks({});
// //         }
// //     }, [rubricType, groupDetails]);

// //     // Handle rubric type change
// //     const handleRubricTypeChange = (e) => {
// //         setRubricType(e.target.value);
// //     };

// //     // Handle group registration number change
// //     const handleGroupRegistrationChange = (e) => {
// //         setGroupRegistrationNo(e.target.value);
// //     };

// //     // Handle mark change for a specific marking area and student
// //     const handleMarkChange = (markingArea, registrationNo, mark) => {
// //         setStudentMarks((prev) => ({
// //             ...prev,
// //             [markingArea]: {
// //                 ...prev[markingArea],
// //                 [registrationNo]: Number(mark),
// //             },
// //         }));
// //     };

// //     // Handle saving the marking data
// //     const handleSaveMarking = async () => {
// //         // Prepare the marking data
// //         const markingData = {
// //             groupRegistrationNo,
// //             markingType: rubricType,
// //             markingAreas: markingAreas.map((area) => ({
// //                 markingArea: area.markingArea,
// //                 studentMarks: Object.entries(studentMarks[area.markingArea]).map(
// //                     ([registrationNo, mark]) => ({
// //                         memberRegNo: registrationNo,
// //                         mark,
// //                     })
// //                 ),
// //             })),
// //         };

// //         // Send the marking data to the server
// //         try {
// //             const response = await axios.post('/marksheet/marks', markingData);
// //             alert('Marking saved successfully!');
// //             console.log('Saved marking:', response.data);
// //         } catch (error) {
// //             console.error('Failed to save marking:', error);
// //         }
// //     };

// //     return (
// //         <div>
// //             <h1>Marking Form</h1>
            
// //             {/* Rubric Type Selector */}
// //             <div>
// //                 <label>Rubric Type:</label>
// //                 <select value={rubricType} onChange={handleRubricTypeChange}>
// //                     <option value="">--Select a Rubric Type--</option>
// //                     {rubricTypes.map((type) => (
// //                         <option key={type} value={type}>
// //                             {type}
// //                         </option>
// //                     ))}
// //                 </select>
// //             </div>
            
// //             {/* Group Registration Number Input */}
// //             <div>
// //                 <label>Group Registration Number:</label>
// //                 <input
// //                     type="text"
// //                     value={groupRegistrationNo}
// //                     onChange={handleGroupRegistrationChange}
// //                 />
// //             </div>

// //             {/* Display Group Details */}
// //             {groupDetails && (
// //                 <div>
// //                     <h3>Group Details</h3>
// //                     <p>Group Registration Number: {groupDetails.GroupRegistrationNo}</p>
// //                     <p>Batch: {groupDetails.batch}</p>
// //                     <p>Specialization: {groupDetails.specialization}</p>
// //                     <p>Leader: {groupDetails.leaderName} (Registration No: {groupDetails.leadersRegistrationNO})</p>
// //                     {/* Display other group details as needed */}
// //                 </div>
// //             )}

// //             {/* Display Marking Areas and Input Marks for Each Student */}
// //             {markingAreas.map((area) => (
// //                 <div key={area.markingArea}>
// //                     <h4>{area.markingArea}</h4>
// //                     {groupDetails.members.map((member) => (
// //                         <div key={member.registrationNo}>
// //                             <label>{member.name}:</label>
// //                             <input
// //                                 type="number"
// //                                 min={0}
// //                                 max={area.marks}
// //                                 value={studentMarks[area.markingArea][member.registrationNo]}
// //                                 onChange={(e) => handleMarkChange(area.markingArea, member.registrationNo, e.target.value)}
// //                             />
// //                             / {area.marks}
// //                         </div>
// //                     ))}
// //                 </div>
// //             ))}

// //             {/* Save Button */}
// //             <button onClick={handleSaveMarking}>Save Marking</button>
// //         </div>
// //     );
// // };

// // export default MarkingForm;






// // import React, { useState, useEffect } from 'react';
// // import axios from 'axios';

// // const MarkingForm = () => {
// //     // State variables
// //     const [rubricTypes, setRubricTypes] = useState([]);
// //     const [rubricType, setRubricType] = useState('');
// //     const [groupRegistrationNo, setGroupRegistrationNo] = useState('');
// //     const [groupDetails, setGroupDetails] = useState(null);
// //     const [markingAreas, setMarkingAreas] = useState([]);
// //     const [studentMarks, setStudentMarks] = useState({});

// //     axios.defaults.baseURL = 'http://localhost:3001';
    
// //     // Fetch available rubric types when the component mounts
// //     useEffect(() => {
// //         const fetchRubricTypes = async () => {
// //             try {
// //                 const response = await axios.get('/marksheet/rubrics');
// //                 setRubricTypes(response.data || []);
// //             } catch (error) {
// //                 console.error('Failed to fetch rubric types:', error);
// //             }
// //         };
// //         fetchRubricTypes();
// //     }, []);

// //     // Fetch group details when the group registration number changes
// //     useEffect(() => {
// //         if (groupRegistrationNo) {
// //             const fetchGroupDetails = async () => {
// //                 try {
// //                     const response = await axios.get(`/marksheet/groups?regNo=${groupRegistrationNo}`);
// //                     setGroupDetails(response.data || null);
// //                 } catch (error) {
// //                     console.error('Failed to fetch group details:', error);
// //                     setGroupDetails(null);
// //                 }
// //             };
// //             fetchGroupDetails();
// //         } else {
// //             setGroupDetails(null);
// //         }
// //     }, [groupRegistrationNo]);

// //     // Fetch marking areas and initialize student marks when rubric type changes
// //     useEffect(() => {
// //         if (rubricType && groupDetails) {
// //             const fetchMarkingAreas = async () => {
// //                 try {
// //                     const response = await axios.get(`/marksheet/rubrics?type=${rubricType}`);
// //                     const areas = response.data || [];
// //                     setMarkingAreas(areas);

// //                     // Initialize student marks for each marking area
// //                     const initialMarks = areas.reduce((acc, area) => {
// //                         acc[area.markingArea] = {};
// //                         groupDetails.members.forEach((member) => {
// //                             acc[area.markingArea][member.registrationNo] = 0;
// //                         });
// //                         return acc;
// //                     }, {});
// //                     setStudentMarks(initialMarks);
// //                 } catch (error) {
// //                     console.error('Failed to fetch marking areas:', error);
// //                     setMarkingAreas([]);
// //                     setStudentMarks({});
// //                 }
// //             };
// //             fetchMarkingAreas();
// //         } else {
// //             setMarkingAreas([]);
// //             setStudentMarks({});
// //         }
// //     }, [rubricType, groupDetails]);

// //     // Handle rubric type change
// //     const handleRubricTypeChange = (e) => {
// //         setRubricType(e.target.value);
// //     };

// //     // Handle group registration number change
// //     const handleGroupRegistrationChange = (e) => {
// //         setGroupRegistrationNo(e.target.value);
// //     };

// //     // Handle mark change for a specific marking area and student
// //     const handleMarkChange = (markingArea, registrationNo, mark) => {
// //         // Validate mark input to be a number within a valid range
// //         const markValue = parseFloat(mark);
// //         if (isNaN(markValue) || markValue < 0 || markValue > markingAreas.find(area => area.markingArea === markingArea).marks) {
// //             console.warn('Invalid mark input:', mark);
// //             return;
// //         }

// //         // Update student marks
// //         setStudentMarks((prev) => ({
// //             ...prev,
// //             [markingArea]: {
// //                 ...prev[markingArea],
// //                 [registrationNo]: markValue,
// //             },
// //         }));
// //     };

// //     // Handle saving the marking data
// //     const handleSaveMarking = async () => {
// //         if (!groupRegistrationNo || !rubricType) {
// //             alert('Please select a group and rubric type.');
// //             return;
// //         }

// //         // Prepare the marking data
// //         const markingData = {
// //             groupRegistrationNo,
// //             markingType: rubricType,
// //             markingAreas: markingAreas.map((area) => ({
// //                 markingArea: area.markingArea,
// //                 studentMarks: Object.entries(studentMarks[area.markingArea] || {}).map(
// //                     ([registrationNo, mark]) => ({
// //                         memberRegNo: registrationNo,
// //                         mark,
// //                     })
// //                 ),
// //             })),
// //         };

// //         // Send the marking data to the server
// //         try {
// //             const response = await axios.post('/marksheet/marks', markingData);
// //             alert('Marking saved successfully!');
// //             console.log('Saved marking:', response.data);
// //         } catch (error) {
// //             console.error('Failed to save marking:', error);
// //             alert('Failed to save marking.');
// //         }
// //     };

// //     return (
// //         <div>
// //             <h1>Marking Form</h1>
            
// //             {/* Rubric Type Selector */}
// //             <div>
// //                 <label>Rubric Type:</label>
// //                 <select value={rubricType} onChange={handleRubricTypeChange}>
// //                     <option value="">--Select a Rubric Type--</option>
// //                     {rubricTypes.map((type, index) => (
// //                         <option key={index} value={type}>
// //                             {type}
// //                         </option>
// //                     ))}
// //                 </select>
// //             </div>
            
// //             {/* Group Registration Number Input */}
// //             <div>
// //                 <label>Group Registration Number:</label>
// //                 <input
// //                     type="text"
// //                     value={groupRegistrationNo}
// //                     onChange={handleGroupRegistrationChange}
// //                 />
// //             </div>

// //             {/* Display Group Details */}
// //             {groupDetails && (
// //                 <div>
// //                     <h3>Group Details</h3>
// //                     <p>Group Registration Number: {groupDetails.GroupRegistrationNo}</p>
// //                     <p>Batch: {groupDetails.batch}</p>
// //                     <p>Specialization: {groupDetails.specialization}</p>
// //                     <p>Leader: {groupDetails.leaderName} (Registration No: {groupDetails.leadersRegistrationNO})</p>
                    
// //                 </div>
// //             )}

// //             {/* Display Marking Areas and Input Marks for Each Student */}
// //             {markingAreas.map((area) => (
// //                 <div key={area.markingArea}>
// //                     <h4>{area.markingArea}</h4>
// //                     {groupDetails && groupDetails.members && groupDetails.members.map((member) => (
// //                         <div key={member.registrationNo}>
// //                             <label>{member.name}:</label>
// //                             <input
// //                                 type="number"
// //                                 min={0}
// //                                 max={area.marks}
// //                                 value={studentMarks[area.markingArea] ? studentMarks[area.markingArea][member.registrationNo] : 0}
// //                                 onChange={(e) => handleMarkChange(area.markingArea, member.registrationNo, e.target.value)}
// //                             />
// //                             / {area.marks}
// //                         </div>
// //                     ))}
// //                 </div>
// //             ))}

// //             {/* Save Button */}
// //             <button onClick={handleSaveMarking}>Save Marking</button>
// //         </div>
// //     );
// // };

// // export default MarkingForm;


// // import React, { useState, useEffect } from 'react';
// // import axios from 'axios';

// // const MarkingForm = () => {
// //     // State variables
// //     const [rubricTypes, setRubricTypes] = useState([]);
// //     const [rubricType, setRubricType] = useState('');
// //     const [groupRegistrationNo, setGroupRegistrationNo] = useState('');
// //     const [groupDetails, setGroupDetails] = useState(null);
// //     const [markingAreas, setMarkingAreas] = useState([]);
// //     const [studentMarks, setStudentMarks] = useState({});

// //     axios.defaults.baseURL = 'http://localhost:3001';
    
// //     // Fetch available rubric types when the component mounts
// //     useEffect(() => {
// //         const fetchRubricTypes = async () => {
// //             try {
// //                 const response = await axios.get('/marksheet/rubrics');
// //                 setRubricTypes(response.data || []);
// //             } catch (error) {
// //                 console.error('Failed to fetch rubric types:', error);
// //             }
// //         };
// //         fetchRubricTypes();
// //     }, []);

// //     // Fetch group details when the group registration number changes
// //     useEffect(() => {
// //         if (groupRegistrationNo) {
// //             const fetchGroupDetails = async () => {
// //                 try {
// //                     const response = await axios.get(`/marksheet/groups?regNo=${groupRegistrationNo}`);
// //                     setGroupDetails(response.data || null);
// //                 } catch (error) {
// //                     console.error('Failed to fetch group details:', error);
// //                     setGroupDetails(null);
// //                 }
// //             };
// //             fetchGroupDetails();
// //         } else {
// //             setGroupDetails(null);
// //         }
// //     }, [groupRegistrationNo]);

// //     // Fetch marking areas and initialize student marks when rubric type changes
// //     useEffect(() => {
// //         if (rubricType && groupDetails) {
// //             const fetchMarkingAreas = async () => {
// //                 try {
// //                     const response = await axios.get(`/marksheet/rubrics?type=${rubricType}`);
// //                     const areas = response.data || [];
// //                     setMarkingAreas(areas);

// //                     // Initialize student marks for each marking area
// //                     const initialMarks = areas.reduce((acc, area) => {
// //                         acc[area.markingArea] = {};
// //                         groupDetails.members.forEach((member) => {
// //                             acc[area.markingArea][member.registrationNo] = 0;
// //                         });
// //                         return acc;
// //                     }, {});
// //                     setStudentMarks(initialMarks);
// //                 } catch (error) {
// //                     console.error('Failed to fetch marking areas:', error);
// //                     setMarkingAreas([]);
// //                     setStudentMarks({});
// //                 }
// //             };
// //             fetchMarkingAreas();
// //         } else {
// //             setMarkingAreas([]);
// //             setStudentMarks({});
// //         }
// //     }, [rubricType, groupDetails]);

// //     // Handle rubric type change
// //     const handleRubricTypeChange = (e) => {
// //         setRubricType(e.target.value);
// //     };

// //     // Handle group registration number change
// //     const handleGroupRegistrationChange = (e) => {
// //         setGroupRegistrationNo(e.target.value);
// //     };

// //     // Handle mark change for a specific marking area and student
// //     const handleMarkChange = (markingArea, registrationNo, mark) => {
// //         // Validate mark input to be a number within a valid range
// //         const markValue = parseFloat(mark);
// //         if (isNaN(markValue) || markValue < 0 || markValue > markingAreas.find(area => area.markingArea === markingArea).marks) {
// //             console.warn('Invalid mark input:', mark);
// //             return;
// //         }

// //         // Update student marks
// //         setStudentMarks((prev) => ({
// //             ...prev,
// //             [markingArea]: {
// //                 ...prev[markingArea],
// //                 [registrationNo]: markValue,
// //             },
// //         }));
// //     };

// //     // Handle saving the marking data
// //     const handleSaveMarking = async () => {
// //         if (!groupRegistrationNo || !rubricType) {
// //             alert('Please select a group and rubric type.');
// //             return;
// //         }

// //         // Prepare the marking data
// //         const markingData = {
// //             groupRegistrationNo,
// //             markingType: rubricType,
// //             markingAreas: markingAreas.map((area) => ({
// //                 markingArea: area.markingArea,
// //                 studentMarks: Object.entries(studentMarks[area.markingArea] || {}).map(
// //                     ([registrationNo, mark]) => ({
// //                         memberRegNo: registrationNo,
// //                         mark,
// //                     })
// //                 ),
// //             })),
// //         };

// //         // Send the marking data to the server
// //         try {
// //             const response = await axios.post('/marksheet/marks', markingData);
// //             alert('Marking saved successfully!');
// //             console.log('Saved marking:', response.data);
// //         } catch (error) {
// //             console.error('Failed to save marking:', error);
// //             alert('Failed to save marking.');
// //         }
// //     };

// //     return (
// //         <div>
// //             <h1>Marking Form</h1>
            
// //             {/* Rubric Type Selector */}
// //             <div>
// //                 <label>Rubric Type:</label>
// //                 <select value={rubricType} onChange={handleRubricTypeChange}>
// //                     <option value="">--Select a Rubric Type--</option>
// //                     {rubricTypes.map((type, index) => (
// //                         <option key={index} value={type}>
// //                             {type}
// //                         </option>
// //                     ))}
// //                 </select>
// //             </div>
            
// //             {/* Group Registration Number Input */}
// //             <div>
// //                 <label>Group Registration Number:</label>
// //                 <input
// //                     type="text"
// //                     value={groupRegistrationNo}
// //                     onChange={handleGroupRegistrationChange}
// //                 />
// //             </div>

// //             {/* Display Group Details */}
// //             {groupDetails && (
// //                 <div>
// //                     <h3>Group Details</h3>
// //                     <p>Group Registration Number: {groupDetails.GroupRegistrationNo}</p>
// //                     <p>Batch: {groupDetails.batch}</p>
// //                     <p>Specialization: {groupDetails.specialization}</p>
// //                     <p>Leader: {groupDetails.leaderName} (Registration No: {groupDetails.leadersRegistrationNO})</p>
// //                     {/* Display other group details as needed */}
// //                 </div>
// //             )}

// //             {/* Display Marking Areas and Input Marks for Each Student */}
// //             {markingAreas.map((area) => (
// //                 <div key={area.markingArea}>
// //                     <h4>{area.markingArea}</h4>
// //                     {groupDetails && groupDetails.members && groupDetails.members.map((member) => (
// //                         <div key={member.registrationNo}>
// //                             <label>{member.name}:</label>
// //                             <input
// //                                 type="number"
// //                                 min={0}
// //                                 max={area.marks}
// //                                 value={studentMarks[area.markingArea] ? studentMarks[area.markingArea][member.registrationNo] : 0}
// //                                 onChange={(e) => handleMarkChange(area.markingArea, member.registrationNo, e.target.value)}
// //                             />
// //                             / {area.marks}
// //                         </div>
// //                     ))}
// //                 </div>
// //             ))}

// //             {/* Save Button */}
// //             <button onClick={handleSaveMarking}>Save Marking</button>
// //         </div>
// //     );
// // };

// // export default MarkingForm;

// import React, { useState } from 'react';
// import axios from 'axios';
// import RubricTypeSelector from './RubricTypeSelector';
// import GroupDetails from './GroupDetails';
// import MarkingAreas from './MarkingAreas';

// const MarkingForm = () => {
//     const [rubricType, setRubricType] = useState('');
//     const [groupRegistrationNo, setGroupRegistrationNo] = useState('');
//     const [groupDetails, setGroupDetails] = useState(null);
//     const [markingAreas, setMarkingAreas] = useState([]);
//     axios.defaults.baseURL = 'http://localhost:3001';
    
//     const handleRubricTypeChange = (type) => {
//         setRubricType(type);
//     };

//     const handleGroupRegistrationChange = async (e) => {
//         const regNo = e.target.value;
//         setGroupRegistrationNo(regNo);

//         // Fetch group details based on the entered registration number
//         try {
//             const response = await axios.get(`/marksheet/groups?regNo=${regNo}`);
//             setGroupDetails(response.data);
//         } catch (error) {
//             console.error('Failed to fetch group details:', error);
//             setGroupDetails(null);
//         }
//     };

//     const handleSaveMarking = async (markingData) => {
//         try {
//             // Make a POST request to save the marking data
//             const response = await axios.post('/marksheet/marks', markingData);
//             alert('Marking saved successfully!');
//             console.log('Saved marking:', response.data);
//         } catch (error) {
//             console.error('Failed to save marking:', error);
//         }
//     };

//     return (
//         <div>
//             <h1>Marking Form</h1>
//             <RubricTypeSelector onRubricTypeChange={handleRubricTypeChange} />
//             <div>
//                 <label>Group Registration Number:</label>
//                 <input
//                     type="text"
//                     value={groupRegistrationNo}
//                     onChange={handleGroupRegistrationChange}
//                 />
//             </div>

//             {groupDetails && (
//                 <GroupDetails group={groupDetails} />
//             )}

//             {rubricType && groupDetails && (
//                 <MarkingAreas
//                     rubricType={rubricType}
//                     groupDetails={groupDetails}
//                     onSaveMarking={handleSaveMarking}
//                 />
//             )}
//         </div>
//     );
// };

// export default MarkingForm;
