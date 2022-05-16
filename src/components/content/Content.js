import React, { useState } from 'react'

export default function Content(props) {
  return (
    <div className="Content">
      Content
      <p>{props.currentUser ? props.currentUser._id : ''}</p>
    </div>
  )
}