import React, {useState} from "react";
import LoginForm from "../LoginForm";
import SignUpForm from "../SignUpForm";
import donthaveaccount from '../pages/donthaveanaccount.png'
import signuplabel from '../pages/signup.png'
import loginlabel from '../pages/login.png'
import alreadyhaveaccount from '../pages/alreadyhaveanaccount.png'

function Login({onLogin}){
    const [showLogin, setShowLogin] = useState(true);

    return (
      <div id='login-page-contianer'>
        {showLogin ? (
          <div id='login-div'>
            <LoginForm onLogin={onLogin} />
            <img src={donthaveaccount} id='signup-link'>
              
            </img>
            <button color="secondary" id='take-to-sign-up' onClick={() => setShowLogin(false)}>
                <img id='sign-me-up' src={signuplabel}/>
            </button>
          </div>
        ) : (
          <div id='signin-din'>
            <SignUpForm onLogin={onLogin} />
            <img src={alreadyhaveaccount} id='login-link'/>
              <button id='take-to-log-in' color="secondary" onClick={() => setShowLogin(true)}>
                <img id='log-me-in' src={loginlabel}/>
              </button>
          </div>
        )}
      </div>
    );
}

export default Login
