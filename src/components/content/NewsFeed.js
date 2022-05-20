import React, { useState, useEffect } from 'react'
import FeedTile from './FeedTile'

export default function NewsFeed(props) {

  props.refreshFeed()

  function feedTiles() {
    let tiles = []
    for (let i in props.feedItems) {
      tiles.unshift(<FeedTile 
        item={props.feedItems[i]}
        socketEmit={props.socketEmit}
        user={props.user}
        />)
    }
    return tiles
  }

  return (
    <div className="NewsFeed">
      <h2>Activity Feed</h2>
      {props.feedItems ? feedTiles() : ''}
    </div>
  )
}
