import React, { useEffect, useState } from 'react'

export default function Signup(props) {

  return (
    <div className="Signup">
      Sign Up Page
      <button onClick={() => {props.loginPage()}}>Already a member? Log in</button>
    </div>
  )
}
