import React from "react"
import CompletedTile from './CompletedTile.js'
import shortid from "shortid"

export default function Completed(props) {

  function gameTiles() {
    console.log(props.games)
    if (props.games.length > 0) {
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
    } else {
      return <span className="number-of-items">You haven't finished any games yet</span>
    }
  }

  return (
    <div className="Completed">
      {props.games ? gameTiles() : ''}
    </div>
  )
}