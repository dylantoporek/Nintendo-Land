import React from "react";
import { NavLink } from "react-router-dom";
import home from './pages/home.png'
import signout from './pages/signout.png'



function NavBar({setUser}) {

    function handleLogoutClick() {
        fetch("/api/v1/logout")
        .then((r) => {
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
            <div id='sign-out-button' onClick={handleLogoutClick}>
                <img id='sign-out-styler' src={signout}/>
            </div>
        </div>
    )
}

export default NavBar