import React, { useState } from "react";
import './pages/App.css'

function LoginForm({ onLogin }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    setIsLoading(true);
    fetch("http://localhost:3000/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    }).then((r) => {
      setIsLoading(false);
      if (r.ok) {
        r.json().then((user) => onLogin(user));
      } else {
        r.json().then((err) => setErrors(err.errors));
      }
    });
  }

  return (
    <form id='login-form' onSubmit={handleSubmit}>
        <label id="username-label">Username</label>
        <input
          type="text"
          id="username-input"
          autoComplete="off"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <label id="password-label">Password</label>
        <input
          type="password"
          id="password-input"
          autoComplete="current-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button id='submit-login' variant="fill" color="primary" type="submit">
          {isLoading ? "Loading..." : "Login"}
        </button>
      
        <div id="errors">
            {errors.map((err) => (
            <p key={err}>{err}</p>
            ))}
        </div>
    </form>
  );
}

export default LoginForm;