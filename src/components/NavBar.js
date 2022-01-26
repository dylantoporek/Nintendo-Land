import React from "react";
import { NavLink } from "react-router-dom";
import {useNavigate} from "react-router-dom"

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
                Home
            </NavLink>
            <NavLink to="/game"></NavLink>
            <button id='sign-out-button' onClick={handleLogoutClick}>Sign Out</button>
        </div>
    )
}

export default NavBar