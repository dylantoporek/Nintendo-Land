import React, { useEffect, useState } from "react";
import { Route, Routes} from 'react-router-dom';
import Login from '../components/pages/Login'
import NavBar from "./NavBar";
import Game from "./pages/Game";
import Home from "./pages/Home";


function App() {
  const [user, setUser] = useState(null);

  // useEffect(() => {
  //   // auto-login
  //   fetch("http://localhost:3000/me").then((r) => {
  //     if (r.ok) {
  //       r.json().then((user) => setUser(user));
  //     }
  //   });
  // }, []);

  if (!user){
    return <Login onLogin={setUser} />;
  } 
  else {
    return (
      <div>
        <NavBar/>
        <Routes>
          <Route 
            path="/game" 
            element={<Game/>}>
          </Route>
          <Route 
            path="/" 
            element={<Home/>}>
          </Route>
        </Routes>
        </div>
  );
  }

  
}

export default App;

