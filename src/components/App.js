import React, { useEffect, useState } from "react";
import { Route, Routes} from 'react-router-dom';
import Login from '../components/pages/Login'
import NavBar from "./NavBar";
import Game from "./pages/Game";
import Home from "./pages/Home";


function App() {
  const [user, setUser] = useState(null);
  const [game, setGame] = useState(null)
  const [gameFiles, setGameFiles] = useState(null)

  console.log(game)

  useEffect(() => {
    // auto-login
    fetch("/me").then((r) => {
      if (r.ok) {
        r.json().then((user) => setUser(user));
      } else{
        r.json().then((data)=> console.log(data))
      }
    });

    fetch("/games").then((r)=> {
      if (r.ok) {
        r.json().then((games)=> {
          
          const mostRecent = games[games.length - 1]
          setGame(mostRecent)
          setGameFiles(games)
        })
      } else {
        r.json().then((data)=> console.log(data))
      }
    })
  }, []);

  console.log(user)
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
          <Route 
            path="/" 
            element={<Home setGame={setGame} gameFiles={gameFiles} />}>
          </Route>
        </Routes>
        </div>
  );
  }

  
}

export default App;

