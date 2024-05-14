import React, { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { useAuth } from "../App";
import axios from "axios";
import "./login.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [redirectToReferrer, setRedirectToReferrer] = useState(false);
  const { isLoggedIn, login, setUser } = useAuth();

  const username = "admin";
  const passwordd = "admin123";
  const token = btoa(`${username}:${passwordd}`);

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post(
        "http://localhost:3000/login",
        {
          Email: email,
          Password: password,
        },
        {
          headers: {
            Authorization: `Basic ${token}`,
          },
        }
      )
      .then((res) => {
        console.log(res.data);
        setError(null);
        setMessage(res.data.message);
        setUser(res.data.userID);
        login();
        setRedirectToReferrer(true);
      })
      .catch((err) => {
        console.error(err);
        setMessage(null);
        setError(err.response.data.error);
      });
  };
  console.log(isLoggedIn);

  if (isLoggedIn) {
    return <Navigate to="/" />;
  }

  return (
    <div className="login-container">
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
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
        <button type="submit">Login</button>
      </form>
      {message && <p className="message">{message}</p>}
      {error && <p className="error">{error}</p>}
      <div className="register-btn-container">
        <Link to="/register" className="register-btn">
          Register
        </Link>
      </div>
    </div>
  );
};

export default Login;
