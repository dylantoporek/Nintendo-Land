import React, {useState, useEffect} from "react";
import './App.css'
import board from '../pages/board3.0.png'
import dice from '../pages/dice.png'
import {useNavigate} from 'react-router-dom'
import playerlabel from '../pages/playerlabel.png'
import cpu1label from '../pages/cpu1label.png'
import cpu2label from '../pages/cpu2label.png'
import cpu3label from '../pages/cpu3label.png'

function Game({game}){
    const [player, setPlayer] = useState({
        name: "player",
        avatar: "",
        position: 0
    })

    const [cpu1, setCpu1] = useState({
        name: "cpu1",
        avatar: '',
        position: 0
    })

    const [cpu2, setCpu2] = useState({
        name: "cpu2",
        avatar: '',
        position: 0
    })

    const [cpu3, setCpu3] = useState({
        name: "cpu3",
        avatar: '',
        position: 0
    })

    const navigate = useNavigate()

useEffect(()=>{
    if (game){
        console.log(game.player_avatar)
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




    function handleRoll(){
       
        setTimeout(playerRoll, 1000)
        setTimeout(cpu1Roll, 2000)
        setTimeout(cpu2Roll, 3000)
        setTimeout(cpu3Roll, 4000)
        
    }

    function checkBoardSpaceEffect(){
        console.log(activePlayers)
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



    const activePlayers = [
        player, cpu1, cpu2, cpu3
    ]

    const whoIsWinning = [
        player.position, cpu1.position, cpu2.position, cpu3.position
    ]


    const assignPositions = activePlayers.map((player)=>{
            return <div key={player.name} className={`space-${player.name}-${player.position}`}>
            <img className="avatar" src={player.avatar}/>
        </div>
    })

    const positionDisplay = activePlayers.map((player) => {
        const order = whoIsWinning.sort()
        if (parseInt(player.position) === parseInt(order[order.length - 1])){
            return <div id={player.name}>
            {player.name} : 1st Place
        </div>

        } if (parseInt(player.position) === parseInt(order[order.length - 2])){
            return <div id={player.name}>
            {player.name} : 2nd Place
        </div>

        } if (parseInt(player.position) === parseInt(order[order.length - 3])){
            return <div id={player.name}>
            {player.name} : 3rd Place
        </div>

        } else {
            return <div id={player.name}>
            {player.name} : 4th Place
        </div>
        }
        
    })

    return(
        <div>
            <img id='dice' src={dice} onClick={handleRoll}/>
            <div id="game-board">
                {assignPositions}
            </div>

            <div id='hub'>
                {positionDisplay}
            </div>
            <button id='save-game-button' onClick={handleSave}>Save Game</button>
            <img src={board}></img>
        </div>
    )
}

export default Game