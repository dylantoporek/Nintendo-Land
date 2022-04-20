import React, {useState} from "react";
import newgame from '../pages/newgame.png'
import loadgame from '../pages/loadgame.png'
import {useNavigate} from 'react-router-dom'

function Home(){
    const navigate = useNavigate()
    
    function handleNGClick(){
        navigate('/new-game')
    }

    function handleLClick(){
        navigate('/load-game')
    }

    return(
        <div id='home-container'>
            <div id='instructions'>
                <h4>Instructions:</h4>
                <div>
                    <li>Start a new game, or load an existing file</li>
                    <li>Roll the dice once, which shows your roll, the cpu's get a random roll generated for them</li>
                    <li>Any unique effects that occur will happen after the last cpu moves</li>
                    <li>Click through any alerts, then it is the next turn</li>
                </div>
                
            </div>
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