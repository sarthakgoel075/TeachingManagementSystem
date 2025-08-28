import React, { useState } from 'react';
import './signup.css';
import { useNavigate } from 'react-router-dom';

function Signup() {
  const [formData, setFormData] = useState({
    name: '',
    subject: '',
    email:'',
    password: '',
    age: 0,
  });
  const [error,seterror] = useState('')
   const navigate = useNavigate();
  const handleChange = (e) => {
    setFormData({ 
      ...formData, 
      [e.target.name]: e.target.value 
    });
  };

 const handleSubmit = async (e) => {
  e.preventDefault();
  seterror(''); 

  try {
    const response = await fetch("http://localhost:5000/api/v1/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData)
    });

    const result = await response.json();
    if (!response.ok) {
      if (Array.isArray(result.detail)) {
        const msgs = result.detail.map((d) => d.msg || JSON.stringify(d));
        seterror(msgs.join(' | '));
      } else if (typeof result === 'object') {
        seterror(result.message || JSON.stringify(result));
      } else {
        seterror(result.toString());
      }
      navigate('/');
    } else {
      console.log("Server response:", result);
    }
  } catch (err) {
    seterror(err.message || 'Unknown error');
    console.error("Error sending data:", err);
  }
};
const hanglelogin = (e) => {  
  e.preventDefault();
  navigate('/');
}

  return (
    <div>
      <button className='toggle' onClick={hanglelogin}>login</button>
      <form className="form" onSubmit={handleSubmit}>
        <label>
          Name:
          <input name="name" type="text" placeholder="Enter your name" onChange={handleChange} />
        </label>
       
        <label>
          Email ID:
          <input name="email" type="email" placeholder="abc@gmail.com" onChange={handleChange} />
        </label>
        <label>
          Password:
          <input name="password" type="password" placeholder="4-8 digit" onChange={handleChange} />
        </label>
        <label>
          Age:
          <input name="age" type="text" onChange={handleChange} />
        </label>
        <button type="submit" onClick={handleSubmit}>Submit</button>
              {error && <h3 style={{color: 'white'}}>{error}</h3>}   

      </form>
    </div>
  );
}

export default Signup;
