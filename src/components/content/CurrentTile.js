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
      <div className="reason-badge">
        {props.game.playReason}
      </div>
      <div className="action-buttons">
        <button className="tile-button">Review / Finish</button>
        <button className="tile-button" onClick={() => {props.abandon(props.game)}}>Abandon</button>
        <button className="tile-button" onClick={() => {props.playLater(props.game)}}>Play Later</button>
      </div>
    </div>
  )
}