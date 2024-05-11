import React, { useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import CancelIcon from '@mui/icons-material/Cancel';
import "./addAssesment.scss"

const AddAssessmentForm = ({onClose}) => {
  const [assessmentName, setAssessmentName] = useState('');
  const [description, setDescription] = useState('');
  const [assessmentType, setAssessmentType] = useState('');
  const [weightage, setWeightage] = useState('');
  const [timePeriod, setTimePeriod] = useState('');
  const [dateAdded, setDateAdded] = useState(new Date().toISOString().split('T')[0]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newAssessment = {
      assement_Name: assessmentName,
      description,
      assement_type: assessmentType,
      weightage,
      timePeriod,
      dateAdded
    };
    try {
      await axios.post('http://localhost:3001/assesment', newAssessment);
      // Clear the form after successful submission
      setAssessmentName('');
      setDescription('');
      setAssessmentType('');
      setWeightage('');
      setTimePeriod('');
      setDateAdded('');
      onClose();
  
      // Display success message
      Swal.fire(
        'Success!',
        'Assessment has been added successfully.',
        'success'
      );
    } catch (error) {
      console.error(error);
  
      // Display error message
      Swal.fire(
        'Error!',
        'There was a problem adding the assessment.',
        'error'
      );
    }
  };

  return (
    <div className="Russa_add_assesment">
      <div className="Russa_modal-overlay">
        <div className="Russa_modal-content">
          <button className="Russa_close-modal-button" onClick={onClose}>
            <CancelIcon />
          </button>
          <h1 className="Russa_add_pr_shd_form-title">Add New Schedule Record</h1>
          <form onSubmit={handleSubmit}>
            <div className="user-input-box">
              <label>Assessment Type:</label>
              <select
                id="type"
                className="form-control"
                value={assessmentType}
                onChange={e => setAssessmentType(e.target.value)}
                required
              >
                <option value="">Choose an Assessment Type</option>
                <option value="Presentation">Presentation</option>
                <option value="Report">Report</option>
                <option value="Viva">Viva</option>
                <option value="Prototype">Prototype</option>
              </select>
            </div>

            <div className="user-input-box">
              <label htmlFor="assessmentName">Assessment Name</label>
              <input
                id="assessmentName"
                type="text" 
                className="form-control" 
                value={assessmentName} 
                onChange={e => setAssessmentName(e.target.value)} 
                required
              />
            </div>

            <div className="user-input-box">
              <label>Date Added:</label>
              <input 
                type="date" 
                className="form-control" 
                value={dateAdded} 
                onChange={e => setDateAdded(e.target.value)} 
                readOnly 
              />
            </div>

            <div className="user-input-box">
              <label>Description:</label>
              <input 
                type='textarea'
                className="form-control" 
                value={description} 
                onChange={e => setDescription(e.target.value)} 
                required 
              />
            </div>

            <div className="user-input-box">
              <label>Weightage:</label>
              <input 
                type="text" 
                className="form-control" 
                value={weightage} 
                onChange={e => setWeightage(e.target.value)} 
                required 
              />
            </div>

            <div className="user-input-box">
              <label>Time Period:</label>
              <input 
                type="text" 
                className="form-control" 
                value={timePeriod} 
                onChange={e => setTimePeriod(e.target.value)} 
              />
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

export default AddAssessmentForm;






