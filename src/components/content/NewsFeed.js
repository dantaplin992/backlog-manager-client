import React, { useState, useEffect } from 'react'

export default function NewsFeed(props) {

  function feedTiles() {
    let tiles = []
    for (let i in props.feedItems) {
      tiles.push(<div key={i}><p>{props.feedItems[i].userId}</p></div>)
    }
    return tiles
  }

  return (
    <div className="NewsFeed">
      <h2>News Feed</h2>
      {props.feedItems ? feedTiles() : ''}
    </div>
  )
}
