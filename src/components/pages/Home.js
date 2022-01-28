import React, {useState} from "react";
import newgame from '../pages/newgame.png'
import loadgame from '../pages/loadgame.png'
import {useNavigate} from 'react-router-dom'

function Home({setGame, togLoadGame, togNewGame, setTogNewGame, setTogLoadGame}){

    const navigate = useNavigate()
    
    function handleNGClick(){
        navigate('/new-game')
    }

    function handleLClick(){
        navigate('/load-game')
    }

        return(
            <div>
                <button id='home-new-game-button' onClick={handleNGClick}>
                    <img id='home-new-game-img' src={newgame}/>
                </button>
                <button id='home-load-game-button' onClick={handleLClick}>
                    <img id='home-load-game-img' src={loadgame}/>
                </button>
            </div>
            
        )
    
}

export default Home