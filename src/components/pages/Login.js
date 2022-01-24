import React, {useState} from "react";
import LoginForm from "../LoginForm";
import SignUpForm from "../SignUpForm";

function Login({onLogin}){
    const [showLogin, setShowLogin] = useState(true);

    return (
      <div>

      
        {showLogin ? (
          <>
            <LoginForm onLogin={onLogin} />
            <p id='signup-link'>
              Don't have an account? &nbsp;
              <button color="secondary" onClick={() => setShowLogin(false)}>
                Sign Up
              </button>
            </p>
          </>
        ) : (
          <>
            <SignUpForm onLogin={onLogin} />
            <p id='login-link'>
              Already have an account? &nbsp;
              <button color="secondary" onClick={() => setShowLogin(true)}>
                Log In
              </button>
            </p>
          </>
        )}
      </div>
    );
  }

export default Login
