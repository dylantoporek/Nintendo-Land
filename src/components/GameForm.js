import React, {useState} from "react";

function GameForm({setTogNewGame}){
    const [playerAvatar, setPlayerAvatar] = useState("https://raw.githubusercontent.com/N3evin/AmiiboAPI/master/images/icon_00000000-00000002.png")
    const [cpu1Avatar, setCpu1Avatar] = useState("https://raw.githubusercontent.com/N3evin/AmiiboAPI/master/images/icon_00010000-000c0002.png")
    const [cpu2Avatar, setCpu2Avatar] = useState("https://raw.githubusercontent.com/N3evin/AmiiboAPI/master/images/icon_01020100-001b0002.png")
    const [cpu3Avatar, setCpu3Avatar] = useState("https://raw.githubusercontent.com/N3evin/AmiiboAPI/master/images/icon_19060000-00240002.png")
    const [playerPosition, setPlayerPosition] = useState(0)
    const [cpu1Position, setCpu1Position] = useState(0)
    const [cpu2Position, setCpu2Position] = useState(0)
    const [cpu3Position, setCpu3Position] = useState(0)
    const [errors, setErrors]= useState([])
    
    function handlePChange(e){
        setPlayerAvatar(e.target.value)
    }

    function handleSubmit(e){
        e.preventDefault()
        console.log(playerAvatar)
        console.log(cpu1Avatar)
        console.log(cpu2Avatar)
        console.log(cpu3Avatar)
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
       let newGameObj = {
            player_avatar: playerAvatar,
            player_position: playerPosition,
            cpu1_avatar: cpu1Avatar,
            cpu1_position: cpu1Position,
            cpu2_avatar: cpu2Avatar,
            cpu2_position: cpu2Position,
            cpu3_avatar: cpu3Avatar,
            cpu3_position: cpu3Position
        }
        fetch('http://localhost:3000/games',{
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({newGameObj}),
    }).then((r) => {
      if (r.ok) {
        r.json().then((game) => console.log(game));
      } else {
        r.json().then((err) => setErrors(err.errors));
      }
    });
    }
    return(
        <div>
            <form onSubmit={handleSubmit}>
                <label>Pick Your Character</label>
                <select value={playerAvatar} onChange={handlePChange}>
                    <option value="https://raw.githubusercontent.com/N3evin/AmiiboAPI/master/images/icon_00000000-00000002.png">Mario</option>
                    <option value="https://raw.githubusercontent.com/N3evin/AmiiboAPI/master/images/icon_01000000-037c0002.png">Young Link</option>
                    <option value="https://raw.githubusercontent.com/N3evin/AmiiboAPI/master/images/icon_01010000-000e0002.png">Zelda</option>
                    <option value="https://raw.githubusercontent.com/N3evin/AmiiboAPI/master/images/icon_00030000-00020002.png">Yoshi</option>
                    <option value="https://raw.githubusercontent.com/N3evin/AmiiboAPI/master/images/icon_19070000-03840002.png">Squirtle</option>
                    <option value="https://raw.githubusercontent.com/N3evin/AmiiboAPI/master/images/icon_19190000-00090002.png">Pikachu</option>
                    <option value="https://raw.githubusercontent.com/N3evin/AmiiboAPI/master/images/icon_00080000-00030002.png">DK</option>
                    <option value="https://raw.githubusercontent.com/N3evin/AmiiboAPI/master/images/icon_00090000-000d0002.png">Diddy Kong</option>
                </select>
               

            
                <label>Pick Cpu1 Character</label>
                <select value={cpu1Avatar} onChange={handleC1Change}>
                    <option value="https://raw.githubusercontent.com/N3evin/AmiiboAPI/master/images/icon_00010000-000c0002.png">Luigi</option>
                    <option value="https://raw.githubusercontent.com/N3evin/AmiiboAPI/master/images/icon_00140000-02670102.png">Waluigi</option>
                    <option value="https://raw.githubusercontent.com/N3evin/AmiiboAPI/master/images/icon_00070000-001a0002.png">Wario</option>
                </select>


                <label>Pick Cpu2 Character</label>
                <select value={cpu2Avatar} onChange={handleC2Change}>
                    <option value="https://raw.githubusercontent.com/N3evin/AmiiboAPI/master/images/icon_01020100-001b0002.png">Ganondorf</option>
                    <option value="https://raw.githubusercontent.com/N3evin/AmiiboAPI/master/images/icon_01400000-03550902.png">Guardian</option>
                    <option value="https://raw.githubusercontent.com/N3evin/AmiiboAPI/master/images/icon_01410000-035c0902.png">Bokoblin</option>
                </select>

  


                <label>Pick Cpu3 Character</label>
                <select value={cpu3Avatar} onChange={handleC3Change}>
                    <option value="https://raw.githubusercontent.com/N3evin/AmiiboAPI/master/images/icon_19060000-00240002.png">Charizard</option>
                    <option value="https://raw.githubusercontent.com/N3evin/AmiiboAPI/master/images/icon_19020000-03830002.png">Ivysaur</option>
                    <option value="https://raw.githubusercontent.com/N3evin/AmiiboAPI/master/images/icon_19960000-023d0002.png">Mewtwo</option>
                </select>
                <button>Submit</button>
            </form>

            <button onClick={newGameStart}>Start New Game</button>

            <button onClick={()=> setTogNewGame(false)}>Back to Home</button>

            <div>
            {errors.map((err) => (
              <p key={err}>{err}</p>
            ))}
            </div>
        </div>
    )
}

export default GameForm