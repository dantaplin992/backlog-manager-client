import React, { useEffect, useState } from 'react'

export default function Login(props) {
  
  return (
    <div className="Login">
      Log In Page
      <button onClick={() => {props.signUpPage()}} id="link-to-signup">Not a member? Sign Up</button>
    </div>
  )
}
