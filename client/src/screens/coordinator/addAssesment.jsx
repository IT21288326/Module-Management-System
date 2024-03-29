import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFilePdf, faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';

const AddAssessment = () => {
  const [formData, setFormData] = useState({
    assessment: '',
    pdf: null
  });

  const [formErrors, setFormErrors] = useState({});
  const [assessments, setAssessments] = useState([]);
  axios.defaults.baseURL = 'http://localhost:3001';
  
  useEffect(() => {
    // Fetch assessments from API and update state
    const fetchAssessments = async () => {
      try {
        const response = await axios.get('/api/assessments');
        setAssessments(response.data);
      } catch (error) {
        console.error('Error fetching assessments:', error);
      }
    };

    fetchAssessments();
  }, []); // Fetch assessments only once when component mounts

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFormData({ ...formData, pdf: file });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append('assessment', formData.assessment);
      formData.append('pdf', formData.pdf);

      const response = await axios.post('/api/assessments', formData, {
          headers: {
              'Content-Type': 'multipart/form-data'
          }
      });

      console.log(response.data);
      // Reset form fields after successful submission if needed
      setFormData({ assessment: '', pdf: null });
      // Refresh the list of assessments
      setAssessments(prevAssessments => [...prevAssessments, response.data]);
    } catch (error) {
      console.error('Error submitting assessment:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`/api/assessments/${id}`);
      // Remove the deleted assessment from the list
      setAssessments(prevAssessments => prevAssessments.filter(assessment => assessment.id !== id));
    } catch (error) {
      console.error('Error deleting assessment:', error);
    }
  };

  // Dummy data for initial assessments
  const initialAssessments = [
    { id: 1, title: 'Assessment 1', description: 'Description for Assessment 1' },
    { id: 2, title: 'Assessment 2', description: 'Description for Assessment 2' },
    { id: 3, title: 'Assessment 3', description: 'Description for Assessment 3' }
  ];

  return (
    <div className="container" >
      <h2 className="mt-4 mb-7">Add Assessment</h2>
      <form onSubmit={handleSubmit}>
          <div className="col-md-7">
            <div className="mb-4">
              <label className="form-label">Assessment:</label>
              <textarea
                name="assessment"
                value={formData.assessment}
                onChange={handleChange}
                className="form-control"
                required
              />
            </div>
          </div>
          <div className="col-md-5">
            <div className="mb-3">
              <label className="form-label">Upload PDF:</label>
              <div className="input-group">
                <input
                  type="file"
                  accept=".pdf"
                  onChange={handleFileChange}
                  className="form-control"
                  required
                />
                <button type="button" className="btn btn-outline-secondary">
                  <FontAwesomeIcon icon={faFilePdf} />
                </button>
              </div>
            </div>
          </div>
          <div className="col-md-2 d-flex justify-content-left align-items-end">
            <button type="submit" className="btn btn-primary">Submit</button>
          </div>
       
      </form>

    <br></br> <br></br>
      <h2 className="mt-4 mb-4">Added Assessments</h2>
      <div className="row">
        {/* Dummy data for initial assessments */}
        {initialAssessments.map(assessment => (
          <div key={assessment.id} className="col-md-4 mb-3">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">{assessment.title}</h5>
                <p className="card-text">{assessment.description}</p>
                <div className="d-flex justify-content-between">
                  <button className="btn btn-info">
                    <FontAwesomeIcon icon={faEdit} />
                  </button>
                  <button className="btn btn-danger" onClick={() => handleDelete(assessment.id)}>
                    <FontAwesomeIcon icon={faTrash} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
        {/* Dynamic data for assessments */}
        {assessments.map(assessment => (
          <div key={assessment.id} className="col-md-4 mb-3">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">{assessment.title}</h5>
                <p className="card-text">{assessment.description}</p>
                <div className="d-flex justify-content-between">
                  <button className="btn btn-info">
                    <FontAwesomeIcon icon={faEdit} />
                  </button>
                  <button className="btn btn-danger" onClick={() => handleDelete(assessment.id)}>
                    <FontAwesomeIcon icon={faTrash} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AddAssessment;
