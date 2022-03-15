import React, { useEffect, useState } from "react";
import { Route, Routes} from 'react-router-dom';
import Login from '../components/pages/Login'
import NavBar from "./NavBar";
import Game from "./pages/Game";
import Home from "./pages/Home";
import GameForm from "./GameForm";
import LoadForm from "./LoadForm";
import url from '../url'


function App() {
  const [user, setUser] = useState(null);
  const [game, setGame] = useState(null)
  const [gameFiles, setGameFiles] = useState(null)

  useEffect(() => {
    // auto-login
    fetch(url+"/me", {
      headers: {
        "Access-Control-Allow-Origin": '*',
        mode: 'cors',
      }
    }).then((r) => {
      
      if (r.ok) {
        r.json().then((user) => setUser(user));
      } else{
        r.json().then((data)=> console.log(data))
      }
    });

  }, []);


  if (!user){
    return <Login onLogin={setUser} />;
  } 
  else {
    return (
      <div>
        <NavBar setUser={setUser}/>
        <Routes>
          <Route 
            path="/game" 
            element={<Game game={game}/>}>
          </Route>
          <Route path="/new-game" element={<GameForm setGame={setGame}/>}></Route>
          <Route path="/load-game" element={<LoadForm setGame={setGame}/>}></Route>
          <Route path="/" element={<Home setGame={setGame} setGameFiles={setGameFiles}/>}></Route>
        </Routes>
        </div>
    );
  }

  
}

export default App;

