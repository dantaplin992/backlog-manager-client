import React from "react"
import '../../styles/GameTile.css'

export default function GameTile(props) {
return (
  <div className="game-tile">
    <div className="title">
      {props.game.name}
    </div>
    <div className="release-year">
      {props.game.released.split("-")[0]}
    </div>
    <div className="platform">
      {props.game.platform}
    </div>
    <button className="tile-button" onClick={() => {props.removeFunction(props.game)}}>Remove</button>
    <button className="tile-button">Start Playing</button>
  </div>
)
}