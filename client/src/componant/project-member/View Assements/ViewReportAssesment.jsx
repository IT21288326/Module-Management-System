
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import UpdateAssesment from '../Update Assesment/UpdateAssement';
import AddAssessmentForm from '../Add Assesment/AddAssesment'; // Import the AddAssessmentForm component
import AddIcon from '@mui/icons-material/Add';
import './assesment.scss';

const ViewReportAssessments = () => {
  const [assessments, setAssessments] = useState([]);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [assessmentToUpdate, setAssessmentToUpdate] = useState(null);
  const [showAddForm, setShowAddForm] = useState(false); // State to control AddAssessmentForm display

  useEffect(() => {
    const fetchAssessments = async () => {
      try {
        const response = await axios.get('http://localhost:3001/assesment');
        const filteredAssessments = response.data.filter(assessment => assessment.assement_type === 'Report');
        setAssessments(filteredAssessments);
      } catch (error) {
        console.error('Failed to fetch assessments', error);
      }
    };
  
    fetchAssessments();
    const interval = setInterval(fetchAssessments, 2000); // Fetch assessments every 2 seconds
  
    return () => clearInterval(interval);
  }, []);
  
  const deleteAssessment = async (id) => {
    const result = await Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    });

    if (result.isConfirmed) {
      try {
        await axios.delete(`http://localhost:3001/assesment/${id}`);
        setAssessments(assessments.filter((assessment) => assessment._id !== id));
        Swal.fire('Deleted!', 'Your assessment has been deleted.', 'success');
      } catch (error) {
        console.error('Failed to delete assessment', error);
        Swal.fire('Failed!', 'Failed to delete the assessment.', 'error');
      }
    }
  };

  const handleUpdateClick = (assessmentId) => {
    setAssessmentToUpdate(assessmentId);
    setShowUpdateModal(true);
  };

  const handleCloseModal = () => {
    setShowUpdateModal(false);
    setShowAddForm(false); // Close AddAssessmentForm when modal is closed
  };

  return (
    <div className='Russa_assessment-container'>
      <h2>Added Report Assessments</h2>
      <button className="Russa_PresentationShedeuleTable_addNew" onClick={() => setShowAddForm(true)}>
        <AddIcon />
        Add New Assessment
      </button>

      
      {assessments.map((assessment) => (
        <div className="card mb-3" key={assessment._id}>
          <div className="card-body">
            <h5 className="card-title">{assessment.assement_Name}</h5>
            <p className="card-text description-box">
              <h6>Asesment Type</h6>{assessment.assement_type}
              <hr />
              <h6>Weightage</h6>{assessment.weightage}
              <hr />
              <h6>Time-period</h6>{assessment.timePeriod}
              <hr />
              <h6>Description</h6>{assessment.description}
            </p>
            <div className="card-buttons">
              {/* <button className="Marking-Rubric-button">Marking Rubric</button> */}
              <button className="update-button" onClick={() => handleUpdateClick(assessment._id)}>Update</button>
              <button className="delete-button" onClick={() => deleteAssessment(assessment._id)}>Delete</button>
            </div>
            <p className="card-text date-left"><small className="text-muted">Updated on {new Date(assessment.dateAdded).toLocaleDateString()}</small></p>
          </div>
        </div>
      ))}

      {/* Conditionally render UpdateAssesment modal */}
      {showUpdateModal && (
        <UpdateAssesment
          onClose={handleCloseModal}
          AssesmentId={assessmentToUpdate}
          onSuccess={() => {
            axios
              .get('http://localhost:3001/assesment')
              .then((response) => setAssessments(response.data))
              .catch((error) => console.error('Failed to refetch assessments', error));
            handleCloseModal(); // Close modal after successful update
          }}
        />
      )}

      {/* Conditionally render AddAssessmentForm */}
      {showAddForm && <AddAssessmentForm onClose={() => setShowAddForm(false)} />}
    </div>
  );
};

export default ViewReportAssessments;













