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
        let loadIndex = e.target.value - 1
        setGame(loadFiles[`${loadIndex}`])
        navigate('/game')
    }

    function handleDelete(e){
        console.log(e.target.value)
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