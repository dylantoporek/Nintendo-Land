import React, {useState, useEffect} from "react";
import './App.css'
import board from '../pages/board3.0.png'
import {useNavigate} from 'react-router-dom'
import playerlabel from '../pages/playerlabel.png'
import cpu1label from '../pages/cpu1label.png'
import cpu2label from '../pages/cpu2label.png'
import cpu3label from '../pages/cpu3label.png'
import save from '../pages/save.png'
import Dice from "react-dice-roll";

function Game({game}){

    const [checkSpace, setCheckSpace] = useState(false)

    const [player, setPlayer] = useState({
        name: "player",
        avatar: '',
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


    useEffect(()=> {
        if(checkSpace){
            setTimeout(checkSpaceEffect(player), 1000)
            setTimeout(checkSpaceEffect(cpu1), 2000)
            setTimeout(checkSpaceEffect(cpu2), 3000)
            setTimeout(checkSpaceEffect(cpu3), 4000)
            setTimeout(setCheckSpace(false), 5000)
        } else{
            return null
        }
        
    }, [checkSpace])


    function handleSave(){
        fetch(`/games/${game.id}`, {
            method: "PATCH",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({player_position: player.position, cpu1_position: cpu1.position, cpu2_position: cpu2.position, cpu3_position: cpu3.position})
        }).then(r => {
            if(r.ok){
                r.json().then( data=> alert('Game saved!'))
            } else{
                r.json().then(console.log('error saving game'))
            }
        })
    }

    function handleRoll(roll){
        const makeTurnPromise = (callback, player) => {
            return new Promise(function(resolve, reject){
                setTimeout(() => {
                    player ? callback(roll) : callback()
                    resolve("resolved")
                }, 2000)
            })
        }
          
        makeTurnPromise(playerRoll, true) 
        .then(()=> {
            return makeTurnPromise(cpu1Roll, false)
        }).then(()=> {
            return makeTurnPromise(cpu2Roll, false)
        }).then(()=> {
            return makeTurnPromise(cpu3Roll, false)
        }).then(()=> {
            setTimeout(setCheckSpace(true), 10000)
        })
            
    }

    function checkSpaceEffect(obj){
        console.log(obj.position)
        if (parseInt(obj.position) === 3){
            alert("Pipe")
            // move from 3 to 7
        }
        if (parseInt(obj.position) === 5){
            alert("Bowser")
            // move from 5 to 4
        }
        if (parseInt(obj.position) === 11){
            alert("Bokoblins")
            // move from 11 to 10
        }
        if (parseInt(obj.position) === 15){
            alert("Nurse Joy")
            //move from 15 to 19
        }
        if (parseInt(obj.position) === 18){
            alert("Wild Pokemon")
            // move from 18 to 17
        }
        if (parseInt(obj.position) === 22){
            alert("Slowpoke")
            // move from 22 to 21
        }
        if (parseInt(obj.position) === 28){
            alert("Piranha Plant")
            // move form 28 to 27
        }
        if (parseInt(obj.position) === 32){
            alert("Wendell")
            // move from 32 to 31
        }
        if (parseInt(obj.position) === 37){
            alert("Banana")
            // move from 37 to 36
        }
    }

    function playerRoll(roll){
        let playerRoll = roll
        let steps = []
        if (playerRoll === 1){
            steps = [player.position, player.position+1]
        }
        if (playerRoll === 2){
            steps = [player.position, player.position+1, player.position+2]
        }
        if (playerRoll === 3){
            steps = [player.position, player.position+1, player.position+2, player.position+3]
        }
        if (playerRoll === 4){
            steps = [player.position, player.position+1, player.position+2, player.position+3, player.position+4]
        }
        if (playerRoll === 5){
            steps = [player.position, player.position+1, player.position+2, player.position+3, player.position+4, player.position+5]
        } 
        if (playerRoll === 6){
            steps = [player.position, player.position+1, player.position+2, player.position+3, player.position+4, player.position+5, player.position+6]
        }

        for( let i = 0; i < steps.length; i++){
            setTimeout(() => setPlayer((player) => ({
                ...player,
                position: steps[i]
            })), (250 * (i+1)))
        } 
             
    }


    function cpu1Roll(){
        let dice = [1, 2, 3, 4, 5, 6]
        let cpu1Roll = dice[Math.floor(Math.random()*6)]
        let steps = []
        if (cpu1Roll === 1){
            steps = [cpu1.position, cpu1.position+1]
        }
        if (cpu1Roll === 2){
            steps = [cpu1.position, cpu1.position+1, cpu1.position+2]
        }
        if (cpu1Roll === 3){
            steps = [cpu1.position, cpu1.position+1, cpu1.position+2, cpu1.position+3]
        }
        if (cpu1Roll === 4){
            steps = [cpu1.position, cpu1.position+1, cpu1.position+2, cpu1.position+3, cpu1.position+4]
        }
        if (cpu1Roll === 5){
            steps = [cpu1.position, cpu1.position+1, cpu1.position+2, cpu1.position+3, cpu1.position+4, cpu1.position+5]
        } 
        if (cpu1Roll === 6){
            steps = [cpu1.position, cpu1.position+1, cpu1.position+2, cpu1.position+3, cpu1.position+4, cpu1.position+5, cpu1.position+6]
        }
        
        for( let i = 0; i < steps.length; i++){
            setTimeout(() => setCpu1((cpu1) => ({
                ...cpu1,
                position: steps[i]
            })), (250 * (i+1)))
        } 
        
    }

    function cpu2Roll(){
        let dice = [1, 2, 3, 4, 5, 6]
        let cpu2Roll = dice[Math.floor(Math.random()*6)]
        let steps = []
        if (cpu2Roll === 1){
            steps = [cpu2.position, cpu2.position+1]
        }
        if (cpu2Roll === 2){
            steps = [cpu2.position, cpu2.position+1, cpu2.position+2]
        }
        if (cpu2Roll === 3){
            steps = [cpu2.position, cpu2.position+1, cpu2.position+2, cpu2.position+3]
        }
        if (cpu2Roll === 4){
            steps = [cpu2.position, cpu2.position+1, cpu2.position+2, cpu2.position+3, cpu2.position+4]
        }
        if (cpu2Roll === 5){
            steps = [cpu2.position, cpu2.position+1, cpu2.position+2, cpu2.position+3, cpu2.position+4, cpu2.position+5]
        } 
        if (cpu2Roll === 6){
            steps = [cpu2.position, cpu2.position+1, cpu2.position+2, cpu2.position+3, cpu2.position+4, cpu2.position+5, cpu2.position+6]
        } 

        for( let i = 0; i < steps.length; i++){
            setTimeout(() => setCpu2((cpu2) => ({
                ...cpu2,
                position: steps[i]
            })), (250 * (i+1)))
        } 
        
    }

    function cpu3Roll(){
        let dice = [1, 2, 3, 4, 5, 6]
        let cpu3Roll = dice[Math.floor(Math.random()*6)]
        let steps = []
        if (cpu3Roll === 1){
            steps = [cpu3.position, cpu3.position+1]
        }
        if (cpu3Roll === 2){
            steps = [cpu3.position, cpu3.position+1, cpu3.position+2]
        }
        if (cpu3Roll === 3){
            steps = [cpu3.position, cpu3.position+1, cpu3.position+2, cpu3.position+3]
        }
        if (cpu3Roll === 4){
            steps = [cpu3.position, cpu3.position+1, cpu3.position+2, cpu3.position+3, cpu3.position+4]
        }
        if (cpu3Roll === 5){
            steps = [cpu3.position, cpu3.position+1, cpu3.position+2, cpu3.position+3, cpu3.position+4, cpu3.position+5]
        } 
        if (cpu3Roll === 6){
            steps = [cpu3.position, cpu3.position+1, cpu3.position+2, cpu3.position+3, cpu3.position+4, cpu3.position+5, cpu3.position+6]
        } 

        for( let i = 0; i < steps.length; i++){
            setTimeout(() => setCpu3((cpu3) => ({
                ...cpu3,
                position: steps[i]
            })), (250 * (i+1)))
        } 
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
        
        const order = whoIsWinning.sort((a,b)=> a - b)
        if (parseInt(player.position) === parseInt(order[order.length - 1])){
            return <div id={player.name}>1st</div>
        } if (parseInt(player.position) === parseInt(order[order.length - 2])){
            return <div id={player.name}>2nd</div>
        } if (parseInt(player.position) === parseInt(order[order.length - 3])){
            return <div id={player.name}>3rd</div>
        } else {
            return <div id={player.name}>4th</div>
        }
        
    })

    return(
        <div>
            <div id='dice'>
            <Dice onRoll={handleRoll} size={80} />
            </div>
            
            <div id="game-board">
                {assignPositions}
            </div>

            <div id='hub'>
                {positionDisplay}
            </div>
            <button id='save-game-button' onClick={handleSave}>
                <img id='save-game-img' src={save}/>
            </button>
            <img src={board}></img>
            <img id='game-player-label' src={playerlabel}/>
            <img id='game-cpu1-label' src={cpu1label}/>
            <img id='game-cpu2-label' src={cpu2label}/>
            <img id='game-cpu3-label' src={cpu3label}/>
            
        </div>
    )
}

export default Game