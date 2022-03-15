import React, { useState } from "react";
import './pages/App.css'
import userlabel from './pages/username.png'
import passwordlabel from './pages/password.png'
import loginlabel from './pages/login.png'
import url from "../url";


function LoginForm({ onLogin }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);

  function handleSubmit(e) {
    e.preventDefault();
    fetch("/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    }).then((r) => {
      if (r.ok) {
        r.json().then((user) => onLogin(user));
      } else {
        r.json().then((err) => setErrors(err.errors));
      }
    });
  }

  return (
    <form id='login-form' onSubmit={handleSubmit}>
        <img src={userlabel} id='username-label'/>
        <input
          type="text"
          id="username-input"
          autoComplete="off"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <img src={passwordlabel} id="password-label" />
        <input
          type="password"
          id="password-input"
          autoComplete="current-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button id='submit-login' variant="fill" color="primary" type="submit">
           <img id='loginlabel' src={loginlabel} />
        </button>
      
        <div className="errors">
            {errors.map((err) => (
            <p key={err}>{err}</p>
            ))}
        </div>
    </form>
  );
}

export default LoginForm;