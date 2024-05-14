import React, { useState } from "react";
import axios from "axios";
import "./addTransaction.css";

const AddTransaction = () => {
  const [accountID, setAccountID] = useState("");
  const [date, setDate] = useState("");
  const [amount, setAmount] = useState("");
  const [categoryID, setCategoryID] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post("http://localhost:3000/transactions", {
      AccountID: accountID,
      Date: date,
      Amount: amount,
      CategoryID: categoryID,
    })
    .then((res) => {
      console.log(res.data);
      setMessage(res.data.message);
    })
    .catch((err) => {
      console.error(err);
      setMessage(err.error);
    });
  };

  return (
    <div className="add-transaction-container">
      <h2>Add Transaction</h2>
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
          placeholder="Date"
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
          placeholder="Category ID"
          value={categoryID}
          onChange={(e) => setCategoryID(e.target.value)}
          required
        />
        <button type="submit">Add Transaction</button>
      </form>
      {message && <p className="message">{message}</p>}
    </div>
  );

};

export default AddTransaction;
