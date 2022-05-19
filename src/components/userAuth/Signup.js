import React, { useEffect, useState } from 'react'
import '../../styles/UserAuth.css'
import { useStateWithCallback, useStateWithCallbackInstant } from 'use-state-with-callback'
const Swal = require('sweetalert2')

export default function Signup(props) {
  const [newUsername, setNewUsername] = useStateWithCallbackInstant('', currentName => {
    checkNameIsUnique(currentName)
  })
  const [newEmail, setNewEmail] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [showHide, setShowHide] = useState('show')
  const [passwordInputType, setPasswordInputType] = useState('password')
  const [usernameIsUnique, setUsernameIsUnique] = useState(false)

  function handleUsernameChange(event) {
    event.preventDefault()
    setNewUsername(event.target.value)
  }

  function checkNameIsUnique(name) {
    if (name) {
      const url = `http://localhost:5000/users/find?username=${name}`
      fetch(url, {
        method: "GET",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
        },
      }).then(response => response.json()
      ).then((data) => {
        if (data.length > 0) {
          setUsernameIsUnique(false)
        } else {
          setUsernameIsUnique(true)
        }
        console.log(data)
      })
    }
  }

  function handleEmailChange(event) {
    event.preventDefault()
    setNewEmail(event.target.value)
  }

  function handlePasswordChange(event) {
    event.preventDefault()
    setNewPassword(event.target.value)
  }

  function validateCredentials() {
    if (!newUsername || !newEmail || !newPassword) return { valid: false, message: 'You cannot sign up with empty credentials!' }
    if (!usernameIsUnique) return { valid: false, message: 'Someone with that username already exists' }
    if (newUsername.match(/\s/)) return { valid: false, message: 'Usernames cannot contain spaces'}
    if (!newEmail.match(/\@/) || !newEmail.match(/\.[a-z]/)) return { valid: false, message: 'Please enter a valid email address'}
    if (newPassword.length < 6 || !newPassword.match(/[$&+,:;=?@#|'<>.^*()%!-]/gi) || !newPassword.match(/[a-z]/gi) || !newPassword.match(/[0-9]/)) return { 
      valid: false, message: 'Passwords must be > 6 characters and contain at least 1 letter, 1 digit and 1 special character' 
    }
    return { valid: true, message: 'thanks for signing up!' }
  }

  function handleSubmit(event) {
    event.preventDefault()
    let credentialsAreValid = validateCredentials()
    if (!credentialsAreValid.valid) {
      Swal.fire(credentialsAreValid.message)
    } else {
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
        //console.log(data)
        props.loginPage()
      })
    }
  }

  function showHidePassword(e) {
    e.preventDefault()
    if (showHide === 'show') {
      setShowHide('hide')
      setPasswordInputType('text')
    } else {
      setShowHide('show')
      setPasswordInputType('password')
    }
  }

  function userNameMessage() {
    if (newUsername) {
      if (usernameIsUnique) return "Username is available"
      return "Username is taken"
    } else {
      return ''
    }
  }

  return (
    <div className="Signup">
      <div id="sign-up-form">
        <form>
          <div className={usernameIsUnique ? "username-message-unique" : "username-message-taken"}>{userNameMessage()}</div>
          <div><input type="text" className="login-input" name="username" id="username-input" value={newUsername} onChange={handleUsernameChange} placeholder="username"/></div>
          <div><input type="text" className="login-input" name="email" id="email-input" value={newEmail} onChange={handleEmailChange} placeholder="email"/></div>
          <div id='show-hide-password'><button onClick={showHidePassword}>{showHide}</button></div>
          <div><input type={passwordInputType} className="login-input" name="password" id="password-input" value={newPassword} onChange={handlePasswordChange} placeholder="password" autoComplete='off'/></div>
          <div><button className="login-button" type="submit" onClick={(event) => {handleSubmit(event)}}>Sign Up</button></div>
        </form>
      <button className="auth-link" onClick={() => {props.loginPage()}}>Already a member? Log in</button>
      </div>
    </div>
  )
}
