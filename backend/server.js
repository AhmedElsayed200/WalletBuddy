// server.js

const express = require("express");
var cors = require("cors");
const bodyParser = require("body-parser");
const mysql = require("mysql");
const basicAuth = require('express-basic-auth');

const app = express();

const port = process.env.PORT || 3000;
app.use(cors());

// Database connection
const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "Godblessabayo@1",
  database: "walletbuddy",
});

const basicAuthMiddleware = basicAuth({
  users: { 'admin': 'admin123' }, // Change this to your actual credentials
  unauthorizedResponse: { message: 'Unauthorized' }
});

app.use(basicAuthMiddleware);

const connect_standard = mysql.createConnection({
  host: "localhost",
  user: "standard",
  password: "StndrdPas#1",
  database: "walletbuddy",
});

connection.connect((err) => {
  if (err) {
    console.error("Error connecting to database:", err.stack);
    process.exit(1); // Exit the application if unable to connect to the database
  }
  console.log("Connected to database");
});

app.use(bodyParser.json());

app.post("/register", (req, res) => {
  const { UserName, FullName, Email, Password, PhoneNumber, Location, Job } =
    req.body;

  // Check if the email already exists
  connection.query(
    "SELECT * FROM User WHERE Email = ?",
    [Email],
    (err, result) => {
      if (err) {
        res.status(500).json({ error: "Failed to register user" });
        console.log(err);
      } else if (result.length > 0) {
        res.status(400).json({ error: "User already exists with this email" });
      } else {
        // Insert the new user
        const query = `INSERT INTO User (UserName, FullName, Email, Password, PhoneNumber, Location, Job) VALUES (?, ?, ?, ?, ?, ?, ?)`;
        connection.query(
          query,
          [UserName, FullName, Email, Password, PhoneNumber, Location, Job],
          (err, result) => {
            if (err) {
              res.status(500).json({ error: "Failed to register user" });
              console.log(err);
            } else {
              res.status(200).json({ message: "User registered successfully" });
            }
          }
        );
      }
    }
  );
});

// API endpoint for user login
app.post("/login", (req, res) => {
  const { Email, Password } = req.body;
  const query = `SELECT UserID FROM User WHERE Email = ? AND Password = ?`;
  connection.query(query, [Email, Password], (err, results) => {
    if (err) {
      res.status(500).json({ error: "Failed to login" });
    } else if (results.length === 0) {
      res.status(401).json({ error: "Invalid email or password" });
    } else {
      const userID = results[0].UserID;
      // Pass user ID to the next middleware
      req.userID = userID;
      res.status(200).json({ message: "Login successful", userID });
    }
  });
});

app.post("/accounts", (req, res) => {
  const { AccountName, userID } = req.body;

  // Check if the account name already exists
  connection.query(
    "SELECT * FROM Account WHERE AccountName = ?",
    [AccountName],
    (err, result) => {
      if (err) {
        res.status(500).json({ error: "Failed to create account" });
        console.log(err);
      } else if (result.length > 0) {
        res.status(400).json({ error: "Account name already exists" });
      } else {
        // Insert the new account
        const accountQuery = `INSERT INTO Account (AccountName, UserID) VALUES (?, ?)`;
        connection.query(
          accountQuery,
          [AccountName, userID],
          (err, accountResult) => {
            if (err) {
              res.status(500).json({ error: "Failed to create account" });
              console.log(err);
            } else {
              res.status(200).json({ message: "Account created successfully" });
            }
          }
        );
      }
    }
  );
});

app.post("/category", (req, res) => {
  const { CategoryName } = req.body;

  // Check if the category name already exists
  connection.query(
    "SELECT * FROM Category WHERE CategoryName = ?",
    [CategoryName],
    (err, result) => {
      if (err) {
        res.status(500).json({ error: "Failed to create category" });
        console.log(err);
      } else if (result.length > 0) {
        res.status(400).json({ error: "Category name already exists" });
      } else {
        // Insert the new category
        const categoryQuery = `INSERT INTO Category (CategoryName) VALUES (?)`;
        connection.query(
          categoryQuery,
          [CategoryName],
          (err, categoryResult) => {
            if (err) {
              res.status(500).json({ error: "Failed to create category" });
              console.log(err);
            } else {
              res
                .status(200)
                .json({ message: "Category created successfully" });
            }
          }
        );
      }
    }
  );
});

// API endpoint for adding a transaction
app.post("/transactions", (req, res) => {
  const { AccountID, Date, Amount, CategoryID } = req.body;

  // Query to retrieve account name
  const selectAcc = `SELECT AccountName FROM Account WHERE AccountID = ?`;

  connection.query(selectAcc, [AccountID], (err, results) => {
    if (err) {
      res.status(500).json({ error: "Failed to retrieve account name" });
      console.log(err);
    } else {
      if (results.length > 0) {
        // Account found, proceed with transaction insertion
        const accountName = results[0].AccountName;
        console.log(accountName);
        const query = `INSERT INTO Transaction (AccountID, Date, Amount, CategoryID) VALUES (?, ?, ?, ?)`;
        connection.query(
          query,
          [AccountID, Date, Amount, CategoryID],
          (err, result) => {
            if (err) {
              res.status(500).json({ error: "Failed to add transaction" });
              console.log(err);
            } else {
              res
                .status(200)
                .json({ message: "Transaction added successfully" });
            }
          }
        );
      } else {
        // No account found for the given AccountID
        res.status(404).json({ error: "Account not found" });
        console.log(err);
      }
    }
  });
});

// API endpoint for adding a reminder
app.post("/reminder", (req, res) => {
  const { AccountID, DueDate, Amount, Recurring, BillName } = req.body;

  // Query to retrieve account name
  const selectAcc = `SELECT AccountName FROM Account WHERE AccountID = ?`;

  connection.query(selectAcc, [AccountID], (err, results) => {
    if (err) {
      res.status(500).json({ error: "Failed to retrieve account name" });
      console.log(err);
    } else {
      if (results.length > 0) {
        // Account found, proceed with transaction insertion
        const accountName = results[0].AccountName;
        console.log(accountName);
        const query = `INSERT INTO Reminder (AccountID, DueDate, Amount, Recurring, BillName) VALUES (?, ?, ?, ?, ?)`;
        connection.query(
          query,
          [AccountID, DueDate, Amount, Recurring, BillName],
          (err, result) => {
            if (err) {
              res.status(500).json({ error: "Failed to add reminder" });
              console.log(err);
            } else {
              res.status(200).json({ message: "Reminder added successfully" });
            }
          }
        );
      } else {
        // No account found for the given AccountID
        res.status(404).json({ error: "Account not found" });
        console.log(err);
      }
    }
  });
});

// API endpoint for getting reminders based on due date
app.get("/reminders", (req, res) => {
  const { AccountID, DueDate } = req.query;

  console.log(DueDate);
  // Query to retrieve reminders based on due date
  const query = `SELECT * FROM Reminder WHERE AccountID = ? AND DueDate <= ?`;

  connect_standard.query(query, [AccountID, DueDate], (err, results) => {
    if (err) {
      res.status(500).json({ error: "Failed to retrieve reminders" });
      console.log(err);
    } else {
      res.status(200).json({ reminders: results });
    }
  });
});

// API endpoint for getting all the bank accounts
app.get("/accounts", (req, res) => {
  const { UserID, AccountName } = req.query;

  // Check if the user ID exists in the database
  const userQuery = `SELECT * FROM User WHERE UserID = ?`;

  connect_standard.query(userQuery, [UserID], (err, userResults) => {
    if (err) {
      res.status(500).json({ error: "Failed to check user ID" });
      console.log(err);
    } else if (userResults.length === 0) {
      res.status(404).json({ error: "No user found with this ID" });
    } else {
      // Query to retrieve all the bank accounts
      const query = AccountName
        ? `SELECT * FROM Account WHERE UserID = ? AND AccountName = ?`
        : `SELECT * FROM Account WHERE UserID = ?`;

      connection.query(query, [UserID, AccountName], (err, results) => {
        if (err) {
          res.status(500).json({ error: "Failed to retrieve bank accounts" });
          console.log(err);
        } else {
          res.status(200).json({ reminders: results });
        }
      });
    }
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
