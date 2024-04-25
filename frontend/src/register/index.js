import React, { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { useAuth } from "../App";
import axios from "axios";
import "./register.css";

const Register = () => {
  const [userName, setUserName] = useState("");
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [location, setLocation] = useState("");
  const [job, setJob] = useState("");
  const { isLoggedIn } = useAuth();
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const username='admin';
  const passwordd = 'admin123';
  const token = btoa(`${username}:${passwordd}`);

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post(
        "http://localhost:3000/register",
        {
          UserName: userName,
          FullName: fullName,
          Email: email,
          Password: password,
          PhoneNumber: phoneNumber,
          Location: location,
          Job: job,
        },
        {
          headers: {
            Authorization: `Basic ${token}`
          },
        }
      )
      .then((res) => {
        console.log(res.data);
        setMessage(res.data.message);
        setError(null);
      })
      .catch((err) => {
        console.error(err);
        setError(err.response.data.error);
        setMessage(null);
      });
  };

  if (isLoggedIn) {
    return <Navigate to="/" />;
  }

  return (
    <div className="register-container">
      <h1>Register</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="User Name"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Full Name"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          required
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <input
          type="tel"
          placeholder="Phone Number"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Job"
          value={job}
          onChange={(e) => setJob(e.target.value)}
          required
        />
        <button type="submit">Register</button>
      </form>
      {message && <p className="message">{message}</p>}
      {error && <p className="error">{error}</p>}
      <div className="login-btn-container">
        <Link to="/login">Login</Link>
      </div>
    </div>
  );
};

export default Register;
