import React, { useEffect, useState } from 'react'
import shortid from 'shortid'
import NewGameForm from './NewGameForm'
import GameSearch from './GameSearch'
import GameTile from './GameTile'
const Swal = require ('sweetalert2')

export default function Queue(props) {
  const [selected, setSelected] = useState(null)

  function addSelected(selected) {
    setSelected(selected)
  }

  function actionAlert(message) {
    Swal.fire({
      title: message,
      timer: 1500,
      timerProgressBar: true,
    })
  }

  function addGameToBacklog(newGame) {
    const sendObj = { userId: props.user._id, username: props.user.username, game: newGame }
    const url = `http://localhost:5000/backlog/add`
    fetch(url, {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(sendObj)
    }).then(() => {
      props.refreshGames()
      let message = "Added " + newGame.name + " To Your Backlog!"
      console.log(message)
      setSelected(null)
      actionAlert(message)
      props.socketEmit('addedGame', sendObj)
    })
  }

  function removeFromBacklog(gameObj) {
    const sendObj = { userId: props.user._id, game: gameObj }
    const url = `http://localhost:5000/backlog/remove`
    fetch(url, {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(sendObj)
    }).then(() => {
      props.refreshGames()
      let message = "Removed " + gameObj.name + " From Your Backlog!"
      console.log(message)
      actionAlert(message)
    })
  }

  function startPlaying(gameObj) {
    const sendObj = { userId: props.user._id, game: gameObj }
    const url = `http://localhost:5000/backlog/start_playing`
    fetch(url, {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(sendObj)
    }).then(() => {
      props.refreshGames()
      let message = "Started playing " + gameObj.name + "!"
      console.log(message)
      actionAlert(message)
    })
  }

  function gameTiles() {
    if (props.games.length > 0) {
      let tiles = [] 
      for (let i in props.games) {
        tiles.unshift(
          <GameTile 
            game={props.games[i]} 
            key={shortid.generate()} 
            removeFunction={removeFromBacklog} 
            startGame={startPlaying}
          />
        )
      }
      return tiles
    } else {
      return (
        <span className="number-of-items">Nothing here yet - add some games to get started!</span>
      )
    }
    
  }

  return (
    <div className="Queue">
      {props.games ? gameTiles() : ''}
      {selected ? <NewGameForm game={selected} addGameToBacklog={addGameToBacklog}/> : <div></div>}
      <GameSearch selectGame={addSelected} />
    </div>
  )
}