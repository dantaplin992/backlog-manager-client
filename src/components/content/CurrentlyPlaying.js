import React, { useState, useEffect } from "react"
import shortid from "shortid"
import CurrentTile from "./CurrentTile"

export default function CurrentlyPlaying(props) {

  function gameTiles() {
    let tiles = [] 
    for (let i in props.games) {
      tiles.unshift(
        <CurrentTile game={props.games[i]} key={shortid.generate()} />
      )
    }
    return tiles
  }

  return (
    <div className="CurrentlyPlaying">
      <h2>Currently Playing</h2>
      {gameTiles()}
    </div>
  )
}