import React, {useState} from "react";
import './App.css'
import board from '../pages/Board.png'

function Game(){
    
    const [player, setPlayer] = useState({
        name: "player",
        avatar: "https://raw.githubusercontent.com/N3evin/AmiiboAPI/master/images/icon_00000000-00000002.png",
        position: 0
    })

    const [cpu1, setCpu1] = useState({
        name: "cpu1",
        avatar: "https://raw.githubusercontent.com/N3evin/AmiiboAPI/master/images/icon_00010000-000c0002.png",
        position: 0
    })
    
    const [cpu2, setCpu2] = useState({
        name: "cpu2",
        avatar: "https://raw.githubusercontent.com/N3evin/AmiiboAPI/master/images/icon_01020100-001b0002.png",
        position: 0
    })

    const [cpu3, setCpu3] = useState({
        name: "cpu3",
        avatar: "https://raw.githubusercontent.com/N3evin/AmiiboAPI/master/images/icon_19060000-00240002.png",
        position: 0
    })

    const activePlayers = [
        player, cpu1, cpu2, cpu3
    ]


    const assignPositions = activePlayers.map((player)=>{
            return <div id={player.name} key={player.name} className={`space-${player.name}-${player.position}`}>
            <img className="avatar" src={player.avatar}/>
        </div>
    })

    function handleRoll(){
       
        playerRoll()
        cpu1Roll()
        cpu2Roll()
        cpu3Roll()
        
    }

    function playerRoll(){
        let dice = [1, 2, 3, 4, 5, 6]
        let playerRoll = dice[Math.floor(Math.random()*3)]
        let playerMove = player.position + playerRoll
        setPlayer({
            name: "player",
            avatar: "https://raw.githubusercontent.com/N3evin/AmiiboAPI/master/images/icon_00000000-00000002.png",
            position: playerMove

        })
    }

    function cpu1Roll(){
        let dice = [1, 2, 3, 4, 5, 6]
        let cpu1Roll = dice[Math.floor(Math.random()*3)]
        let cpu1Move = cpu1.position + cpu1Roll
        setCpu1({
            name: "cpu1",
            avatar: "https://raw.githubusercontent.com/N3evin/AmiiboAPI/master/images/icon_00010000-000c0002.png",
            position: cpu1Move
        })
    }

    function cpu2Roll(){
        let dice = [1, 2, 3, 4, 5, 6]
        let cpu2Roll = dice[Math.floor(Math.random()*3)]
        let cpu2Move = cpu2.position + cpu2Roll
        setCpu2({
            name: "cpu2",
            avatar: "https://raw.githubusercontent.com/N3evin/AmiiboAPI/master/images/icon_01020100-001b0002.png",
            position: cpu2Move
        })
    }

    function cpu3Roll(){
        let dice = [1, 2, 3, 4, 5, 6]
        let cpu3Roll = dice[Math.floor(Math.random()*3)]
        let cpu3Move = cpu3.position + cpu3Roll
        setCpu3({
            name: "cpu3",
            avatar: "https://raw.githubusercontent.com/N3evin/AmiiboAPI/master/images/icon_19060000-00240002.png",
            position: cpu3Move
        })
    }

    return(
        <div>
            <button onClick={handleRoll}>ROLL</button>
            <div id="game-board">
                {assignPositions}
            </div>
            
            <img src={board}></img>
        </div>
    )
}

export default Game