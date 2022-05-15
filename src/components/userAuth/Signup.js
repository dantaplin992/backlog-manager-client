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
  }

  return (
    <div className="Signup">
      Sign Up Page
      <button onClick={() => {props.loginPage()}}>Already a member? Log in</button>
      <form>
        Username: <input type="text" name="username" value={newUsername} onChange={handleUsernameChange} />
        Email: <input type="text" name="email" value={newEmail} onChange={handleEmailChange} />
        Password: <input type="text" name="password" value={newPassword} onChange={handlePasswordChange} />
        <button type="submit" onClick={(event) => {handleSubmit(event)}}>Sign Up</button>
      </form>
    </div>
  )
}
