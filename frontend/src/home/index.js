import React, { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { useAuth } from "../App";
import AddAccount from "./addAccount";
import AddCategory from "./addCategory";
import AddTransaction from "./addTransaction";
import walletBuddyImg from "../assets/images/wallet-buddy.png";
import AddReminder from "./addReminder";
import "./home.css";

const Home = () => {
  const { isLoggedIn, logout, userId } = useAuth();
  const [activeTab, setActiveTab] = useState(null);

  if (!isLoggedIn) {
    return <Navigate to="/login" />;
  }

  return (
    <div className="home-container">
      <h1>Welcome to your WalletBuddy</h1>
      <nav>
        <ul>
          <li onClick={() => setActiveTab("addAccount")}>Add Account</li>
          <li onClick={() => setActiveTab("addCategory")}>Add Category</li>
          <li onClick={() => setActiveTab("addTransaction")}>
            Add Transaction
          </li>
          <li onClick={() => setActiveTab("addReminder")}>Add Bill Reminder</li>
          <li>
            <Link to={`/bank-accounts`}>My Bank Accounts</Link>
          </li>
          <li onClick={logout}>Logout</li>
        </ul>
      </nav>
      {activeTab === null && (
        <img src={walletBuddyImg} alt="walletBuddy" width={600} />
      )}
      {activeTab === "addAccount" && <AddAccount />}
      {activeTab === "addCategory" && <AddCategory />}
      {activeTab === "addTransaction" && <AddTransaction />}
      {activeTab === "addReminder" && <AddReminder />}
      <div style={{ display: "flex", justifyContent: "center", marginTop: "10px" }}>
        <button style={{ border: "none", padding: "8px", borderRadius: "5px", background: "black", color: "white", cursor: "pointer" }} onClick={() => window.location.href = "https://ahmedelsayed200.github.io/locationAPI/"}>View My Location</button>

      </div>
    </div>
  );
};

export default Home;
