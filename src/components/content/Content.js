import React, { useState } from 'react'
import Backlog from './Backlog'

export default function Content(props) {
  return (
    <div className="Content">
      <p>Logged in as {props.currentUser.username}</p>
      <button name="log-out-button" onClick={() => {props.logoutFunction()}}>Log out</button>
      <Backlog user={props.currentUser} />
    </div>
  )
}