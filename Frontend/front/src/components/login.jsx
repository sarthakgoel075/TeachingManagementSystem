import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
// import './signup.css';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const [signup,setsignup]=useState('false')
  function handleSubmit(e) {
    e.preventDefault();

    fetch("https://teachingmanagementsystem-1.onrender.com/api/v1/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    })
      .then((res) => res.json())
      .then((resData) => {
        const token = resData?.data?.access_token;

        if (token) {
          localStorage.setItem("token", token);
          navigate("/students");
        } else {
          alert("Login failed. No token received.");
        }
      })
      .catch((err) => {
        console.error("Login error:", err);
        alert("Something went wrong during login.");
      });
  }
  function handlesignup(e){
    e.preventDefault();
    setsignup(true);
    navigate('/signup');
  }
  return (
     <div>
       <button className="toggle" onClick={handlesignup}>Signup</button>
           
    <form onSubmit={handleSubmit}>
      <label>Email:
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
      </label>
      <label>Password:
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
      </label>
      <button type="submit">Submit</button>
    </form>
    </div>
  );
}
