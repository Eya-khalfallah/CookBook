import React, { useState } from 'react';
import { getNames } from 'country-list';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './SignUp.css';


const countries = getNames();

const SignUp = () => {
  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [nationality, setNationality] = useState('');
  const [password, setPassword] = useState('');
  const [photo, setPhoto] = useState(null);
  const [submitStatus, setSubmitStatus] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const formData = new FormData();
    formData.append('email', email);
    formData.append('firstName', firstName);
    formData.append('lastName', lastName);
    formData.append('nationality', nationality);
    formData.append('password', password);
    formData.append('photo', photo);
  
    try {
      const response = await axios.post('http://localhost:8000/users/register', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      
      if (response.status === 201) {
        // User was successfully saved
        // Reset form fields
        setEmail('');
        setFirstName('');
        setLastName('');
        setNationality('');
        setPassword('');
        setPhoto(null);
        navigate('/login');
        setSubmitStatus({ message: 'User saved successfully', type: 'success' });

      } else {
        setSubmitStatus({ message: 'Error saving user', type: 'error' });

      }
    } catch (error) {
      setSubmitStatus({
        message: error.response?.data?.error || 'Error saving user',
        type: 'error',
      });
    }
    
    console.log(photo)
  };
  

  const handleNationalityChange = (e) => {
    setNationality(e.target.value);
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setPhoto(file);
  };
  return (
    <div className='sign-up'>
      <div className="form-container">
        <div className="par1">

        </div>
        <div className="par2">
        <form onSubmit={handleSubmit} encType="multipart/form-data" >
    <div class="box-outer">
        <h1>Sign Up</h1>
        <p>and oin this amazing community</p>
    </div>
    {submitStatus && <div className={`alert ${submitStatus.type}`}>{submitStatus.message}</div>}

      <div className="form-control-sp">
      <label><b>Email:</b></label>
      <input type="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
      </div>

      <div className="form-control-sp">
      <label><b>First Name:</b></label>
      <input type="text" name="firstName" value={firstName} onChange={(e) => setFirstName(e.target.value)} required />
      </div>

      <div className="form-control-sp">
      <label>Last Name:</label>
      <input type="text" name="lastName" value={lastName} onChange={(e) => setLastName(e.target.value)} required />
      </div>

       <div className="form-control-sp">
       <label>Nationality:</label>
      <select value={nationality} name="nationality" onChange={handleNationalityChange} required>
        <option value=""><p>Select a country</p></option>
        {countries.map((country) => (
          <option key={country} value={country}>
            {country}
          </option>
        ))}
      </select>
      </div>
      
      <div className="form-control-sp">
      <label>Password:</label>
      <input type="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
      </div>

      <div className="form-control form-control-sp">
          <label> Image</label>
          <input
            type="file"
            className="form-control"
            name="profile"
            accept="image/*"
            onChange={handleFileChange}
          />
        </div>

      <button type="submit">Sign up</button>
    </form>
        </div>
      </div>
    </div>
  );
};

export default SignUp;