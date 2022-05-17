import React from "react"
import '../../styles/GameTile.css'

export default function CurrentTile(props) {
  return (
    <div className="current-tile">
      <div className="title">
        {props.game.name}
      </div>
      <div className="release-year">
        {props.game.released.split("-")[0]}
      </div>
      <div className="platform">
        {props.game.platform}
      </div>
      <button className="tile-button">Review / Finish</button>
      <button className="tile-button">Abandon</button>
      <button className="tile-button" onClick={() => {props.playLater(props.game)}}>Play Later</button>
    </div>
  )
}