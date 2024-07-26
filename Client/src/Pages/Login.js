import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../../src/App.css";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [redirect, setRedirect] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch("http://localhost:5000/login", {
      method: "POST",
      body: JSON.stringify({ username, password }),
      headers: { "Content-Type": "application/json" },
    });
    if (response.ok) {
      const data = await response.json();
      window.localStorage.setItem("token", data.token);
      window.localStorage.setItem("username", data.username);
      window.localStorage.setItem("userID", data.userID);
      alert("Login successful");
      setRedirect(true);
    } else {
      alert("Login failed");
    }
  };

  useEffect(() => {
    if (redirect) {
      navigate("/");
    }
  }, [redirect, navigate]);

  return (
    <div
      style={{
        maxWidth: "fit-content",
        marginLeft: "auto",
        marginRight: "auto",
        marginTop: "2%",
      }}
    >
      <form onSubmit={handleSubmit}>
        <h2
          style={{
            maxWidth: "fit-content",
            marginLeft: "auto",
            marginRight: "auto",
          }}
        >
          Login
        </h2>
        <div className="form-group">
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            className="form-control"
            placeholder="Enter username"
            id="username"
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <br />
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            className="form-control"
            placeholder="Enter password"
            id="password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <br />
        <button type="submit" className="btn btn-success btn-block">
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
