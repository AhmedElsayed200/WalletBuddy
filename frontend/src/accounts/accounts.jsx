import React, { useState, useEffect } from "react";
import axios from "axios";
import "./accounts.css"; 
import { useAuth } from "../App";
import { Link, Navigate } from "react-router-dom";


const Accounts = () => {
  const [accounts, setAccounts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [error, setError] = useState("");

  const { isLoggedIn, userId } = useAuth();
  
  useEffect(() => {
    fetchAccounts();
  }, [searchTerm]);

  const fetchAccounts = async () => {
    try {
      const response = await axios.get(
        `https://advanced-db-be-b37701fafad7.herokuapp.com/accounts?UserID=${userId}&AccountName=${searchTerm}`
      );
      setAccounts(response.data.reminders);
    } catch (err) {
      console.error("Failed to fetch accounts:", err);
      setError(err.response.data.error);
    }
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  if (!isLoggedIn) {
    return <Navigate to="/login" />;
  }

  return (
    <div className="accounts-container">
      <h2>Bank Accounts</h2>
      <input
        type="text"
        placeholder="Search by name..."
        value={searchTerm}
        onChange={handleSearch}
        className="search-input"
      />
      <ul className="accounts-list">
        {accounts.map((account) => (
          <li key={account.AccountID}>
            <Link to={`/bank-accounts/${account.AccountName}`}>
              {account.AccountName}
            </Link>
          </li>
        ))}
      </ul>
      {error && <p className="error">{error}</p>}
    </div>
  );
};

export default Accounts;
