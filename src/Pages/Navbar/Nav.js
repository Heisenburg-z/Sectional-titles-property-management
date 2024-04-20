import React from 'react'
import './Nav.css'
import { NavLink } from 'react-router-dom'
function Nav() {
  return (<>
    <header>
        <nav className='navbar'>
          <NavLink to="" className='logo'>Logo</NavLink>
            <ul>
                <li><NavLink to="about" >About Us</NavLink></li>
                <li><NavLink to='login'>Login</NavLink></li>

            </ul>
        </nav>
    </header>
  </>)
   
  
}

export default Nav
