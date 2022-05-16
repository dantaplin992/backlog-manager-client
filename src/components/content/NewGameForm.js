import React, { useEffect, useState } from 'react'

export default function NewGameForm(props) {
  return (
    <div className="NewGameForm">
      <form>
        <input type="text" name="gameInput" onChange={props.inputChange} value={props.text} />
        <button onClick={props.submitFunction}>Add game</button>
      </form>
    </div>
  )
}