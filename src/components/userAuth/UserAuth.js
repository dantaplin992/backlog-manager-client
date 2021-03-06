import React, { useEffect, useState } from 'react'
import Login from './Login'
import Signup from './Signup'
import '../../styles/UserAuth.css'

export default function UserAuth(props) {
  const [page, setPage] = useState("login")

  function displayPage() {
    if (page === "signup") return <Signup loginPage={changePage}/>
    return <Login signUpPage={changePage} loginFunction={props.loginFunction} />
  }

  function changePage() {
    setPage(page === "login" ? "signup" : "login")
  }

  return (
    <div className="UserAuth">
      {displayPage()}
    </div>
  )
}
