// import React, { useState, useEffect } from 'react';
// import axios from 'axios';

// function GroupRegistrationTable() {
//   const [groupRegistrations, setGroupRegistrations] = useState([]);
//   const [selectedRegistration, setSelectedRegistration] = useState(null); // State for selected registration to update

//   useEffect(() => {
//     const fetchData = async () => {
//       const response = await axios.get('http://localhost:3001/api/GrpRegistration');
//       setGroupRegistrations(response.data);
//     };

//     fetchData();
//   }, []);

//   const handleDelete = async (registrationId) => {
//     try {
//       const response = await axios.delete(`http://localhost:3001/api/GrpRegistration/${registrationId}`);
//       setGroupRegistrations(groupRegistrations.filter((reg) => reg._id !== registrationId));
//     } catch (error) {
//       console.error('Error deleting registration:', error);
//     }
//   };

//   const handleUpdate = async (registration) => {
//     try {
//       const response = await axios.put(`http://localhost:3001/api/GrpRegistration/${registration._id}`, registration);
//       const updatedRegistration = response.data;

//       // Update local state directly with the updated registration
//       setGroupRegistrations(
//         groupRegistrations.map((reg) => (reg._id === updatedRegistration._id ? updatedRegistration : reg))
//       );
//       setSelectedRegistration(null); // Clear selected registration after update
//     } catch (error) {
//       console.error('Error updating registration:', error);
//     }
//   };

//   const handleEditClick = (registration) => {
//     setSelectedRegistration(registration); // Set selected registration for editing
//   };

//   const handleInputChange = (event) => {
//     if (selectedRegistration) {
//       setSelectedRegistration({
//         ...selectedRegistration,
//         [event.target.name]: event.target.value,
//       });
//     }
//   };
//   return (
//     <div style={{ display: 'flex', justifyContent: 'center' }}>
//       <table>
//         <thead>
//           <tr>
//           <th colSpan={24} style={{ textAlign: 'center' }}>Group Registration Details</th><br></br><br></br><br></br>



//           </tr>
//           <tr>
//             <th >Reg No</th><br></br>
//             <th>Batch</th>
//             <th>Specialization</th>
//             <th>leadersRegistrationNO</th>
//             <th>leaderName</th>
//             <th>leaderContactNo</th>
//             <th>leaderEmailAddress</th>
//             <th>Member2RegistrationNO</th>
//             <th>Member2Name</th>
//             <th>Member2ContactNo</th>
//             <th>Member2EmailAddress</th>
//             <th>Member3RegistrationNO</th>
//             <th>Member3Name</th>
//             <th>Member3ContactNo</th>
//             <th>Member3EmailAddress</th>
//             <th>Member4RegistrationNO</th>
//             <th>Member4Name</th>
//             <th>Member4ContactNo</th>
//             <th>Member4EmailAddress</th>
//             <th>title</th>
//             <th>area</th>
//             <th>supervisor</th>
//             <th>Cosupervisor</th>



            
//           </tr>
//         </thead>
//         <tbody>
//           {groupRegistrations.map((registration) => (
//             <tr key={registration._id}>
//               <td>{registration.GroupRegistrationNo}</td><br></br>
//               <td>
//                 {selectedRegistration && selectedRegistration._id === registration._id ? (
//                   <input type="text" name="batch" value={selectedRegistration.batch} onChange={handleInputChange} />
//                 ) : (
//                   <span>{registration.batch}</span>
//                 )}
//               </td>
//               <td>
//                 {selectedRegistration && selectedRegistration._id === registration._id ? (
//                   <input type="text" name="specialization" value={selectedRegistration.specialization} onChange={handleInputChange} />
//                 ) : (
//                   <span>{registration.specialization}</span>
//                 )}
//               </td>
//               <td>
//                 {selectedRegistration && selectedRegistration._id === registration._id ? (
//                   <input type="text" name="leadersRegistrationNO" value={selectedRegistration.leadersRegistrationNO} onChange={handleInputChange} />
//                 ) : (
//                   <span>{registration.leadersRegistrationNO}</span>
//                 )}
//               </td>
//               <td>
//                 {selectedRegistration && selectedRegistration._id === registration._id ? (
//                   <input type="text" name="leaderName" value={selectedRegistration.leaderName} onChange={handleInputChange} />
//                 ) : (
//                   <span>{registration.leaderName}</span>
//                 )}
//               </td>
//               <td>
//                 {selectedRegistration && selectedRegistration._id === registration._id ? (
//                   <input type="text" name="leaderContactNo" value={selectedRegistration.leaderContactNo} onChange={handleInputChange} />
//                 ) : (
//                   <span>{registration.leaderContactNo}</span>
//                 )}
//               </td>
//               <td>
//                 {selectedRegistration && selectedRegistration._id === registration._id ? (
//                   <input type="text" name="leaderEmailAddress" value={selectedRegistration.leaderEmailAddress} onChange={handleInputChange} />
//                 ) : (
//                   <span>{registration.leaderEmailAddress}</span>
//                 )}
//               </td>
//               <td>
//                 {selectedRegistration && selectedRegistration._id === registration._id ? (
//                   <input type="text" name="Member2RegistrationNO" value={selectedRegistration.Member2RegistrationNO} onChange={handleInputChange} />
//                 ) : (
//                   <span>{registration.Member2RegistrationNO}</span>
//                 )}
//               </td>
//               <td>
//                 {selectedRegistration && selectedRegistration._id === registration._id ? (
//                   <input type="text" name="batMember2Namech" value={selectedRegistration.Member2Name} onChange={handleInputChange} />
//                 ) : (
//                   <span>{registration.Member2Name}</span>
//                 )}
//               </td>
//               <td>
//                 {selectedRegistration && selectedRegistration._id === registration._id ? (
//                   <input type="text" name="Member2EmailAddress" value={selectedRegistration.Member2EmailAddress} onChange={handleInputChange} />
//                 ) : (
//                   <span>{registration.Member2EmailAddress}</span>
//                 )}
//               </td>
//               <td>
//                 {selectedRegistration && selectedRegistration._id === registration._id ? (
//                   <input type="text" name="Member3RegistrationNO" value={selectedRegistration.Member3RegistrationNO} onChange={handleInputChange} />
//                 ) : (
//                   <span>{registration.Member3RegistrationNO}</span>
//                 )}
//               </td>
//               <td>
//                 {selectedRegistration && selectedRegistration._id === registration._id ? (
//                   <input type="text" name="Member3Name" value={selectedRegistration.Member3Name} onChange={handleInputChange} />
//                 ) : (
//                   <span>{registration.Member3Name}</span>
//                 )}
//               </td>
//               <td>
//                 {selectedRegistration && selectedRegistration._id === registration._id ? (
//                   <input type="text" name="Member3ContactNo" value={selectedRegistration.Member3ContactNo} onChange={handleInputChange} />
//                 ) : (
//                   <span>{registration.Member3ContactNo}</span>
//                 )}
//               </td>
//               <td>
//                 {selectedRegistration && selectedRegistration._id === registration._id ? (
//                   <input type="text" name="Member3EmailAddress" value={selectedRegistration.Member3EmailAddress} onChange={handleInputChange} />
//                 ) : (
//                   <span>{registration.Member3EmailAddress}</span>
//                 )}
//               </td>
//               <td>
//                 {selectedRegistration && selectedRegistration._id === registration._id ? (
//                   <input type="text" name="Member4RegistrationNO" value={selectedRegistration.Member4RegistrationNO} onChange={handleInputChange} />
//                 ) : (
//                   <span>{registration.Member4RegistrationNO}</span>
//                 )}
//               </td>
//               <td>
//                 {selectedRegistration && selectedRegistration._id === registration._id ? (
//                   <input type="text" name="Member4Name" value={selectedRegistration.Member4Name} onChange={handleInputChange} />
//                 ) : (
//                   <span>{registration.Member4Name}</span>
//                 )}
//               </td>
//               <td>
//                 {selectedRegistration && selectedRegistration._id === registration._id ? (
//                   <input type="text" name="Member4ContactNo" value={selectedRegistration.Member4ContactNo} onChange={handleInputChange} />
//                 ) : (
//                   <span>{registration.Member4ContactNo}</span>
//                 )}
//               </td>
//               <td>
//                 {selectedRegistration && selectedRegistration._id === registration._id ? (
//                   <input type="text" name="Member4EmailAddress" value={selectedRegistration.Member4EmailAddress} onChange={handleInputChange} />
//                 ) : (
//                   <span>{registration.Member4EmailAddress}</span>
//                 )}
//               </td>
//               <td>
//                 {selectedRegistration && selectedRegistration._id === registration._id ? (
//                   <input type="text" name="title" value={selectedRegistration.title} onChange={handleInputChange} />
//                 ) : (
//                   <span>{registration.title}</span>
//                 )}
//               </td>
//               <td>
//                 {selectedRegistration && selectedRegistration._id === registration._id ? (
//                   <input type="text" name="area" value={selectedRegistration.area} onChange={handleInputChange} />
//                 ) : (
//                   <span>{registration.area}</span>
//                 )}
//               </td>
//               <td>
//                 {selectedRegistration && selectedRegistration._id === registration._id ? (
//                   <input type="text" name="supervisor" value={selectedRegistration.supervisor} onChange={handleInputChange} />
//                 ) : (
//                   <span>{registration.supervisor}</span>
//                 )}
//               </td>
//               <td>
//                 {selectedRegistration && selectedRegistration._id === registration._id ? (
//                   <input type="text" name="Cosupervisor" value={selectedRegistration.Cosupervisor} onChange={handleInputChange} />
//                 ) : (
//                   <span>{registration.Cosupervisor}</span>
//                 )}
//               </td>
//               <td>
//                 {selectedRegistration && selectedRegistration._id === registration._id ? (
//                   <>
//                     <button onClick={() => handleUpdate(selectedRegistration)}>Save</button>
//                     <button onClick={() => setSelectedRegistration(null)}>Cancel</button>
//                   </>
//                 ) : (
//                   <button onClick={() => handleEditClick(registration)}>Edit</button>
//                 )}
//                 <button onClick={() => handleDelete(registration._id)}>Delete</button>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// }

// export default GroupRegistrationTable;

















// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import './regFetch.css';
// import Swal from 'sweetalert2';


// function GroupRegistrationTable() {
//     const [groupRegistrations, setGroupRegistrations] = useState([]);
//     const [editedRegistration, setEditedRegistration] = useState(null);
  
//     useEffect(() => {
//       const fetchData = async () => {
//         try {
//           const response = await axios.get('http://localhost:3001/api/GrpRegistration');
//           setGroupRegistrations(response.data);
          
//         } catch (error) {
//           console.error('Error fetching group registrations:', error);
//         }
//       };
  
//       fetchData();
//     }, []);
  
//     const handleDelete = async (id) => {
//       try {
//         await axios.delete(`http://localhost:3001/api/GrpRegistration/${id}`);
//         setGroupRegistrations(groupRegistrations.filter(registration => registration._id !== id));
//         Swal.fire({
//             icon: 'success',
//             title: 'Deleted!',
//             text: 'Registration has been deleted successfully!',
//           });
//     } catch (error) {
//         console.error('Error deleting group registration:', error);
//       }
//     };
  
//     const handleEdit = (registration) => {
//       setEditedRegistration({ ...registration });
//     };
  
//     const handleSave = async () => {
//       try {
//         const response = await axios.put(`http://localhost:3001/api/GrpRegistration/${editedRegistration._id}`, editedRegistration);
//         const updatedRegistration = response.data;
  
//         setGroupRegistrations(
//           groupRegistrations.map((registration) => (registration._id === updatedRegistration._id ? updatedRegistration : registration))
//         );
//         setEditedRegistration(null);
//         Swal.fire({
//             icon: 'success',
//             title: 'Saved!',
//             text: 'Changes have been saved successfully!',
//           });
//       } catch (error) {
//         console.error('Error updating registration:', error);
//       }
//     };
  
//     const handleCancel = () => {
//       setEditedRegistration(null);
//       Swal.fire({
//         icon: 'info',
//         title: 'Cancelled',
//         text: 'Changes have been cancelled!',
//       });
//     };
  
//     const handleInputChange = (e) => {
//       const { name, value } = e.target;
//       setEditedRegistration((prev) => ({
//         ...prev,
//         [name]: value,
//       }));
//     };



//   return (
//     <div className="container">
//       <h2 className="text-center mb-4">Group Details</h2>
//       <div className="row justify-content-center">
//         {groupRegistrations.map((registration) => (
//           <div key={registration._id} className="col-md-6 mb-3"> {/* Adjust the column width here */}
//             <div className="card text-center">
//               <div className="card-body">
//                 <ul className="list-group list-group-flush">
//                   <li className="list-group-item">Group Registration No: {registration.GroupRegistrationNo}</li>
//                   <li className="list-group-item">Title: {registration.title}</li>
//                   <li className="list-group-item">Area: {registration.area}</li>

//                   <li className="list-group-item">
//                     <div className="row justify-content-center">
//                       <div className="col-md-6 mb-2">
//                         Batch: {registration.batch}
//                       </div>
//                       <div className="col-md-6">
//                         Specialization: {registration.specialization}
//                       </div>
//                     </div>
//                   </li>
//                   <li className="list-group-item">
//                     <div className="row justify-content-center">
//                       <div className="col-md-6 mb-2">
//                       leader Registration NO: {registration.leadersRegistrationNO}
//                       </div>
//                       <div className="col-md-6">
//                       leader Name: {registration.leaderName}
//                       </div>
//                     </div>
//                   </li>
//                   <li className="list-group-item">
//                     <div className="row justify-content-center">
//                       <div className="col-md-6 mb-2">
//                       leader Contact No: {registration.leaderContactNo}
//                       </div>
//                       <div className="col-md-6">
//                       leader Email Address: {registration.leaderEmailAddress}
//                       </div>
//                     </div>
//                   </li>
//                   <li className="list-group-item">
//                     <div className="row justify-content-center">
//                       <div className="col-md-6 mb-2">
//                       Member2 Registration NO: {registration.Member2RegistrationNO}
//                       </div>
//                       <div className="col-md-6">
//                       Member2 Name: {registration.Member2Name}
//                       </div>
//                     </div>
//                   </li>
//                   <li className="list-group-item">
//                     <div className="row justify-content-center">
//                       <div className="col-md-6 mb-2">
//                       Member2 Contact No: {registration.Member2ContactNo}
//                       </div>
//                       <div className="col-md-6">
//                       Member2 Email Address: {registration.Member2EmailAddress}
//                       </div>
//                     </div>
//                   </li>
//                   <li className="list-group-item">
//                     <div className="row justify-content-center">
//                       <div className="col-md-6 mb-2">
//                       Member3 Registration NO: {registration.Member3RegistrationNO}
//                       </div>
//                       <div className="col-md-6">
//                       Member3 Name: {registration.Member3Name}
//                       </div>
//                     </div>
//                   </li>
//                   <li className="list-group-item">
//                     <div className="row justify-content-center">
//                       <div className="col-md-6 mb-2">
//                       Member3 Contact No: {registration.Member3ContactNo}
//                       </div>
//                       <div className="col-md-6">
//                       Member3 Email Address: {registration.Member3EmailAddress}
//                       </div>
//                     </div>
//                   </li>
//                   <li className="list-group-item">
//                     <div className="row justify-content-center">
//                       <div className="col-md-6 mb-2">
//                       Member4 Registration NO: {registration.Member4RegistrationNO}
//                       </div>
//                       <div className="col-md-6">
//                       Member 4 Name:                  {registration.Member4Name}
//                       </div>
//                     </div>
//                   </li>
//                   <li className="list-group-item">
//                     <div className="row justify-content-center">
//                       <div className="col-md-6 mb-2">
//                       Member4 Contact No: {registration.Member4ContactNo}
//                       </div>
//                       <div className="col-md-6">
//                       Member4 Email Address: {registration.Member4EmailAddress}
//                       </div>
//                     </div>
//                   </li>
//                   <li className="list-group-item">
//                     <div className="row justify-content-center">
//                       <div className="col-md-6 mb-2">
//                       Supervisor: {registration.supervisor}
//                       </div>
//                       <div className="col-md-6">
//                       Co-supervisor: {registration.Cosupervisor}
//                       </div>
//                     </div>
//                   </li>
                  
                 
                 
//                   {/* Add more list items as needed */}
//                 </ul>
//               </div>
//               <div className="card-footer">
//                 <button className="btn btn-danger" onClick={() => handleDelete(registration._id)}>Delete</button>
//                 {editedRegistration && editedRegistration._id === registration._id ? (
//                   <>
//                     <button className="btn btn-success mr-2" onClick={handleSave}>Save</button>
//                     <button className="btn btn-secondary" onClick={handleCancel}>Cancel</button>
//                   </>
//                 ) : (
//                   <button className="btn btn-primary" onClick={() => handleEdit(registration)}>Edit</button>
//                 )}
//               </div>

//             </div>
//           </div>
//         ))}
//          {/* Add a conditional check to display message when there are no registrations */}
//          {groupRegistrations.length === 0 && (
//           <p className="text-center">There are no any Group Registrations!</p>
//         )}
//       </div>
//     </div>
//   );
// }

// export default GroupRegistrationTable;


// /Latest

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './regFetch.css';
import Swal from 'sweetalert2';

function GroupRegistrationTable() {
  const [groupRegistrations, setGroupRegistrations] = useState([]);
  const [editedRegistration, setEditedRegistration] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:3001/api/GrpRegistration');
        setGroupRegistrations(response.data);
      } catch (error) {
        console.error('Error fetching group registrations:', error);
      }
    };

    fetchData();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3001/api/GrpRegistration/${id}`);
      setGroupRegistrations(groupRegistrations.filter(registration => registration._id !== id));
      Swal.fire({
        icon: 'success',
        title: 'Deleted!',
        text: 'Registration has been deleted successfully!',
      });
    } catch (error) {
      console.error('Error deleting group registration:', error);
    }
  };

  const handleEdit = (registration) => {
    setEditedRegistration({ ...registration });
  };

  const handleSave = async () => {
    try {
      const response = await axios.put(`http://localhost:3001/api/GrpRegistration/${editedRegistration._id}`, editedRegistration);
      const updatedRegistration = response.data;

      setGroupRegistrations(
        groupRegistrations.map((registration) => (registration._id === updatedRegistration._id ? updatedRegistration : registration))
      );
      setEditedRegistration(null);
      Swal.fire({
        icon: 'success',
        title: 'Saved!',
        text: 'Changes have been saved successfully!',
      });
    } catch (error) {
      console.error('Error updating registration:', error);
    }
  };

  const handleCancel = () => {
    setEditedRegistration(null);
    Swal.fire({
      icon: 'info',
      title: 'Cancelled',
      text: 'Changes have been cancelled!',
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedRegistration((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div className="container">
      <h2 className="text-center mb-4">Group Details</h2>
      <div className="row justify-content-center">
        {groupRegistrations.map((registration) => (
          <div key={registration._id} className="col-md-6 mb-3">
            <div className="card text-center">
              <div className="card-body">
                <ul className="list-group list-group-flush">
                  {Object.entries(registration).map(([key, value]) => {
                    if (key !== '_id' && key !== '__v') {
                      return (
                        <li key={key} className="list-group-item">
                          <label>{key}:</label>
                          {key === 'GroupRegistrationNo' ? (
                            <span>{value}</span>
                          ) : (
                            <>
                              {editedRegistration && editedRegistration._id === registration._id ? (
                                <input
                                  type="text"
                                  name={key}
                                  value={editedRegistration[key]}
                                  onChange={handleInputChange}
                                />
                              ) : (
                                <span>{value}</span>
                              )}
                            </>
                          )}
                        </li>
                      );
                    }
                    return null;
                  })}
                </ul>
              </div>
              <div className="card-footer">
                <button className="btn btn-danger" onClick={() => handleDelete(registration._id)}>Delete</button>
                {editedRegistration && editedRegistration._id === registration._id ? (
                  <>
                    <button className="btn btn-success mr-2" onClick={handleSave}>Save</button>
                    <button className="btn btn-secondary" onClick={handleCancel}>Cancel</button>
                  </>
                ) : (
                  <button className="btn btn-primary" onClick={() => handleEdit(registration)}>Edit</button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
      {groupRegistrations.length === 0 && (
        <p className="text-center">There are no any Group Registrations!</p>
      )}
    </div>
  );
}

export default GroupRegistrationTable;






