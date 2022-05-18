import React, { useEffect, useState } from 'react'
import equal from 'fast-deep-equal'
import shortid from 'shortid'
import NewGameForm from './NewGameForm'
import GameSearch from './GameSearch'
import GameTile from './GameTile'

export default function Queue(props) {
  const [selected, setSelected] = useState(null)

  function addSelected(selected) {
    setSelected(selected)
  }

  function addGameToBacklog(newGame) {
    const sendObj = { userId: props.user._id, game: newGame }
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
      console.log("Added to Backlog")
      setSelected(null)
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
      console.log("Removed From Backlog")
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
      console.log("Started playing " + gameObj.name)
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

  function noGamesMessage() {
    return (
      <span><strong>Nothing yet - add some games to get started!</strong></span>
    )
  }

  return (
    <div className="Queue">
      {props.games ? gameTiles() : ''}
      {selected ? <NewGameForm game={selected} addGameToBacklog={addGameToBacklog}/> : <div></div>}
      <GameSearch selectGame={addSelected} />
    </div>
  )
}