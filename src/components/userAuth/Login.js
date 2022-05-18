import React, { useEffect, useState } from 'react'
import '../../styles/UserAuth.css'

export default function Login(props) {
  const [usernameInput, setUsernameInput] = useState('')
  const [passwordInput, setPasswordInput] = useState('')

  function handleSubmit() {
    const reqBody = { username: usernameInput, password: passwordInput}
    const url = 'http://localhost:5000/sessions/new'
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
        props.loginFunction(data.user)
      } else {
        alert("The credentials you entered are incorrect")
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
  
  return (
    <div className="Login">
      <div id="login-form">
        <div><input type="text" name="username-input" className="login-input" value={usernameInput} onChange={handleUsernameChange} placeholder="Username"/></div>
        <div><input type="password" name="password-input" className="login-input" value={passwordInput} onChange={handlePasswordChange} placeholder="Password"/></div>
        <div><button type="submit" name="login-submit" onClick={handleSubmit}>Log in</button></div>
        <button onClick={() => {props.signUpPage()}} id="link-to-signup">Not a member? Sign Up</button>
      </div>
    </div>
  )
}
