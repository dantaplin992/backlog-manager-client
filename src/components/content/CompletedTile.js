import React from "react"
import '../../styles/GameTile.css'

export default function CompletedTile(props) {

  return (
    <div className={props.game.completionStatus === "Completed" ? "completed-tile" : "abandoned-tile"}>
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
      <div className={props.game.completionStatus === "Completed" ? "completion-status-completed" : "completion-status-abandoned"}>
        {props.game.completionStatus}
      </div>
      <div className="review-text-container">
        {props.game.review}
      </div>
    </div>
  )
  
}
