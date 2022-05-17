import React, { useEffect, useState } from 'react'
import equal from 'fast-deep-equal'
import shortid from 'shortid'
import NewGameForm from './NewGameForm'
import GameSearch from './GameSearch'

export default function Backlog(props) {
  const [newGameTitle, setNewGameTitle] = useState('')
  const [games, setGames] = useState([])
  const [selected, setSelected] = useState(null)

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

  function addSelected(selected) {
    setSelected(selected)
  }

  useEffect(() => {
    if (selected) console.log('Selected new game: ' + selected.name)
  }, [selected])

  return (
    <div className="Backlog">
      <h2>My Backlog</h2>
      {gameTiles()}
      {selected ? <NewGameForm game={selected} /> : <div></div>}
      <GameSearch selectGame={addSelected} />
    </div>
  )
}