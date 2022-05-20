import React, { useEffect, useState } from 'react'
import '../../styles/UserAuth.css'
const Swal = require('sweetalert2')

export default function Login(props) {
  const [usernameInput, setUsernameInput] = useState('')
  const [passwordInput, setPasswordInput] = useState('')
  const [showHide, setShowHide] = useState('show')
  const [passwordInputType, setPasswordInputType] = useState('password')

  function handleSubmit() {
    const reqBody = { username: usernameInput, password: passwordInput}
    const url = 'https://backlog-manager-api.herokuapp.com/sessions/new'
    fetch(url, {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(reqBody),
    }).then(result => result.json()
    ).then((data) => {
      console.log(data.message)
      if (data.message === "Verified") {
        console.log(data.user)
        props.loginFunction(data.user)
      } else {
        Swal.fire("The credentials you entered are incorrect! :(")
        setPasswordInput('')
      }
    })
  }

  function handleUsernameChange(event) {
    event.preventDefault()
    setUsernameInput(event.target.value)
  }

  function handlePasswordChange(event) {
    event.preventDefault()
    setPasswordInput(event.target.value)
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
  
  return (
    <div className="Login">
      <h1>Log in and get started!</h1>
      <div id="login-form">
        <div><input type="text" name="username-input" className="login-input" value={usernameInput} onChange={handleUsernameChange} placeholder="Username"/></div>
        <div id='show-hide-password'><button onClick={showHidePassword}>{showHide}</button></div>
        <div><input type={passwordInputType} name="password-input" className="login-input" value={passwordInput} onChange={handlePasswordChange} placeholder="Password"/></div>
        <div><button className="login-button" type="submit" name="login-submit" onClick={handleSubmit}>Log in</button></div>
        <button className="auth-link" onClick={() => {props.signUpPage()}} id="link-to-signup">Not a member? Sign Up</button>
      </div>
    </div>
  )
}
