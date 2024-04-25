import React, { useState } from "react";
import axios from "axios";
import "./addReminder.css";

const AddReminder = () => {
  const [accountID, setAccountID] = useState("");
  const [date, setDate] = useState("");
  const [amount, setAmount] = useState("");
  const [billName, setBillName] = useState("");
  const [recurring, setRecurring] = useState("No"); 
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post("https://advanced-db-be-b37701fafad7.herokuapp.com/reminder", {
      AccountID: accountID,
      DueDate: date,
      Amount: amount,
      BillName: billName,
      Recurring: recurring === "Yes", 
    })
    .then((res) => {
      console.log(res.data);
      setError(null);
      setMessage(res.data.message);
    })
    .catch((err) => {
      console.error(err);
      setMessage(null);
      setError(err.response.data.error);
    });
  };

  return (
    <div className="add-transaction-container">
      <h2>Add Reminder</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Account ID"
          value={accountID}
          onChange={(e) => setAccountID(e.target.value)}
          required
        />
        <input
          type="date"
          placeholder="Due Date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          required
        />
        <input
          type="number"
          placeholder="Amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Bill Name"
          value={billName}
          onChange={(e) => setBillName(e.target.value)}
          required
        />
        <div className="recurring-container">
        <label htmlFor="recurring">Is the bill recurring?</label>
        <select
          value={recurring}
          onChange={(e) => setRecurring(e.target.value)}
        >
          <option value="Yes">Yes</option>
          <option value="No">No</option>
        </select>
        </div>
        <button type="submit">Add Reminder</button>
      </form>
      {message && <p className="message">{message}</p>}
      {error && <p className="error">{error}</p>}
    </div>
  );

};

export default AddReminder;
