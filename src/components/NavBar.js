import React from "react";
import { NavLink } from "react-router-dom";
import home from './pages/home.png'
import signout from './pages/signout.png'
import url from "../url";

function NavBar({setUser}) {

    function handleLogoutClick() {
        fetch(url+"/logout", { method: "DELETE" }).then((r) => {
          if (r.ok) {
            setUser(null);
          }
        });
      }
      
    return (
        <div id='nav'>
            <NavLink id='link-home' to="/">
                <img id='nav-home-icon' src={home}/>
            </NavLink>
            <NavLink to="/game"></NavLink>
            <NavLink to="/new-game"></NavLink>
            <NavLink to="/load-game"></NavLink>
            <button id='sign-out-button' onClick={handleLogoutClick}>
                <img id='sign-out-styler' src={signout}/>
            </button>
        </div>
    )
}

export default NavBar