import React, { useState, useEffect } from 'react'
import FeedTile from './FeedTile'

export default function NewsFeed(props) {

  function feedTiles() {
    let tiles = []
    for (let i in props.feedItems) {
      tiles.unshift(<FeedTile 
        item={props.feedItems[i]}
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
