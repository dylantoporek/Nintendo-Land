import React, {useState, useEffect} from "react";
import './App.css'
import board from '../pages/Board.png'
import {useNavigate} from 'react-router-dom'

function Game({game}){
    const [player, setPlayer] = useState({
        name: "player",
        avatar: "",
        position: 0
    })

    const [cpu1, setCpu1] = useState({
        name: "cpu1",
        avatar: "",
        position: 0
    })

    const [cpu2, setCpu2] = useState({
        name: "cpu2",
        avatar: "",
        position: 0
    })

    const [cpu3, setCpu3] = useState({
        name: "cpu3",
        avatar: "",
        position: 0
    })

    const navigate = useNavigate()

useEffect(()=>{
    if (game){
        console.log(game.player_avater)
        setPlayer({
            name: "player",
            avatar: game.player_avatar,
            position: game.player_position
        })
    
        setCpu1({
            name: "cpu1",
            avatar: game.cpu1_avatar,
            position: game.cpu1_position
        })
        
        setCpu2({
            name: "cpu2",
            avatar: game.cpu2_avatar,
            position: game.cpu2_position
        })
    
        setCpu3({
            name: "cpu3",
            avatar: game.cpu3_avatar,
            position: game.cpu3_position
        })
    } else {
        alert('You must create a new game or load an existing game to play.')
        navigate('/')
    }
}, [])
    
    
    console.log(player, cpu1, cpu2, cpu3)

    const activePlayers = [
        player, cpu1, cpu2, cpu3
    ]


    const assignPositions = activePlayers.map((player)=>{
            return <div id={player.name} key={player.name} className={`space-${player.name}-${player.position}`}>
            <img className="avatar" src={player.avatar}/>
        </div>
    })

    function handleRoll(){
       
        setTimeout(playerRoll, 1000)
        setTimeout(cpu1Roll, 2000)
        setTimeout(cpu2Roll, 3000)
        setTimeout(cpu3Roll, 4000)
        
    }

    function playerRoll(){
        let dice = [1, 2, 3, 4, 5, 6]
        let playerRoll = dice[Math.floor(Math.random()*6)]
        let playerMove = player.position + playerRoll
        setPlayer({
            ...player, 
            position: playerMove
        })
    }

    function cpu1Roll(){
        let dice = [1, 2, 3, 4, 5, 6]
        let cpu1Roll = dice[Math.floor(Math.random()*6)]
        let cpu1Move = cpu1.position + cpu1Roll
        setCpu1({
            ...cpu1, 
            position: cpu1Move
        })
    }

    function cpu2Roll(){
        let dice = [1, 2, 3, 4, 5, 6]
        let cpu2Roll = dice[Math.floor(Math.random()*6)]
        let cpu2Move = cpu2.position + cpu2Roll
        setCpu2({
            ...cpu2,
            position: cpu2Move
        })
    }

    function cpu3Roll(){
        let dice = [1, 2, 3, 4, 5, 6]
        let cpu3Roll = dice[Math.floor(Math.random()*6)]
        let cpu3Move = cpu3.position + cpu3Roll
        setCpu3({
            ...cpu3,
            position: cpu3Move
        })
    }

    function handleSave(){
        fetch(`/games/${game.id}`, {
            method: "PATCH",
            headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({player_position: player.position, cpu1_position: cpu1.position, cpu2_position: cpu2.position, cpu3_position: cpu3.position})
        }).then(r => {
            if(r.ok){
                r.json().then( data=> console.log(data))
            } else{
                r.json().then(console.log('error saving game'))
            }
        })
    }

    return(
        <div>
            <button id='dice' onClick={handleRoll}>ROLL</button>
            <div id="game-board">
                {assignPositions}
            </div>
            <button id='save-game-button' onClick={handleSave}>Save Game</button>
            <img src={board}></img>
        </div>
    )
}

export default Game