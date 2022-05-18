import React from "react"
import '../../styles/GameTile.css'

export default function CompletedTile(props) {

  return (
    <div className="completed-tile">
      <div className="title">
        {props.game.name}
      </div>
      <div className="release-year">
        {props.game.released.split("-")[0]}
      </div>
      <div className="platform">
        {props.game.platform}
      </div>
      <div className="completion-status">
        {props.game.completionStatus}
      </div>
    </div>
  )
  
}
