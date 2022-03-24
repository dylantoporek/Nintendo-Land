import React, {useState} from "react";
import {useNavigate} from 'react-router-dom'
import playerlabel from './pages/playerlabel.png'
import cpu1label from './pages/cpu1label.png'
import cpu2label from './pages/cpu2label.png'
import cpu3label from './pages/cpu3label.png'
import start from './pages/start.png'



function GameForm({setGame}){
    const [playerAvatar, setPlayerAvatar] = useState("https://raw.githubusercontent.com/N3evin/AmiiboAPI/master/images/icon_00000000-00000002.png")
    const [cpu1Avatar, setCpu1Avatar] = useState("https://raw.githubusercontent.com/N3evin/AmiiboAPI/master/images/icon_00010000-000c0002.png")
    const [cpu2Avatar, setCpu2Avatar] = useState("https://raw.githubusercontent.com/N3evin/AmiiboAPI/master/images/icon_01020100-001b0002.png")
    const [cpu3Avatar, setCpu3Avatar] = useState("https://raw.githubusercontent.com/N3evin/AmiiboAPI/master/images/icon_1bd70000-03860002.png")
    const [errors, setErrors]= useState([])
    const navigate = useNavigate()
    
    function handlePChange(e){
        setPlayerAvatar(e.target.value)
    }

    function handleC1Change(e){
        setCpu1Avatar(e.target.value)
    }


    function handleC2Change(e){
        setCpu2Avatar(e.target.value)
    }

    function handleC3Change(e){
        setCpu3Avatar(e.target.value)
    }

    function newGameStart(){
       let game = {
            player_avatar: playerAvatar,
            player_position: 0,
            cpu1_avatar: cpu1Avatar,
            cpu1_position: 0,
            cpu2_avatar: cpu2Avatar,
            cpu2_position: 0,
            cpu3_avatar: cpu3Avatar,
            cpu3_position: 0
        }

        //CREATE FETCH FOR GAMES 
        fetch('/api/v1/games',{
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(game),
            }).then((r) => {
            if (r.ok) {
                r.json().then((data) => {
                    setGame(data)
                    navigate('/game')
                });
            } else {
                r.json().then((err) => setErrors(err.errors));
            }
        });
    }

    const selectedAvatars = [playerAvatar, cpu1Avatar, cpu2Avatar, cpu3Avatar]

    const selectedDisplay = selectedAvatars.map((av)=> {
        return <img className="avatar-preview" src={av}></img>
    })
    return(
        <div>
            <form id='new-game-form'>
                <img src={playerlabel} id='p1-label'/>
                <select id='p1-select' value={playerAvatar} onChange={handlePChange}>
                    <option value="https://raw.githubusercontent.com/N3evin/AmiiboAPI/master/images/icon_00000000-00000002.png">Mario</option>
                    <option value="https://raw.githubusercontent.com/N3evin/AmiiboAPI/master/images/icon_01000000-037c0002.png">Young Link</option>
                    <option value="https://raw.githubusercontent.com/N3evin/AmiiboAPI/master/images/icon_01010000-000e0002.png">Zelda</option>
                    <option value="https://raw.githubusercontent.com/N3evin/AmiiboAPI/master/images/icon_00030000-00020002.png">Yoshi</option>
                    <option value="https://raw.githubusercontent.com/N3evin/AmiiboAPI/master/images/icon_19070000-03840002.png">Squirtle</option>
                    <option value="https://raw.githubusercontent.com/N3evin/AmiiboAPI/master/images/icon_19190000-00090002.png">Pikachu</option>
                    <option value="https://raw.githubusercontent.com/N3evin/AmiiboAPI/master/images/icon_00080000-00030002.png">DK</option>
                    <option value="https://raw.githubusercontent.com/N3evin/AmiiboAPI/master/images/icon_00090000-000d0002.png">Diddy Kong</option>
                </select>
               
                <img src={cpu1label} id='cpu1-label'/>
                <select id='cpu1-select' value={cpu1Avatar} onChange={handleC1Change}>
                    <option value="https://raw.githubusercontent.com/N3evin/AmiiboAPI/master/images/icon_00010000-000c0002.png">Luigi</option>
                    <option value="https://raw.githubusercontent.com/N3evin/AmiiboAPI/master/images/icon_00140000-02670102.png">Waluigi</option>
                    <option value="https://raw.githubusercontent.com/N3evin/AmiiboAPI/master/images/icon_00070000-001a0002.png">Wario</option>
                </select>

                <img src={cpu2label} id='cpu2-label'/>
                <select id='cpu2-select' value={cpu2Avatar} onChange={handleC2Change}>
                    <option value="https://raw.githubusercontent.com/N3evin/AmiiboAPI/master/images/icon_01020100-001b0002.png">Ganondorf</option>
                    <option value='https://raw.githubusercontent.com/N3evin/AmiiboAPI/master/images/icon_01010100-00170002.png'>Sheik</option>
                    <option value="https://raw.githubusercontent.com/N3evin/AmiiboAPI/master/images/icon_01410000-035c0902.png">Bokoblin</option>
                </select>

                <img src={cpu3label} id='cpu3-label'/>
                <select id='cpu3-select' value={cpu3Avatar} onChange={handleC3Change}>
                    <option value="https://raw.githubusercontent.com/N3evin/AmiiboAPI/master/images/icon_1bd70000-03860002.png">Incineroar</option>
                    <option value="https://raw.githubusercontent.com/N3evin/AmiiboAPI/master/images/icon_19020000-03830002.png">Ivysaur</option>
                    <option value="https://raw.githubusercontent.com/N3evin/AmiiboAPI/master/images/icon_19960000-023d0002.png">Mewtwo</option>
                </select>
            </form>

            <button id='start-new-game' onClick={newGameStart}>
                <img id='start-button-styler' src={start} />
            </button>

            <div id='preview-container'>
                {selectedDisplay}
            </div>
            <div className="errors">
            {errors.map((err) => (
              <p key={err}>{err}</p>
            ))}
            </div>
        </div>
    )
}

export default GameForm