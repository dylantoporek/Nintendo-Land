import React, {useState} from "react";
import GameForm from '../GameForm'
import LoadForm from "../LoadForm";

function Home({setGame, gameFiles}){
    const[togNewGame, setTogNewGame] = useState(false)
    const[togLoadGame, setTogLoadGame] = useState(false)

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
        return <LoadForm gameFiles={gameFiles} setGame={setGame} setTogLoadGame={setTogLoadGame} />
    }
    else{
        return(
            <div>
                <button id='home-new-game-button' onClick={handleNGClick}>New Game</button>
                <button id='home-load-game-button' onClick={handleLClick}>Load Game</button>
            </div>
            
        )
    }
    
}

export default Home