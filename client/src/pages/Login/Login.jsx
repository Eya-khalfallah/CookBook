import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Login.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [submitStatus, setSubmitStatus] = useState(null);
  const navigate = useNavigate();

  // Redirect if user is already logged in
  useEffect(() => {
    if (localStorage.getItem('token')) {
      navigate('/Profil');
    }
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const response = await axios.post('http://localhost:8000/users/login', { email, password });
      
      if (response.status === 200) {
        const { token, userData } = response.data;
        
        // Save token and user data in localStorage
        localStorage.setItem('token', token);
        localStorage.setItem('name', userData?.firstName || '');
        localStorage.setItem('last', userData?.lastName || '');
        localStorage.setItem('email', userData?.email || '');
        localStorage.setItem('photo', userData?.photo || '');

        setSubmitStatus({ message: 'Login successful', type: 'success' });

        // Reset fields and navigate to profile
        setEmail('');
        setPassword('');
        navigate('/Profil', { state: { userData } });
      } else {
        setSubmitStatus({ message: 'Invalid credentials', type: 'error' });
      }
    } catch (error) {
      if (error.response && error.response.status === 401) {
        setSubmitStatus({ message: 'Invalid credentials', type: 'error' });
      } else {
        setSubmitStatus({ message: 'Server error. Please try again later.', type: 'error' });
      }
    }
  };

  return (
    <div className="log-in">
      <div className="form-container">
        <div className="par22">
          <form onSubmit={handleSubmit}>
            <div className="box-outer">
              <h1>Log In</h1>
              <p>Welcome Back!</p>
            </div>

            {submitStatus && <div className={`alert ${submitStatus.type}`}>{submitStatus.message}</div>}

            <div className="form-control-sp">
              <label><b>Email:</b></label>
              <input
                type="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="form-control-sp">
              <label><b>Password:</b></label>
              <input
                type="password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <button type="submit">Login</button>
          </form>
        </div>
        <div className="par12"></div>
      </div>
    </div>
  );
};

export default Login;
