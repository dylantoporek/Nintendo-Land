import React from "react";
import { NavLink } from "react-router-dom";
import {useNavigate} from "react-router-dom"
import home from './pages/home.png'
import signout from './pages/signout.png'

function NavBar({setUser, togLoadGame, togNewGame, setTogLoadGame, setTogNewGame}) {

    const navigate = useNavigate()

    function handleLogoutClick() {
        fetch("/logout", { method: "DELETE" }).then((r) => {
          if (r.ok) {
            setUser(null);
          }
        });
      }

      function handleRelocate(){
        if (togLoadGame){
            setTogLoadGame(false)
        } if (togNewGame){
            setTogNewGame(false)
        }else{
            return null
        }
      }
      
    return (
        <div id='nav'>
            <NavLink id='link-home' to="/" onClick={handleRelocate}>
                <img id='nav-home-icon' src={home}/>
            </NavLink>
            <NavLink to="/game"></NavLink>
            <button id='sign-out-button' onClick={handleLogoutClick}>
                <img id='sign-out-styler' src={signout}/>
            </button>
        </div>
    )
}

export default NavBar