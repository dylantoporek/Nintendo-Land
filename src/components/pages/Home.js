import React, {useState} from "react";
import GameForm from '../GameForm'

function Home(){
    const[togNewGame, setTogNewGame] = useState(false)
    const[togLoadGame, setTogLoadGame] = useState(false)

    function handleNGClick(){
        setTogNewGame(true)
    }

    function handleLClick(){
        setTogLoadGame(true)
    }
    if (togNewGame){
        return <GameForm  setTogNewGame={setTogNewGame}/>
    }

    if (togLoadGame){
        return(
            <div>Hi from load</div>
        )
    }
    else{
        return(
            <div>
                <button onClick={handleNGClick}>New Game</button>
                <button onClick={handleLClick}>Load Game</button>
            </div>
            
        )
    }
    
}

export default Home