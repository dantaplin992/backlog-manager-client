import React, { useState } from 'react'

export default function Content(props) {
  return (
    <div className="Content">
      Content
      <p>Logged in as {props.currentUser._id}</p>
      <button name="log-out-button" onClick={() => {props.logoutFunction()}}>Log out</button>
    </div>
  )
}