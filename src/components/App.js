import React, { useEffect, useState } from 'react'
import '../styles/App.css'
import UserAuth from './userAuth/UserAuth'
import Content from './content/Content'

export default function App() {
  const [loggedIn, setLoggedIn] = useState(false)

  let displayComponent = loggedIn ? <Content /> : <UserAuth />

  function switchLoginStatus() {
    setLoggedIn(loggedIn ? false : true)
  }

  return (
    <div className="App">
      App
      <div className="login-button">
        <button onClick={switchLoginStatus}>{loggedIn ? "Log Out" : "Log In"}</button>
      </div>
      {displayComponent}
    </div>
  )
}
