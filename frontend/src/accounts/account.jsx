import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../App";
import "./account.css";

const Account = () => {
  const { id } = useParams();
  const [account, setAccount] = useState();
  const [reminders, setReminders] = useState([]);
  const [searchDate, setSearchDate] = useState(new Date(2050, 11, 11));
  const { userId } = useAuth();

  useEffect(() => {
    const fetchAccount = async () => {
      try {
        const response = await axios.get(
          `https://advanced-db-be-b37701fafad7.herokuapp.com/accounts?UserID=${userId}&AccountName=${id}`
        );
        setAccount(response.data.reminders[0]);
      } catch (error) {
        console.error("Failed to fetch account:", error);
      }
    };
    fetchAccount();
  }, []);

  const handleFetchReminders = async () => {
    console.log(searchDate);
    try {
      const formattedDate =
        searchDate.length == 10
          ? searchDate
          : `${searchDate.getFullYear()}-${(searchDate.getMonth() + 1)
              .toString()
              .padStart(2, "0")}-${searchDate
              .getDate()
              .toString()
              .padStart(2, "0")}`;
      const response = await axios.get(
        `https://advanced-db-be-b37701fafad7.herokuapp.com/reminders?AccountID=${account?.AccountID}&DueDate=${formattedDate}`
      );
      console.log(response);
      setReminders(response.data.reminders);
    } catch (error) {
      console.error("Failed to fetch reminders:", error);
    }
  };

  return (
    <div className="container">
      <div style={{ display: "flex", alignItems: "flex-end" }}>
        <h2 className="heading">Your Bank Account: </h2>
        <h4 className="account-name">{account?.AccountName}</h4>
      </div>

      <p>search by due date</p>
      <input
        type="date"
        value={searchDate}
        onChange={(e) => setSearchDate(e.target.value)}
        className="date-input"
      />

      {reminders.length > 0 && (
        <div>
          <h5 className="reminders">Reminders</h5>

          <ul>
            {reminders.map((reminder) => (
              <div key={reminder.ReminderID} className="reminder-item">
                <div>
                  <b>Reminder Name:</b> {reminder.BillName}
                </div>
                <div>
                  <b>Recurring:</b> {reminder.Recurring}
                </div>
                <div>
                  <b>Amount:</b> {reminder.Amount}$
                </div>
                <div>
                  <b>Due Date:</b> {reminder.DueDate}
                </div>
              </div>
            ))}
          </ul>
        </div>
      )}
      <button onClick={handleFetchReminders} className="button">
        Show All Reminders
      </button>
    </div>
  );
};

export default Account;
