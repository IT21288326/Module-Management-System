import React, { useState } from 'react';
import axios from 'axios';

export default function AddProjectCoordinator() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccessMessage(null);

    try {
      // Send a POST request to your backend endpoint to send the email
      const response = await axios.post('/send-email', { email });
      setSuccessMessage(response.data);
    } catch (error) {
      setError(error.response.data);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6 offset-md-3">
          <div className="card mt-5">
            <div className="card-body">
              <h2 className="card-title text-center mb-4">Add New Project Coordinator</h2>
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label htmlFor="email">Email address</label>
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    placeholder="Enter email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                {loading && <p className="text-center">Sending email...</p>}
                {error && <p className="text-center text-danger">{error}</p>}
                {successMessage && <p className="text-center text-success">{successMessage}</p>}
                <div className="d-grid">
                  <button type="submit" className="btn btn-primary">
                    Send Invitation Email
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
