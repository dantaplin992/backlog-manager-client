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
    console.log("Getting games")
  }, [games])

  useEffect(() => {
    if (selected) console.log('Selected new game: ' + selected.name)
  }, [selected])

  return (
    <div className="Backlog">
      <div className="column-header"><h2>Queued <span className="number-of-items"> ({games.queued ? games.queued.length : ''})</span></h2></div>
      <div className="column-header"><h2>Currently Playing <span className="number-of-items"> ({games.currentlyPlaying ? games.currentlyPlaying.length : ''})</span></h2></div>
      <div className="column-header"><h2>Finished <span className="number-of-items"> ({games.finished ? games.finished.length : ''})</span></h2></div>
      <div className="columns">
        <Queue games={games.queued} refreshGames={getAllGames} user={props.user} socketEmit={props.socketEmit}/>
        <CurrentlyPlaying games={games.currentlyPlaying} refreshGames={getAllGames} user={props.user} socketEmit={props.socketEmit}/>
        <Completed games={games.finished} />
      </div>
    </div>
  )
}