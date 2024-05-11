// // // import React, { useState } from 'react';
// // // import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// // // import { faQuestionCircle, faPhone } from '@fortawesome/free-solid-svg-icons';

// // // const LoginForm = () => {
// // //   const [formData, setFormData] = useState({
// // //     email: '',
// // //     password: ''
// // //   });
// // //   const [loading, setLoading] = useState(false);
// // //   const [error, setError] = useState('');

// // //   const handleChange = (e) => {
// // //     const { name, value } = e.target;
// // //     setFormData({ ...formData, [name]: value });
// // //   };

// // //   const handleSubmit = async (e) => {
// // //     e.preventDefault();
// // //     setLoading(true);
// // //     setError('');
// // //     try {
// // //       // Simulating API call with setTimeout
// // //       await new Promise(resolve => setTimeout(resolve, 1000));
// // //       // Upon success, you can redirect the user or perform other actions
// // //       console.log('Login successful');
// // //     } catch (err) {
// // //       setError('Invalid email or password');
// // //     } finally {
// // //       setLoading(false);
// // //     }
// // //   };

// // //   return (
// // //     <div style={{height:'100%'}}>
// // //     <div className="container " style={{ maxWidth: '600px' ,fontSize:"large"}}>
// // //       <div className="row justify-content-center align-items-center" >
// // //         <div className="col-md-12">
// // //           <div className="card">
// // //             <div className="card-body">
// // //               <h2 className=" text-center mb-4" style={{ fontSize: '40px' }}>Sign in to your account</h2>
// // //               {error && <div className="alert alert-danger mb-3" role="alert">{error}</div>}
// // //               <form onSubmit={handleSubmit}>
// // //                 <div className="mb-4">
// // //                   <label htmlFor="email" className="form-label">Email address:</label>
// // //                   <input
// // //                     type="email"
// // //                     name="email"
// // //                     value={formData.email}
// // //                     onChange={handleChange}
// // //                     className="form-control"
// // //                     id="email"
// // //                     required
// // //                   />
// // //                 </div>
// // //                 <div className="mb-4">
// // //                   <label htmlFor="password" className="form-label">Password:</label>
// // //                   <input
// // //                     type="password"
// // //                     name="password"
// // //                     value={formData.password}
// // //                     onChange={handleChange}
// // //                     className="form-control"
// // //                     id="password"
// // //                     required
// // //                   />
// // //                 </div>
// // //                 <button type="submit" className="btn btn-primary " disabled={loading} style={{width:"430px",marginTop:"30px", marginLeft:"50px",marginBottom:"5%"}} >
// // //                   {loading ? 'Signing in...' : 'Sign in'}
// // //                 </button>
// // //               </form>
// // //               <div className="mt-3 text-center">
// // //                 <a href="/forgot-password" style={{ color: 'black' }}>
// // //                   <FontAwesomeIcon icon={faQuestionCircle} className="me-3" style={{ fontSize: '20px', marginRight: '10px' }} />
// // //                   Forgot Password?
// // //                 </a>
// // //                 <span className="mx-2">|</span>
// // //                 <a href="/contact-support" style={{ color: 'black' }}>
// // //                   <FontAwesomeIcon icon={faPhone} className="me-3" style={{ fontSize: '20px', marginRight: '10px' }} />
// // //                   Contact Support
// // //                 </a>
// // //               </div>
// // //             </div>
// // //           </div>
// // //         </div>
// // //       </div>
// // //     </div>
// // //     </div>
// // //   );
// // // };

// // // export default LoginForm;


// // // import React, { useState } from 'react';
// // // import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// // // import { faQuestionCircle, faPhone } from '@fortawesome/free-solid-svg-icons';
// // // import backgroundImage from '../../img/back1.jpg'; // Import your background image

// // // const LoginForm = () => {
// // //   const [formData, setFormData] = useState({
// // //     email: '',
// // //     password: ''
// // //   });
// // //   const [loading, setLoading] = useState(false);
// // //   const [error, setError] = useState('');

// // //   const handleChange = (e) => {
// // //     const { name, value } = e.target;
// // //     setFormData({ ...formData, [name]: value });
// // //   };

// // //   const handleSubmit = async (e) => {
// // //     e.preventDefault();
// // //     setLoading(true);
// // //     setError('');
// // //     try {
// // //       // Simulating API call with setTimeout
// // //       await new Promise(resolve => setTimeout(resolve, 1000));
// // //       // Upon success, you can redirect the user or perform other actions
// // //       console.log('Login successful');
// // //     } catch (err) {
// // //       setError('Invalid email or password');
// // //     } finally {
// // //       setLoading(false);
// // //     }
// // //   };

// // //   return (
// // //     <div
// // //       className="container d-flex justify-content-center align-items-center"
// // //       style={{
// // //         height:'800px'
// // //       }}
// // //     >
// // //       <div className="container" style={{ maxWidth: '600px', fontSize: "large" }}>
// // //         <div className="card">
// // //           <div className="card-body">
// // //             <h2 className="text-center mb-4" style={{ fontSize: '40px' }}>Sign in to your account</h2>
// // //             {error && <div className="alert alert-danger mb-3" role="alert">{error}</div>}
// // //             <form onSubmit={handleSubmit}>
// // //               <div className="mb-4">
// // //                 <label htmlFor="email" className="form-label">Email address:</label>
// // //                 <input
// // //                   type="email"
// // //                   name="email"
// // //                   value={formData.email}
// // //                   onChange={handleChange}
// // //                   className="form-control"
// // //                   id="email"
// // //                   required
// // //                 />
// // //               </div>
// // //               <div className="mb-4">
// // //                 <label htmlFor="password" className="form-label">Password:</label>
// // //                 <input
// // //                   type="password"
// // //                   name="password"
// // //                   value={formData.password}
// // //                   onChange={handleChange}
// // //                   className="form-control"
// // //                   id="password"
// // //                   required
// // //                 />
// // //               </div>
// // //               <button type="submit" className="btn btn-primary w-100" disabled={loading} style={{ fontSize: '30px' }} >
// // //                 {loading ? 'Signing in...' : 'Sign in'}
// // //               </button>
// // //             </form>
// // //             <div className="mt-3 text-center">
// // //               <a href="/forgot-password" style={{ color: 'black' }}>
// // //                 <FontAwesomeIcon icon={faQuestionCircle} className="me-3" style={{ fontSize: '20px', marginRight: '10px' }} />
// // //                 Forgot Password?
// // //               </a>
// // //               <span className="mx-2">|</span>
// // //               <a href="/contact-support" style={{ color: 'black' }}>
// // //                 <FontAwesomeIcon icon={faPhone} className="me-3" style={{ fontSize: '20px', marginRight: '10px' }} />
// // //                 Contact Support
// // //               </a>
// // //             </div>
// // //           </div>
// // //         </div>
// // //       </div>
// // //     </div>
// // //   );
// // // };

// // // export default LoginForm;
// // import React, { useState } from 'react';
// // import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// // import { faQuestionCircle, faPhone } from '@fortawesome/free-solid-svg-icons';
// // import axios from 'axios';

// // const LoginForm = () => {
// //   const [formData, setFormData] = useState({
// //     email: '',
// //     password: ''
// //   });
// //   const [loading, setLoading] = useState(false);
// //   const [error, setError] = useState('');

// //   const handleChange = (e) => {
// //     const { name, value } = e.target;
// //     setFormData({ ...formData, [name]: value });
// //   };

// //   const handleSubmit = async (e) => {
// //     e.preventDefault();
// //     setLoading(true);
// //     setError('');
// //     try {
// //       // Send a POST request to the authentication endpoint
// //       const response = await axios.post('http://localhost:3001/login/auth', {
// //         email: formData.email,
// //         password: formData.password
// //       });

// //       // Extract user data and token from the response
// //       const { token, user } = response.data;

// //       // Store the token in local storage (optional)
// //       localStorage.setItem('authToken', token);

// //       // Check the user's role
// //       if (user.staffRoles === 'projectCoordinator') {
// //         // Redirect to the project coordinator page
// //         window.location.href = 'http://localhost:3000/coo';
// //       } else {
// //         // Handle other roles as needed
// //         console.log('Login successful, but user is not a project coordinator');
// //       }
// //     } catch (error) {
// //       // Handle login errors
// //       setError('Invalid email or password');
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   return (
// //     <div
// //       className="container d-flex justify-content-center align-items-center"
// //       style={{ height: '800px' }}
// //     >
// //       <div className="container" style={{ maxWidth: '600px', fontSize: 'large' }}>
// //         <div className="card">
// //           <div className="card-body">
// //             <h2 className="text-center mb-4" style={{ fontSize: '40px' }}>Sign in to your account</h2>
// //             {error && <div className="alert alert-danger mb-3" role="alert">{error}</div>}
// //             <form onSubmit={handleSubmit}>
// //               <div className="mb-4">
// //                 <label htmlFor="email" className="form-label">Email address:</label>
// //                 <input
// //                   type="email"
// //                   name="email"
// //                   value={formData.email}
// //                   onChange={handleChange}
// //                   className="form-control"
// //                   id="email"
// //                   required
// //                 />
// //               </div>
// //               <div className="mb-4">
// //                 <label htmlFor="password" className="form-label">Password:</label>
// //                 <input
// //                   type="password"
// //                   name="password"
// //                   value={formData.password}
// //                   onChange={handleChange}
// //                   className="form-control"
// //                   id="password"
// //                   required
// //                 />
// //               </div>
// //               <button type="submit" className="btn btn-primary w-100" disabled={loading} style={{ fontSize: '30px' }}>
// //                 {loading ? 'Signing in...' : 'Sign in'}
// //               </button>
// //             </form>
// //             <div className="mt-3 text-center">
// //               <a href="/forgot-password" style={{ color: 'black' }}>
// //                 <FontAwesomeIcon icon={faQuestionCircle} className="me-3" style={{ fontSize: '20px', marginRight: '10px' }} />
// //                 Forgot Password?
// //               </a>
// //               <span className="mx-2">|</span>
// //               <a href="/contact-support" style={{ color: 'black' }}>
// //                 <FontAwesomeIcon icon={faPhone} className="me-3" style={{ fontSize: '20px', marginRight: '10px' }} />
// //                 Contact Support
// //               </a>
// //             </div>
// //           </div>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // };

// // export default LoginForm;
// import React, { useState } from 'react';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faQuestionCircle, faPhone } from '@fortawesome/free-solid-svg-icons';
// import axios from 'axios';

// const LoginForm = () => {
//   const [formData, setFormData] = useState({
//     email: '',
//     password: ''
//   });
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState('');

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     setError('');
    
//     try {
//         // Send a POST request to your backend login endpoint
//         const response = await axios.post('http://localhost:3001/login/auth', {
//             email: formData.email,
//             password: formData.password
//         });

//         // Upon success, extract the token, redirectURL, and user data from the response
//         const { token, redirectURL, user } = response.data;

//         // Store the token in local storage
//         localStorage.setItem('authToken', token);

//         // Check the user's staff role and redirect accordingly
//         if (user.staffRole === 'projectCoordinator') {
//             // Redirect to project coordinator's page
//             window.location.href = 'http://localhost:3000/coo';
//         } else {
//             // Redirect to default URL provided in the response
//             window.location.href = redirectURL;
//         }
//     } catch (err) {
//         // Check for server error details and log it
//         console.error('Server error:', err);

//         // Check if an error message was returned by the server
//         if (err.response && err.response.data) {
//             setError(err.response.data.message || 'Invalid email or password');
//         } else {
//             setError('An error occurred while signing in');
//         }
//     } finally {
//         setLoading(false);
//     }
//   };

//   return (
//     <div
//       className="container d-flex justify-content-center align-items-center"
//       style={{
//         height: '800px'
//       }}
//     >
//       <div className="container" style={{ maxWidth: '600px', fontSize: "large" }}>
//         <div className="card">
//           <div className="card-body">
//             <h2 className="text-center mb-4" style={{ fontSize: '40px' }}>Sign in to your account</h2>
//             {error && (
//               <div className="alert alert-danger mb-3" role="alert">
//                 {error}
//               </div>
//             )}
//             <form onSubmit={handleSubmit}>
//               <div className="mb-4">
//                 <label htmlFor="email" className="form-label">Email address:</label>
//                 <input
//                   type="email"
//                   name="email"
//                   value={formData.email}
//                   onChange={handleChange}
//                   className="form-control"
//                   id="email"
//                   required
//                 />
//               </div>
//               <div className="mb-4">
//                 <label htmlFor="password" className="form-label">Password:</label>
//                 <input
//                   type="password"
//                   name="password"
//                   value={formData.password}
//                   onChange={handleChange}
//                   className="form-control"
//                   id="password"
//                   required
//                 />
//               </div>
//               <button
//                 type="submit"
//                 className="btn btn-primary w-100"
//                 disabled={loading}
//                 style={{ fontSize: '30px' }}
//               >
//                 {loading ? 'Signing in...' : 'Sign in'}
//               </button>
//             </form>
//             <div className="mt-3 text-center">
//               <a href="/forgot-password" style={{ color: 'black' }}>
//                 <FontAwesomeIcon
//                   icon={faQuestionCircle}
//                   className="me-3"
//                   style={{ fontSize: '20px', marginRight: '10px' }}
//                 />
//                 Forgot Password?
//               </a>
//               <span className="mx-2">|</span>
//               <a href="/contact-support" style={{ color: 'black' }}>
//                 <FontAwesomeIcon
//                   icon={faPhone}
//                   className="me-3"
//                   style={{ fontSize: '20px', marginRight: '10px' }}
//                 />
//                 Contact Support
//               </a>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default LoginForm;
import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faQuestionCircle, faPhone } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';

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
        // Send a POST request to your backend login endpoint
        const response = await axios.post('http://localhost:3001/login/auth', {
            Email: formData.email,
            Password: formData.password
        });

        // Upon success, extract the token, redirectURL, and user data from the response
        const { token, redirectURL, user } = response.data;

        // Store the token in local storage for future requests
        localStorage.setItem('authToken', token);

        // Check the user's role and redirect accordingly
        if (user.role === 'student') {
            // Redirect to project coordinator's page
            window.location.href = 'http://localhost:3000/registration';
        } else {
          if(user.staffRoles.includes('examiner')){
            // Redirect to default URL provided in the response
            window.location.href = 'http://localhost:3000/ex';
        }
      else if(user.staffRoles.includes('projectCoordinator')){
        window.location.href = 'http://localhost:3000/';
        
      }else if(user.staffRoles.includes('projectMember')){
        window.location.href = 'http://localhost:3000/projMemberSideBar';
      }
      else if(user.staffRoles.includes('co-supervisor')){
        window.location.href = 'http://localhost:3000/co-sup';
      }
      else if(user.staffRoles.includes('supervisor')){
        window.location.href = 'http://localhost:3000/'
      }
    }
    } catch (err) {
        // Enhanced error handling
        console.error('Server error:', err);
        if (err.response && err.response.data) {
            setError(err.response.data.message || 'Invalid email or password');
        } else {
            setError('An error occurred while signing in');
        }
    } finally {
        setLoading(false);
    }
  };

  return (
    <div
      className="container d-flex justify-content-center align-items-center"
      style={{ height: '800px' }}
    >
      <div className="container" style={{ maxWidth: '600px', fontSize: 'large' }}>
        <div className="card">
          <div className="card-body">
            <h2 className="text-center mb-4" style={{ fontSize: '40px' }}>Sign in to your account</h2>
            {error && (
              <div className="alert alert-danger mb-3" role="alert">
                {error}
              </div>
            )}
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
              <button
                type="submit"
                className="btn btn-primary w-100"
                disabled={loading}
                style={{ fontSize: '30px' }}
              >
                {loading ? 'Signing in...' : 'Sign in'}
              </button>
            </form>
            <div className="mt-3 text-center">
              <a href="/forgot-password" style={{ color: 'black' }}>
                <FontAwesomeIcon
                  icon={faQuestionCircle}
                  className="me-3"
                  style={{ fontSize: '20px', marginRight: '10px' }}
                />
                Forgot Password?
              </a>
              <span className="mx-2">|</span>
              <a href="/contact-support" style={{ color: 'black' }}>
                <FontAwesomeIcon
                  icon={faPhone}
                  className="me-3"
                  style={{ fontSize: '20px', marginRight: '10px' }}
                />
                Contact Support
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
