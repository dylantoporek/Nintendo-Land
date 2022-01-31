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
import dice1 from '../pages/dice1.png'
import dice2 from '../pages/dice2.png'
import dice3 from '../pages/dice3.png'
import dice4 from '../pages/dice4.png'
import dice5 from '../pages/dice5.png'
import dice6 from '../pages/dice6.png'
import place1 from '../pages/place1.png'
import place2 from '../pages/place2.png'
import place3 from '../pages/place3.png'
import place4 from '../pages/place4.png'
import win from '../pages/wins.png'

function Game({game}){

    const [checkSpace, setCheckSpace] = useState(false)
    const [winnerTrigger, setWinnerTrigger] = useState(false)
    const [winner, setWinner] = useState([])
    const [diceLock, setDiceLock] = useState(false)

    const [player, setPlayer] = useState({
        name: "player",
        avatar: game.player_avatar,
        position: game.player_position
    })

    const [cpu1, setCpu1] = useState({
        name: "cpu1",
        avatar: game.cpu1_avatar,
        position: game.cpu1_position
    })

    const [cpu2, setCpu2] = useState({
        name: "cpu2",
        avatar: game.cpu2_avatar,
        position: game.cpu2_position
    })

    const [cpu3, setCpu3] = useState({
        name: "cpu3",
        avatar: game.cpu3_avatar,
        position: game.cpu3_position
    })

    const navigate = useNavigate()

    useEffect(()=>{
        if (!game){
            alert('You must create a new game or load an existing game to play.')
            navigate('/')
        } 
    }, [])

    // PATCH FETCH FOR GAMES
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


    useEffect(()=> {

        const checkSpacePromise = (callback, obj) => {
            return new Promise(function(resolve){
                setTimeout(() => {
                        callback(obj)
                        resolve("resolved")
                }, 100)
            })
        }

        if(checkSpace){
            checkSpacePromise(checkSpaceEffect, player)
            .then(()=>{
                return checkSpacePromise(checkSpaceEffect, cpu1)
            })
            .then(()=>{
                return checkSpacePromise(checkSpaceEffect, cpu2)
            })
            .then(()=>{  
                return checkSpacePromise(checkSpaceEffect, cpu3)
            })
            .then(()=>{
                return checkSpacePromise(setCheckSpace, false)
            })
            .then(()=>{
                return checkSpacePromise(setDiceLock, false)
            })
            .then(()=>{
                checkForWinner(player)
                checkForWinner(cpu1)
                checkForWinner(cpu2)
                checkForWinner(cpu3)
            })
        } else return null

    }, [checkSpace])

    function checkForWinner(obj){
        let alertName = obj.name.toUpperCase()
        
        if (parseInt(obj.position) >= 40){
            alert(`${alertName} reached the castle!`)
            setWinner((winner) =>[...winner, obj])
            setWinnerTrigger(true)
        } else return null
    }


    function handleRoll(roll){
        setDiceLock(true)
        const makeTurnPromise = (callback, player) => {
            return new Promise(function(resolve, reject){
                setTimeout(() => {
                    player ? callback(roll) : callback()
                    resolve("blah")
                }, 2000)
            })
        }

        const makeCpuTurnPromise = (callback, obj) => {
            return new Promise(function(resolve, reject){
                setTimeout(() => {
                    callback(obj)
                    resolve("blah")
                }, 2000)
            })
        }

        const checkTurnPromise = (callback, obj) => {
            return new Promise(function(resolve, reject){
                setTimeout(() => {
                    callback()
                    resolve(setCheckSpace(true))
                }, 2000)
            })
        }

        makeTurnPromise(playerRoll, true) 
        .then(()=> {
            return makeCpuTurnPromise(handleComRoll, cpu1)
        }).then(()=> {
            return makeCpuTurnPromise(handleComRoll, cpu2)
        }).then(()=> {
            return makeCpuTurnPromise(handleComRoll, cpu3)
        }).then(()=> {
            checkTurnPromise(setCheckSpace, true)
        })
            
            
    }

    function checkSpaceEffect(obj){
        let alertName = obj.name.toUpperCase()

        if (parseInt(obj.position) === 3){
            alert(`${alertName} used a Warp Pipe. They move ahead 4 spaces.`)
            // move from 3 to 7
            let effect = 7
            if (obj.name === 'player'){
                setPlayer({
                    ...player,
                    position: effect
                })
            }
            if (obj.name === 'cpu1'){
                setCpu1({
                    ...cpu1,
                    position: effect
                })
            }
            if (obj.name === 'cpu2'){
                setCpu2({
                    ...cpu2,
                    position: effect
                })
            }
            if (obj.name === 'cpu3'){
                setCpu3({
                    ...cpu3,
                    position: effect
                })
            }
        }
        if (parseInt(obj.position) === 5){
            alert(`${alertName} ran into Bowser. They move back 3 spaces.`)
            // move from 5 to 2
            let effect = 2
            if (obj.name === 'player'){
                setPlayer({
                    ...player,
                    position: effect
                })
            }
            if (obj.name === 'cpu1'){
                setCpu1({
                    ...cpu1,
                    position: effect
                })
            }
            if (obj.name === 'cpu2'){
                setCpu2({
                    ...cpu2,
                    position: effect
                })
            }
            if (obj.name === 'cpu3'){
                setCpu3({
                    ...cpu3,
                    position: effect
                })
            }
        }
        if (parseInt(obj.position) === 11){
            alert(`${alertName} got attacked by Bokoblins. They move back 1 space.`)
            // move from 11 to 10
            let effect = 10
            if (obj.name === 'player'){
                setPlayer({
                    ...player,
                    position: effect
                })
            }
            if (obj.name === 'cpu1'){
                setCpu1({
                    ...cpu1,
                    position: effect
                })
            }
            if (obj.name === 'cpu2'){
                setCpu2({
                    ...cpu2,
                    position: effect
                })
            }
            if (obj.name === 'cpu3'){
                setCpu3({
                    ...cpu3,
                    position: effect
                })
            }
        }
        if (parseInt(obj.position) === 15){
            alert(`${alertName} recieved help from Nurse Joy. They move ahead 4 spaces.`)
            //move from 15 to 19
            let effect = 19
            if (obj.name === 'player'){
                setPlayer({
                    ...player,
                    position: effect
                })
            }
            if (obj.name === 'cpu1'){
                setCpu1({
                    ...cpu1,
                    position: effect
                })
            }
            if (obj.name === 'cpu2'){
                setCpu2({
                    ...cpu2,
                    position: effect
                })
            }
            if (obj.name === 'cpu3'){
                setCpu3({
                    ...cpu3,
                    position: effect
                })
            }
        }
        if (parseInt(obj.position) === 18){
            alert(`${alertName} encountered a wild Pokémon. They move back 2 spaces.`)
            // move from 18 to 16
            let effect = 16
            if (obj.name === 'player'){
                setPlayer({
                    ...player,
                    position: effect
                })
            }
            if (obj.name === 'cpu1'){
                setCpu1({
                    ...cpu1,
                    position: effect
                })
            }
            if (obj.name === 'cpu2'){
                setCpu2({
                    ...cpu2,
                    position: effect
                })
            }
            if (obj.name === 'cpu3'){
                setCpu3({
                    ...cpu3,
                    position: effect
                })
            }
        }
        if (parseInt(obj.position) === 22){
            alert(`${alertName} got stuck behind a Slowpoke. They move back 1 space.`)
            // move from 22 to 21
            let effect = 21
            if (obj.name === 'player'){
                setPlayer({
                    ...player,
                    position: effect
                })
            }
            if (obj.name === 'cpu1'){
                setCpu1({
                    ...cpu1,
                    position: effect
                })
            }
            if (obj.name === 'cpu2'){
                setCpu2({
                    ...cpu2,
                    position: effect
                })
            }
            if (obj.name === 'cpu3'){
                setCpu3({
                    ...cpu3,
                    position: effect
                })
            }
        }
        if (parseInt(obj.position) === 27){
            alert(`${alertName} swang ahead using a vine. They move ahead 2 spaces.`)
            // move from 27 to 29
            let effect = 29
            if (obj.name === 'player'){
                setPlayer({
                    ...player,
                    position: effect
                })
            }
            if (obj.name === 'cpu1'){
                setCpu1({
                    ...cpu1,
                    position: effect
                })
            }
            if (obj.name === 'cpu2'){
                setCpu2({
                    ...cpu2,
                    position: effect
                })
            }
            if (obj.name === 'cpu3'){
                setCpu3({
                    ...cpu3,
                    position: effect
                })
            }
        }
        if (parseInt(obj.position) === 28){
            alert(`${alertName} got snapped up by a Piranha Plant. They move back 2 spaces.`)
            // move form 28 to 26
            let effect = 26
            if (obj.name === 'player'){
                setPlayer({
                    ...player,
                    position: effect
                })
            }
            if (obj.name === 'cpu1'){
                setCpu1({
                    ...cpu1,
                    position: effect
                })
            }
            if (obj.name === 'cpu2'){
                setCpu2({
                    ...cpu2,
                    position: effect
                })
            }
            if (obj.name === 'cpu3'){
                setCpu3({
                    ...cpu3,
                    position: effect
                })
            }
        }
        if (parseInt(obj.position) === 32){
            alert(`${alertName} was kicked by a Wild Wendell. The move back 2 spaces.`)
            // move from 32 to 30
            let effect = 30
            if (obj.name === 'player'){
                setPlayer({
                    ...player,
                    position: effect
                })
            }
            if (obj.name === 'cpu1'){
                setCpu1({
                    ...cpu1,
                    position: effect
                })
            }
            if (obj.name === 'cpu2'){
                setCpu2({
                    ...cpu2,
                    position: effect
                })
            }
            if (obj.name === 'cpu3'){
                setCpu3({
                    ...cpu3,
                    position: effect
                })
            }
        }
        if (parseInt(obj.position) === 37){
            alert(`${alertName} slipped on a banana. They move back 1 space.`)
            // move from 37 to 36
            let effect = 36
            if (obj.name === 'player'){
                setPlayer({
                    ...player,
                    position: effect
                })
            }
            if (obj.name === 'cpu1'){
                setCpu1({
                    ...cpu1,
                    position: effect
                })
            }
            if (obj.name === 'cpu2'){
                setCpu2({
                    ...cpu2,
                    position: effect
                })
            }
            if (obj.name === 'cpu3'){
                setCpu3({
                    ...cpu3,
                    position: effect
                })
            }
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
            })), (200 * (i+1)))
        } 
             
    }

    function handleComRoll(obj){
        let dice = [1, 2, 3, 4, 5, 6]
        let compRoll = dice[Math.floor(Math.random()*6)]
        let steps = []
        if (compRoll === 1){
            steps = [obj.position, obj.position+1]
        }
        if (compRoll === 2){
            steps = [obj.position, obj.position+1, obj.position+2]
        }
        if (compRoll === 3){
            steps = [obj.position, obj.position+1, obj.position+2, obj.position+3]
        }
        if (compRoll === 4){
            steps = [obj.position, obj.position+1, obj.position+2, obj.position+3, obj.position+4]
        }
        if (compRoll === 5){
            steps = [obj.position, obj.position+1, obj.position+2, obj.position+3, obj.position+4, obj.position+5]
        } 
        if (compRoll === 6){
            steps = [obj.position, obj.position+1, obj.position+2, obj.position+3, obj.position+4, obj.position+5, obj.position+6]
        } 

        if(obj.name === 'cpu1'){
            for( let i = 0; i < steps.length; i++){
                setTimeout(() => setCpu1((cpu1) => ({
                    ...cpu1,
                    position: steps[i]
                })), (200 * (i+1)))
            } 
        }
        if(obj.name === 'cpu2'){
            for( let i = 0; i < steps.length; i++){
                setTimeout(() => setCpu2((cpu2) => ({
                    ...cpu2,
                    position: steps[i]
                })), (200 * (i+1)))
            }  
        }
        if(obj.name === 'cpu3'){
            for( let i = 0; i < steps.length; i++){
                setTimeout(() => setCpu3((cpu3) => ({
                    ...cpu3,
                    position: steps[i]
                })), (200 * (i+1)))
            }   
        }
    }

    const activePlayers = [
        player, cpu1, cpu2, cpu3
    ]

    const whoIsWinning = [
        player.position, cpu1.position, cpu2.position, cpu3.position
    ]

    let whoWon = winner

    if(winner.length > 1){
        whoWon = [winner[0]]
    }


    const winnerDisplay = whoWon.map((person)=> {
        if (person.name === 'player'){
            return <div id='winner' key='winner'>
            <img className='winner-label'src={playerlabel}/>
            <img id='winner-avatar' src={person.avatar} />
            <img id='win' src={win}/>
        </div>
        }
        
        if (person.name === 'cpu1'){
            return <div id='winner' key='winner'>
            <img className='winner-label'src={cpu1label}/>
            <img id='winner-avatar' src={person.avatar} />
            <img id='win' src={win}/>
        </div>
        }
        if (person.name === 'cpu2'){
            return <div id='winner' key='winner'>
            <img className='winner-label'src={cpu2label}/>
            <img id='winner-avatar' src={person.avatar} />
            <img id='win' src={win}/>
        </div>
        }
        if (person.name === 'cpu3'){
            return <div id='winner' key='winner'>
            <img className='winner-label'src={cpu3label}/>
            <img id='winner-avatar' src={person.avatar} />
            <img id='win' src={win}/>
        </div>
        }
    })

    const assignPositions = activePlayers.map((player)=>{
        return <div key={player.name} className={`space-${player.name}-${player.position}`}>
                <img className="avatar" src={player.avatar}/>
        </div>
    })

    const positionDisplay = activePlayers.map((player) => {
        
        const order = whoIsWinning.sort((a,b)=> a - b)
        if (parseInt(player.position) === parseInt(order[order.length - 1])){
            return <div id={player.name}>
                <img className='place1' src={place1}/>
            </div>
        } if (parseInt(player.position) === parseInt(order[order.length - 2])){
            return <div id={player.name}>
                <img className='place2' src={place2}/>
            </div>
        } if (parseInt(player.position) === parseInt(order[order.length - 3])){
            return <div id={player.name}>
                <img className='place3' src={place3}/>
            </div>
        } else {
            return <div id={player.name}>
                <img className='place4' src={place4}/>
            </div>
        }
        
    })

    if(!winnerTrigger){
        return(
            <div id='game-container'>
                <div id='dice'>
                <Dice onRoll={diceLock? null : handleRoll} faces={[dice1, dice2, dice3, dice4, dice5, dice6]} faceBg={'#ff0000'} size={80} />
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
    } if (winnerTrigger){
        return(
            <div>
                <div id="game-board">
                    {assignPositions}
                </div>
                {/* <button id='save-game-button' onClick={handleSave}>
                    <img id='save-game-img' src={save}/>
                </button> */}
                <img src={board}></img>
                <div id='winner-container'></div>
                {winnerDisplay}
            </div>
        )
    }
    
}

export default Game