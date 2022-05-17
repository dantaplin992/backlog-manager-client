import React, { useEffect, useState } from 'react'

export default function NewGameForm(props) {
  const [displayGame, setDisplayGame] = useState(null)

  return (
    <div className="NewGameForm">
      Add Game
      <div>{props.game.name}</div>
      <div>{props.game.released.split("-")[0]}</div>
    </div>
  )
}