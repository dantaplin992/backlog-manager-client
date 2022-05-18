import React, { useState, useEffect } from "react"
import shortid from "shortid"
import CurrentTile from "./CurrentTile"

export default function CurrentlyPlaying(props) {

  function playLater(gameObj) {
    const sendObj = { userId: props.user._id, game: gameObj }
    const url = `http://localhost:5000/backlog/play_later`
    fetch(url, {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(sendObj)
    }).then(() => {
      props.refreshGames()
      console.log("Moved " + gameObj.name + " back into Backlog")
    })
  }

  function abandon(gameObj) {
    const sendObj = { userId: props.user._id, game: gameObj }
    const url = `http://localhost:5000/backlog/abandon`
    fetch(url, {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(sendObj)
    }).then(() => {
      props.refreshGames()
      console.log("Abandoned " + gameObj.name + " playthrough")
    })
  }

  function review(gameObj, reviewText) {
    const sendObj = { userId: props.user._id, game: gameObj, review: reviewText }
    const url = `http://localhost:5000/backlog/review`
    fetch(url, {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(sendObj)
    }).then(() => {
      props.refreshGames()
      console.log("Abandoned " + gameObj.name + " playthrough")
    })
  }

  function gameTiles() {
    let tiles = [] 
    for (let i in props.games) {
      tiles.unshift(
        <CurrentTile 
          game={props.games[i]} 
          key={shortid.generate()}  
          playLater={playLater}
          abandon={abandon}
          review={review}
        />
      )
    }
    return tiles
  }

  return (
    <div className="CurrentlyPlaying">
      {gameTiles()}
    </div>
  )
}