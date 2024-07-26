import React, { useState } from "react";
import axios from "axios";

const Register = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5000/register", {
        username,
        password,
      });
      alert("User Created");
      setUsername("");
      setPassword("");
    } catch (error) {
      console.error("Error registering user:", error);
    }
  };

  return (
    <div
      className="container"
      style={{
        maxWidth: "fit-content",
        marginLeft: "auto",
        marginRight: "auto",
        marginTop: "2%",
      }}
    >
      <form onSubmit={handleSubmit}>
        <h2
          className="text-center"
          style={{
            maxWidth: "fit-content",
            marginLeft: "auto",
            marginRight: "auto",
          }}
        >
          Register
        </h2>
        <div className="form-group">
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            className="form-control"
            placeholder="Enter username"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            className="form-control"
            placeholder="Enter password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit" className="btn btn-success btn-block">
          Register
        </button>
      </form>
    </div>
  );
};

export default Register;
