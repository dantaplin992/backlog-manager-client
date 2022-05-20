import React, { useEffect, useState } from 'react'
import Backlog from './Backlog'
import NewsFeed from './NewsFeed'
import io from 'socket.io-client'
import equal from 'fast-deep-equal'

export default function Content(props) {
  const [display, setDisplay] = useState('backlog')
  const [webSocket, setWebSocket] = useState(null)
  const [feedItems, setFeedItems] = useState([])

  function getFeedItems() {
    const url = 'http://localhost:5000/news_feed'
    fetch(url, {
      method: "GET",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
    }).then(response => response.json()
    ).then((data) => {
      console.log("GOT FEED ITEMS")
      if (!equal(feedItems, data)) setFeedItems(data)
    })
  }

  useEffect(() => {
    getFeedItems()
  }, [feedItems])

  function socketConnect() {
    let socket = io('http://localhost:5000')
    socket.on('handshake', (msg) => {
      console.log(msg)
    })
    socket.on('newGameAdded', (params) => {
      console.log(params)
    })
    socket.on('refreshFeedItems', (params) => {
      getFeedItems()
      console.log(params)
    })
    setWebSocket(socket)
  }

  useEffect(() => {
    if (!webSocket) socketConnect()
  }, [])

  function webSocketEmit(messageName, sendObj) {
    webSocket.emit(messageName, sendObj)
  }

  function displayContent() {
    if (display === 'newsfeed') return <NewsFeed user={props.currentUser} socketEmit={webSocketEmit} feedItems={feedItems} refreshFeed={getFeedItems}/>
    return <Backlog user={props.currentUser} socketEmit={webSocketEmit}/>
  }

  function changeDisplay() {
    if (display === 'backlog') {
      setDisplay('newsfeed')
      webSocketEmit('joinNewsFeed', {})
    } else {
      setDisplay('backlog')
      webSocketEmit('leaveNewsFeed', {})
    }
  }

  return (
    <div className="Content">
      <div id="display-buttons">
        <button className={display === 'backlog' ? "content-tab-button-on" : "content-tab-button-off"} onClick={changeDisplay}>Backlog</button>
        <button className={display === 'newsfeed' ? "content-tab-button-on" : "content-tab-button-off"} onClick={changeDisplay}>Activity Feed</button>
      </div>
        {displayContent()}
    </div>
  )
}