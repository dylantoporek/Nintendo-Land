import React, {useState, useEffect} from "react";
import {useNavigate} from "react-router-dom"

function LoadForm({setGame, setTogLoadGame, gameFiles}){
    const [loadFiles, setLoadFiles] = useState([])
    const navigate = useNavigate()
    useEffect(()=> {
        if (gameFiles){
            setLoadFiles(gameFiles)
        } else {
            alert("you have no saved games")
            navigate('/')
        }
    }, [])

    function handleLoad(e){
        const loadGame = findFile(e.target.value)
        setGame(loadGame)
        navigate('/game')
    }

    function handleDelete(e){
        const deletedFile = findFile(e.target.value)
        const updatedLoadFiles = loadFiles.filter((file)=> file.id != deletedFile.id)
        setLoadFiles(updatedLoadFiles)

        fetch(`/games/${deletedFile.id}`, {
            method: 'DELETE',
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
            <p className="save-files">save file {file.id}</p>
            <img className="save-files-avatar" src={file.player_avatar}></img>
            <button className='load-game-submits' onClick={handleLoad} value={file.id}>Load Game</button>
            <button className='load-game-deletes' onClick={handleDelete} value={file.id}>Delete Game</button>
        </div>
    })

    return (
        <div>
            {loadDisplay}
            <button id='back-to-home-from-load' onClick={()=> setTogLoadGame(false)}>Back to Home</button>
        </div>
    )
}

export default LoadForm