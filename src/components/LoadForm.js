import React, {useState, useEffect} from "react";
import {useNavigate} from "react-router-dom"
import loadgame from './pages/loadgame.png'
import deletegame from './pages/deletegame.png'
import url from "../url";

function LoadForm({setGame}){
    
    const [loadFiles, setLoadFiles] = useState([])
    const navigate = useNavigate()
    
    //INDEX FETCH FOR GAMES
    useEffect(()=> {
        fetch(url+"/games", {
          headers: {
            "Access-Control-Allow-Origin": '*',
            mode: 'cors',
          }
        }).then((r)=> {
            if (r.ok) {
              r.json().then((games)=> {
                setLoadFiles(games)
              })
            } else {
              r.json().then((data)=> console.log(data))
            }
          })

    }, [])


    function handleLoad(e){
        const loadGame = findFile(e.target.dataset.id)
        setGame(loadGame)
        navigate('/game')
    }

    // DELETE FETCH FOR GAMES
    function handleDelete(e){
        const deletedFile = findFile(e.target.dataset.id)
        const updatedLoadFiles = loadFiles.filter((file)=> file.id != deletedFile.id)
        setLoadFiles(updatedLoadFiles)

        fetch(url+`/games/${deletedFile.id}`, {
          method: 'DELETE',
          headers: {
            "Access-Control-Allow-Origin": '*',
            mode: 'cors',
          }
          })
          .then((res) => {
            if (res.ok) {
              console.log("file deleted")
            } else {
              res.json().then((data)=> console.log(data))
            }
          })
    }

    function findFile(num){
       const foundFile = loadFiles.find((file) => parseInt(file.id) === parseInt(num))
       return foundFile
    }



    const loadDisplay = loadFiles.map((file) =>{
        return <div className='load-files' key={file.id}>

                <p className="save-files">Save File {file.id}</p>
                <div id="load-game-avatar-container">
                    <img className="save-files-avatar" src={file.player_avatar}></img>
                    <img className="save-files-avatar" src={file.cpu1_avatar}></img>
                    <img className="save-files-avatar" src={file.cpu2_avatar}></img>
                    <img className="save-files-avatar" src={file.cpu3_avatar}></img>
                </div>
                <button className='load-game-submits' onClick={handleLoad} value={file.id}>
                    <img className='load-game-img' src={loadgame} data-id={file.id}/>
                </button>
                <button className='load-game-deletes' onClick={handleDelete} value={file.id}>
                    <img className='delete-game-img' src={deletegame}  data-id={file.id}/>
                </button>
                
        </div>  
    })

    return (
        <div>
            {loadDisplay}
        </div>
    )
}

export default LoadForm