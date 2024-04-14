import React from 'react'
import './LoginBtn.css'

function LoginBtn() {
    return (
    <button className='login-btn' onClick={()=>console.log("Display login page")}>
        Login
    </button> 
  )}
  export default LoginBtn