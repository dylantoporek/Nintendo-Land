import React, {useState} from "react";
import GameForm from '../GameForm'
import LoadForm from "../LoadForm";
import newgame from '../pages/newgame.png'
import loadgame from '../pages/loadgame.png'

function Home({setGame, togLoadGame, togNewGame, setTogNewGame, setTogLoadGame}){

    function handleNGClick(){
        setTogNewGame(true)
    }

    function handleLClick(){
        setTogLoadGame(true)
    }

    if (togNewGame){
        return <GameForm setGame={setGame} setTogNewGame={setTogNewGame}/>
    }

    if (togLoadGame){
        return <LoadForm setGame={setGame} setTogLoadGame={setTogLoadGame} />
    }
    else{
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
    
}

export default Home