import React from "react"
import CompletedTile from './CompletedTile.js'
import shortid from "shortid"

export default function Completed(props) {

  function gameTiles() {
    console.log(props.games)
    let tiles = [] 
    for (let i in props.games) {
      tiles.unshift(
        <CompletedTile 
          game={props.games[i]} 
          key={shortid.generate()}
        />
      )
    }
    return tiles
  }

  return (
    <div className="Completed">
      <h2>Completed</h2>
      {gameTiles()}
    </div>
  )
}