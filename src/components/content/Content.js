import React, { useState } from 'react'
import Backlog from './Backlog'

export default function Content(props) {
  return (
    <div className="Content">
      <span>Logged in as {props.currentUser.username}</span>
      <button name="log-out-button" onClick={() => {props.logoutFunction()}}>Log out</button>
      <div className="columns">
        <Backlog user={props.currentUser} />
      </div>
    </div>
  )
}