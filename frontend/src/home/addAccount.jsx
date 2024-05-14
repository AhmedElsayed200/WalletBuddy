import React, { useEffect, useState } from "react";
import { useAuth } from "../App";
import axios from "axios";
import "./addAccount.css"; 

const AddAccount = () => {
  const [accountName, setAccountName] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const { userId } = useAuth();

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post("http://localhost:3000/accounts", {
      AccountName: accountName,
      userID: userId,
    })
    .then((res) => {
      console.log(res.data);
      setError(null)
      setMessage(res.data.message);
    })
    .catch((err) => {
      console.error(err);
      setMessage(null)
      setError(err.response.data.error);
    });
  };
  useEffect(()=>{},[]);
  
  
  return (
    <div className="add-account-container">
      <h2>Add Account</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Account Name:
          <input
            type="text"
            value={accountName}
            onChange={(e) => setAccountName(e.target.value)}
            required
          />
        </label>
        <button type="submit">Add Account</button>
      </form>
      {message && <p className="message">{message}</p>}
      {error && <p className="error">{error}</p>}
    </div>
  );
};

export default AddAccount;
