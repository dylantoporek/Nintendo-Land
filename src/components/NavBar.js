import React from "react";
import { NavLink } from "react-router-dom";

function NavBar() {
    return (
        <div id='nav'>
            <NavLink id='link-home' to="/">
                Home
            </NavLink>
            <NavLink id='link-game' to="/game">
                Game
            </NavLink>
        </div>
    )
}

export default NavBar