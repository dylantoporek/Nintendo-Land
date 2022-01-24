import React from "react";
import { NavLink } from "react-router-dom";

function NavBar({setUser}) {

    function handleLogoutClick() {
        fetch("/logout", { method: "DELETE" }).then((r) => {
          if (r.ok) {
            setUser(null);
          }
        });
      }
    return (
        <div id='nav'>
            <NavLink id='link-home' to="/">
                Home
            </NavLink>
            <NavLink id='link-game' to="/game">
                Game
            </NavLink>
            <button id='sign-out-button' onClick={handleLogoutClick}>Sign Out</button>
        </div>
    )
}

export default NavBar