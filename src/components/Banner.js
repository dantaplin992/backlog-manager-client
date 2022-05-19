import React from "react"

export default function Banner(props) {
  return (
    <div className="Banner">
      <div id="banner-logout">
        {props.user ? <span>Logged in as {props.user.username} <button id="logout-button">Log out</button></span> : ' '}
      </div>
      <div id="banner-title">
        <span>GameLog</span>
      </div>
      <div id="banner-right">
        <span> </span>
      </div>
    </div>
  )
}