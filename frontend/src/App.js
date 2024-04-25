import React, { createContext, useContext, useState } from "react";
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./home";
import Login from "./login";
import Register from "./register";
import Accounts from "./accounts/accounts";
import Account from "./accounts/account";
import Footer from "./footer";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userId, setUserId] = useState(null);

  const login = () => {
    setIsLoggedIn(true);
  };

  const setUser = (userId) => {
    setUserId(userId);
  };

  const logout = () => {
    setIsLoggedIn(false);
  };

  return (
    <AuthContext.Provider
      value={{ isLoggedIn, userId, login, logout, setUser }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

const App = () => {
  return (
    <AuthProvider>
      <Router basename="/">
        <Routes>
          <Route path="/" exact element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/bank-accounts" element={<Accounts />} />
          <Route path="/bank-accounts/:id" element={<Account />} />
        </Routes>
        <Footer />
      </Router>
    </AuthProvider>
  );
};

export default App;
