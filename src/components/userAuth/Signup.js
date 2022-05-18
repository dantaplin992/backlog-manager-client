import React, { useEffect, useState } from 'react'
import '../../styles/UserAuth.css'

export default function Signup(props) {
  const [newUsername, setNewUsername] = useState('')
  const [newEmail, setNewEmail] = useState('')
  const [newPassword, setNewPassword] = useState('')

  function handleUsernameChange(event) {
    event.preventDefault()
    setNewUsername(event.target.value)
  }

  function handleEmailChange(event) {
    event.preventDefault()
    setNewEmail(event.target.value)
  }

  function handlePasswordChange(event) {
    event.preventDefault()
    setNewPassword(event.target.value)
  }

  function handleSubmit(event) {
    event.preventDefault()
    const newUser = { username: newUsername, password: newPassword, email: newEmail }
    console.log(newUser)
    const url = "http://localhost:5000/users/new"
    fetch(url, {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newUser),
    }).then(res => res.json()
    ).then((data) => {
      console.log(data)
      props.loginPage()
    })
  }

  return (
    <div className="Signup">
      <div id="sign-up-form">
        <form>
          <div><input type="text" className="login-input" name="username" id="username-input" value={newUsername} onChange={handleUsernameChange} placeholder="Username"/></div>
          <div><input type="text" className="login-input" name="email" id="email-input" value={newEmail} onChange={handleEmailChange} placeholder="Email"/></div>
          <div><input type="text" className="login-input" name="password" id="password-input" value={newPassword} onChange={handlePasswordChange} placeholder="password"/></div>
          <div><button className="login-button" type="submit" onClick={(event) => {handleSubmit(event)}}>Sign Up</button></div>
        </form>
      <button className="auth-link" onClick={() => {props.loginPage()}}>Already a member? Log in</button>
      </div>
    </div>
  )
}
