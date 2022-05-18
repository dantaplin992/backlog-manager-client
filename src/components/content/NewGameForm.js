import React, { useEffect, useState } from 'react'

export default function NewGameForm(props) {
  const [platform, setPlatform] = useState(props.game.platforms[0].platform.name)
  const [playReason, setPlayReason] = useState('First Playthorugh')

  function platformButtons() {
    let options = []
    for (let i in props.game.platforms) {
      options.push(
        <button 
        onClick={() => {setPlatform(props.game.platforms[i].platform.name)}}
        >
          {props.game.platforms[i].platform.name}
        </button>
        )
    }

    return (
      <div className="platform-buttons">
        {options}
      </div>
    )
    
  }

  function playReasonButtons() {
    let playReasons = ["First Play", "Trophy Hunt", "Speedrun", "Just for fun"]
    let buttons = []

    for (let i in playReasons) {
      buttons.push(
        <button className="reason-button-off" onClick={() => {setPlayReason(playReasons[i])}}>{playReasons[i]}</button>
      )
    }

    return (
      <div className="play-reason-buttons">
        {buttons}
      </div>
    )
  }

  function addToBacklog() {
    const newGameObj = {
      name: props.game.name,
      released: props.game.released,
      platform: platform,
      playReason: playReason,
      completionStatus: null,
    }
    props.addGameToBacklog(newGameObj)
  }

  useEffect(() => {
    console.log("Selected Platform: " + platform)
  }, [platform])

  useEffect(() => {
    console.log("Selected play reason: " + playReason)
  }, [playReason])

  return (
    <div className="NewGameForm">
      <div>{props.game.name}</div>
      <div>{props.game.released.split("-")[0]}</div>
      {platformButtons()}
      {playReasonButtons()}
      <div><button name="add-game-button" onClick={addToBacklog}>Add To Backlog</button></div>
    </div>
  )
}