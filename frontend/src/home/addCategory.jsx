import React, { useState } from "react";
import axios from "axios";
import "./addCategory.css"; 

const AddCategory = () => {
  const [categoryName, setCategoryName] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post("http://localhost:3000/category", {
      CategoryName: categoryName,
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
    <div className="add-category-container">
      <h2>Add Category</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Category Name:
          <input
            type="text"
            value={categoryName}
            onChange={(e) => setCategoryName(e.target.value)}
            required
          />
        </label>
        <button type="submit">Add Category</button>
      </form>
      {message && <p className="message">{message}</p>}
      {error && <p className="error">{error}</p>}
    </div>
  );
};

export default AddCategory;
