import React, { useState } from 'react'
import Backlog from './Backlog'

export default function Content(props) {
  return (
    <div className="Content">
        <Backlog user={props.currentUser} />
    </div>
  )
}