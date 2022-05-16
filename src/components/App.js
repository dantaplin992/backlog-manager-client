import React, { useEffect, useState, useRef } from 'react'
import '../styles/App.css'
import UserAuth from './userAuth/UserAuth'
import Content from './content/Content'

export default function App() {
  const [loggedIn, setLoggedIn] = useState(false)
  const [currentUser, setCurrentUser] = useState(null)
  const firstRender = useRef(true)
  useEffect(() => {
    firstRender.current = false
  }, [])

  let displayComponent = loggedIn ? <Content currentUser={currentUser} /> : <UserAuth loginFunction={loginUser} />

  function loginUser(user) {
    setCurrentUser(user)
  }

  function switchLoginStatus() {
    setLoggedIn(loggedIn ? false : true)
  }

  useEffect(() => {
    switchLoginStatus()
  }, [currentUser])

  return (
    <div className="App">
      Backlog Manager
      <div className="login-button">
        <button onClick={switchLoginStatus}>{loggedIn ? "Log Out" : "Log In"}</button>
      </div>
      {displayComponent}
    </div>
  )
}
