import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faQuestionCircle, faPhone } from '@fortawesome/free-solid-svg-icons';

const LoginForm = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      // Simulating API call with setTimeout
      await new Promise(resolve => setTimeout(resolve, 1000));
      // Upon success, you can redirect the user or perform other actions
      console.log('Login successful');
    } catch (err) {
      setError('Invalid email or password');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container " style={{ maxWidth: '600px' ,fontSize:"large",marginTop:'8%'}}>
      <div className="row justify-content-center align-items-center" >
        <div className="col-md-12">
          <div className="card">
            <div className="card-body">
              <h2 className=" text-center mb-4" style={{ fontSize: '40px' }}>Sign in to your account</h2>
              {error && <div className="alert alert-danger mb-3" role="alert">{error}</div>}
              <form onSubmit={handleSubmit}>
                <div className="mb-4">
                  <label htmlFor="email" className="form-label">Email address:</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="form-control"
                    id="email"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label htmlFor="password" className="form-label">Password:</label>
                  <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    className="form-control"
                    id="password"
                    required
                  />
                </div>
                <button type="submit" className="btn btn-primary " disabled={loading} style={{width:"430px",marginTop:"30px", marginLeft:"50px",marginBottom:"5%"}} >
                  {loading ? 'Signing in...' : 'Sign in'}
                </button>
              </form>
              <div className="mt-3 text-center">
                <a href="/forgot-password" style={{ color: 'black' }}>
                  <FontAwesomeIcon icon={faQuestionCircle} className="me-3" style={{ fontSize: '20px', marginRight: '10px' }} />
                  Forgot Password?
                </a>
                <span className="mx-2">|</span>
                <a href="/contact-support" style={{ color: 'black' }}>
                  <FontAwesomeIcon icon={faPhone} className="me-3" style={{ fontSize: '20px', marginRight: '10px' }} />
                  Contact Support
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
