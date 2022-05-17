import React, { useEffect, useState } from 'react'

export default function NewGameForm(props) {
  const [platform, setPlatform] = useState(props.game.platforms[0].platform.name)
  
  function platformDropDown() {
    let options = []
    for (let i in props.game.platforms) {
      options.push(<option>{props.game.platforms[i].platform.name}</option>)
    }

    return (
      <select name="platforms" onChange={(event) => {setPlatform(event.target.value)}}>
        {options}
      </select>
    )
  }

  function addToBacklog() {
    const newGameObj = {
      name: props.game.name,
      released: props.game.released,
      platform: platform,
      started: false,
      completed: false,
    }
    props.addGameToBacklog(newGameObj)
  }

  useEffect(() => {
    console.log("Selected Platform: " + platform)
  }, [platform])

  return (
    <div className="NewGameForm">
      <strong>Add Game</strong>
      <div>{props.game.name}</div>
      <div>{props.game.released.split("-")[0]}</div>
      {platformDropDown()}
      <div><button name="add-game-button" onClick={addToBacklog}>Add To Backlog</button></div>
    </div>
  )
}