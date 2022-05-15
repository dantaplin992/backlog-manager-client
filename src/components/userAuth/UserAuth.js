import React, { useEffect, useState } from 'react'
import Login from './Login'
import Signup from './Signup'

export default function UserAuth() {
  const [page, setPage] = useState("login")

  function displayPage() {
    if (page === "signup") return <Signup loginPage={changePage}/>
    return <Login signUpPage={changePage}/>
  }

  function changePage() {
    setPage(page === "login" ? "signup" : "login")
  }

  return (
    <div className="UserAuth">
      UserAuth
      {displayPage()}
    </div>
  )
}
