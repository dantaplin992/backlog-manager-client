import React, { useEffect, useState, useRef } from 'react'
import '../styles/App.css'
import UserAuth from './userAuth/UserAuth'
import Banner from './Banner'
import Backlog from './content/Backlog'
import Content from './content/Content'
import equal from 'fast-deep-equal'

export default function App() {
  const [currentUser, setCurrentUser] = useState(null)
  const firstRender = useRef(true)
  document.body.style.overflow = "hidden"
  useEffect(() => {
    firstRender.current = false
  }, [])

  let displayComponent = currentUser ? <Content currentUser={currentUser} /> : <UserAuth loginFunction={loginUser} />

  function loginUser(user) {
    console.log(user)
    setCurrentUser(user)
    localStorage.setItem('user', JSON.stringify(user))
  }

  function nullUser() {
    localStorage.removeItem('user')
    setCurrentUser(null)
  }

  useEffect(() => {
    if (localStorage.getItem('user') && !equal(currentUser, JSON.parse(localStorage.getItem('user')))) {
      loginUser(JSON.parse(localStorage.getItem('user')))
    }
  }, [currentUser])

  return (
    <div className="App">
      <Banner user={currentUser} nullUser={nullUser}/>
      {displayComponent}
    </div>
  )
}
