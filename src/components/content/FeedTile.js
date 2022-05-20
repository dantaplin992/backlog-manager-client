import React from "react"
import '../../styles/NewsFeed.css'
import { formatDistance } from 'date-fns'

export default function FeedTile(props) {

  function message() {
    if (props.item.action === 'add') return <span><strong>{props.item.username}</strong> added <strong>{props.item.gameTitle}</strong> to their backlog</span>
    if (props.item.action === 'abandon') return <span><strong>{props.item.username}</strong> stopped playing <strong>{props.item.gameTitle}</strong></span>
    if (props.item.action === 'abandon') return <span><strong>{props.item.username}</strong> stopped playing <strong>{props.item.gameTitle}</strong></span>
    if (props.item.action === 'start') return <span><strong>{props.item.username}</strong> started playing <strong>{props.item.gameTitle}</strong></span>
    if (props.item.action === 'review') return <span><strong>{props.item.username}</strong> completed <strong>{props.item.gameTitle}</strong></span>
    return ''
  }

  function likeButton() {
    if (props.item.likes.includes(props.user.username)) {
      props.socketEmit('removeLike', { username: props.user.username, itemId: props.item._id })
    } else {
      props.socketEmit('addLike', { username: props.user.username, itemId: props.item._id })

    }
  }

  return (
    <div className="FeedTile">
      <div className="feed-message">{message()}</div>
      <div className="feed-date">{formatDistance(new Date(props.item.timeStamp), new Date())} ago</div>
      <div className="like-button-container">
        <input
       className="like-button" 
       type="image" 
       src="https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/320/toss-face/330/thumbs-up_1f44d.png" 
       onClick={likeButton}
       />
       <span className={props.item.likes.includes(props.user.username) ? "likes-count-active" : "likes-count"}>{props.item.likes.length}</span>
      </div>
    </div>
  )
}