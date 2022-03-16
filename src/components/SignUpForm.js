import React, { useState } from "react";
import userlabel from './pages/username.png'
import passwordlabel from './pages/password.png'
import passwordconflabel from './pages/passwordconfirmation.png'
import signuplabel from './pages/signup.png'
import url from '../url';
import { postConfig } from "../CSRFToken";

function SignUpForm({ onLogin }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [errors, setErrors] = useState([]);


  function handleSubmit(e) {
    e.preventDefault();
    setErrors([]);
    fetch("/signup", postConfig({username, password, passwordConfirmation}))
    .then((r) => {
      if (r.ok) {
        r.json().then((user) => onLogin(user)).catch((err) => console.log(err));
      } else {
        r.json().then((err) => setErrors(err.errors)).catch((err) => console.log(err));
      }
    });
  }

  return (
    <form id='signup-form' onSubmit={handleSubmit}>
        <img src={userlabel} id="signup-username-label" />
        <input
          type="text"
          id="signup-username"
          autoComplete="off"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <img src={passwordlabel} id="signup-password-label"/>
        <input
          type="password"
          id="signup-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          autoComplete="current-password"
        />
        <img src={passwordconflabel} id="signup-passwordconf-label" />
        <input
          type="password"
          id="signup-password_confirmation"
          value={passwordConfirmation}
          onChange={(e) => setPasswordConfirmation(e.target.value)}
          autoComplete="current-password"
        />
        <button id='signup-submit' type="submit">
          <img id='sign-up-label-pic' src={signuplabel}/>
        </button>
      <div className='errors'>
        {errors.map((err) => (
          <p key={err}>{err}</p>
        ))}
      </div>
    </form>
  );
}

export default SignUpForm;