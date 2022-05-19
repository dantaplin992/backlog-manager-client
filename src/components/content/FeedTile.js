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

  return (
    <div className="FeedTile">
      <div className="feed-message">{message()}</div>
      <div className="feed-date">{formatDistance(new Date(props.item.timeStamp), new Date())} ago</div>
    </div>
  )
}