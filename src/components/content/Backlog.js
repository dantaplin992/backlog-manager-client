import React, { useEffect, useState } from 'react'
import equal from 'fast-deep-equal'
import Queue from './Queue'
import CurrentlyPlaying from './CurrentlyPlaying'
import Completed from './Completed'

export default function Backlog(props) {
  const [games, setGames] = useState([])
  const [selected, setSelected] = useState(null)

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
      console.log("GOT GAMES")
      if (!equal(games, data[0])) setGames(data[0])
    })
  }

  useEffect(() => {
    getAllGames()
  }, [games])

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
      getAllGames()
      console.log("Added to Backlog")
      setSelected(null)
    })
  }

  useEffect(() => {
    if (selected) console.log('Selected new game: ' + selected.name)
  }, [selected])

  return (
    <div className="Backlog">
      <h2>My Backlog</h2>
      <Queue games={games.queued} addGameToBacklog={addGameToBacklog} refreshGames={getAllGames} user={props.user} />
      <CurrentlyPlaying games={games.currentlyPlaying} refreshGames={getAllGames} user={props.user} />
      <Completed games={games.finished} />
      
    </div>
  )
}