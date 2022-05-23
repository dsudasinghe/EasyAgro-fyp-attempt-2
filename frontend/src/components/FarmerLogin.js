import React, { useState } from "react";
import axios from "axios";

function FarmerLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function sendData(e) {
    e.preventDefault();

    const farmer = {
      email,
      password,
    };

    axios
      .post("http://localhost:8070/user/login", farmer)
      .then(() => {
        alert("Login success!");
      })
      .catch((err) => {
        alert(err);
      });
  }

  return (
    <div className="container">
      <h3>Login Form</h3>
      <form onSubmit={sendData}>
        <div className="mb-3">
          <label for="name" className="form-label">
            Email
          </label>
          <input
            type="text"
            className="form-control"
            id="email"
            placeholder="email"
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
        </div>
        <div className="mb-3">
          <label for="password" className="form-label">
            Password
          </label>
          <input
            type="text"
            className="form-control"
            id="password"
            placeholder="Password"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
        </div>
        <a href="#">if you don't have account signup first</a>
        <br></br>
        <br></br>
        <button type="submit" className="btn btn-primary">
          Login
        </button>
      </form>
    </div>
  );
}

export default FarmerLogin;
