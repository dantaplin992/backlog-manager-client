import React, { useState } from "react"
import '../../styles/GameTile.css'

export default function CurrentTile(props) {
  const [reviewing, setReviewing] = useState(false)
  const [reviewText, setReviewText] = useState('')

  function switchReviewing() {
    reviewing ? setReviewing(false) : setReviewing(true)
  }

  function handleReviewChange(e) {
    e.preventDefault()
    setReviewText(e.target.value)
  }

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
        <button className="tile-button" onClick={() => {switchReviewing(true)}}>{reviewing ? "Cancel" : "Review / Finish"}</button>
        <button className="tile-button" onClick={() => {props.abandon(props.game)}}>Abandon</button>
        <button className="tile-button" onClick={() => {props.playLater(props.game)}}>Play Later</button>
      </div>
      <div className={reviewing ? "review-box-display" : "review-box-hidden"}>
        <textarea onChange={handleReviewChange} className="review-textarea" value={reviewText}></textarea>
        <button onClick={() => {props.review(props.game, reviewText)}}>Submit Review</button>
      </div>
    </div>
  )
}