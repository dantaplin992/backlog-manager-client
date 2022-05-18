import React, { useEffect, useState, useRef } from 'react'
import '../styles/App.css'
import UserAuth from './userAuth/UserAuth'
import Banner from './Banner'
import Backlog from './content/Backlog'
import Content from './content/Content'

export default function App() {
  const [currentUser, setCurrentUser] = useState(null)
  const firstRender = useRef(true)
  document.body.style.overflow = "hidden"
  useEffect(() => {
    firstRender.current = false
  }, [])

  let displayComponent = currentUser ? <Content currentUser={currentUser} /> : <UserAuth loginFunction={loginUser} />

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
      <Banner user={currentUser}/>
      <div className="login-button">
      </div>
      {displayComponent}
    </div>
  )
}
