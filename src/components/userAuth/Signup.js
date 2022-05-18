import React, { useEffect, useState } from 'react'

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
          <div>Username: <input type="text" name="username" id="username-input" value={newUsername} onChange={handleUsernameChange} /></div>
          <div>Email: <input type="text" name="email" id="email-input" value={newEmail} onChange={handleEmailChange} /></div>
          <div>Password: <input type="text" name="password" id="password-input" value={newPassword} onChange={handlePasswordChange} /></div>
          <div><button type="submit" onClick={(event) => {handleSubmit(event)}}>Sign Up</button></div>
        </form>
      </div>
      <button onClick={() => {props.loginPage()}}>Already a member? Log in</button>
    </div>
  )
}
