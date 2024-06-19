import React, {useState} from 'react'
import {useNavigate} from "react-router-dom";
import "./Style.css";
import axios from "axios";

const Signup = () => {

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const[toggleSignup, setToggleSignup] = useState(true);
  const navigate = useNavigate();

  const toggleForm =()=>{
    setToggleSignup(!toggleSignup);
  }

  return (
    <div>
    <h2>Sign Up</h2>
    <p>Enter your deatils below</p>
      <div className='signup-form'>
        <input type='email' 
          placeholder='username'
          onChange={e => {
          setUsername(e.target.value);
        }}/>
        {toggleSignup &&(<input type='name' 
          placeholder='first name' 
          onChange={e => {
          setFirstName(e.target.value)}} />
        )}
        {toggleSignup &&(<input type='name ' 
          placeholder='last name' 
          onChange={(e) => {
          setLastName(e.target.value);
        }}/>
        )}
        <input type='password' 
          placeholder='password' 
          onChange={(e) => {
          setPassword(e.target.value)
        }}/>
       { toggleSignup &&( <button  onClick={async () => {
            const response = await axios.post("http://localhost:3000/api/v1/user/signup", {
              username,
              firstName,
              lastName,
              password
            });
            localStorage.setItem("token", response.data.token)
            navigate("/todo");
         
          }} > Signup </button>
         ) }

         { !toggleSignup &&( <button  onClick={async () => {
            const response = await axios.post("http://localhost:3000/api/v1/user/signin", {
              username,
              password
            });
            localStorage.setItem("token", response.data.token)
            navigate("/todo");
     
          }} > Signin </button>
         ) }
           <div>{toggleSignup ?"User already registered?" : "New here"} <div className='toggle-btn' onClick={toggleForm}>{toggleSignup ? "Sign In" : "Sign Up"}</div></div>  
      </div>
    </div>
  )
}

export default Signup
