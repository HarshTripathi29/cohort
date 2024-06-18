import React from 'react'
import {Link} from "react-router-dom";
import "./Style.css"

const Signup = () => {
  return (
    <div>
    <h2>Sign Up</h2>
    <p>Enter your deatils below</p>
      <div className='signup-form'>
        <input type='name' placeholder='name'/>
        <input type='email' placeholder='email'/>
        <input type='number' placeholder='phone number'/>
        <Link to="/todo"><button> Signup </button></Link>
      </div>
    </div>
  )
}

export default Signup
