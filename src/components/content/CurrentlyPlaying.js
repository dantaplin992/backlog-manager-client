import React, { useState, useEffect } from "react"
import shortid from "shortid"
import CurrentTile from "./CurrentTile"
const Swal = require('sweetalert2')

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
    Swal.fire({
      title: "Are You Sure?",
      text: "Abandon your playthrough of " + gameObj.name + "?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Confirm'
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire('You Stopped Playing ' + gameObj.name)
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
      console.log("Completed " + gameObj.name)
      Swal.fire({
        title: "Completed " + gameObj.name,
        icon: "success"
      })
    })
  }

  function gameTiles() {
    if (props.games.length > 0) {
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
    } else {
      return <span className="number-of-items">You aren't playing anything at the moment</span>
    }
  }

  return (
    <div className="CurrentlyPlaying">
      {props.games ? gameTiles() : ''}
    </div>
  )
}