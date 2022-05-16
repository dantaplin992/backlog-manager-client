import React, { useEffect, useState, useRef } from 'react'
import '../styles/App.css'
import UserAuth from './userAuth/UserAuth'
import Content from './content/Content'

export default function App() {
  const [currentUser, setCurrentUser] = useState(null)
  const firstRender = useRef(true)
  useEffect(() => {
    firstRender.current = false
  }, [])

  let displayComponent = currentUser ? <Content currentUser={currentUser} logoutFunction={nullUser} /> : <UserAuth loginFunction={loginUser} />

  function loginUser(user) {
    setCurrentUser(user)
  }

  function nullUser() {
    setCurrentUser(null)
  }

  useEffect(() => {
    console.log(currentUser)
  }, [currentUser])

  return (
    <div className="App">
      Backlog Manager
      <div className="login-button">
      </div>
      {displayComponent}
    </div>
  )
}
