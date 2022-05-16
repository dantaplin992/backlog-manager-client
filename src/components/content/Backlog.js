import React, { useEffect, useState } from 'react'
import equal from 'fast-deep-equal'
import shortid from 'shortid'
import NewGameForm from './NewGameForm'

export default function Backlog(props) {
  const [newGameTitle, setNewGameTitle] = useState('')
  const [games, setGames] = useState([])

  function handleInput(event) {
    event.preventDefault()
    setNewGameTitle(event.target.value)
  }

  function getAllGames() {
    const url = `http://localhost:5000/backlog/all?userid=${props.user._id}`
    fetch(url, {
      method: "GET",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
    }).then(response => response.json()
    ).then((data) => {
      if(!equal(games, data[0].games)) setGames(data[0].games)
    })
  }

  function addGameToBacklog(event) {
    event.preventDefault()
    const newGame = { userId: props.user._id, title: newGameTitle }
    const url = `http://localhost:5000/backlog/add`
    fetch(url, {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newGame)
    }).then(response => response.json()
    ).then((data) => {
      getAllGames()
      setNewGameTitle('')
    })
  }

  useEffect(() => {
    getAllGames()
  }, [games])

  function gameTiles() {
    let tiles = [] 
    for (let i in games) {
      tiles.unshift(<p key={shortid.generate()}>{games[i].title}</p>)
    }
    return tiles
  }

  return (
    <div className="Backlog">
      My Backlog
      <NewGameForm inputChange={handleInput} submitFunction={addGameToBacklog} text={newGameTitle} />
      {gameTiles()}
    </div>
  )
}