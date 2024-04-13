/* eslint-disable jsx-a11y/anchor-has-content */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import './index.css';

function Admin() {
  return (
        <div className="wrapper">
        <nav className="nav">
            <div className="nav-logo">
                <p>Logo</p>
            </div>
            <div className="nav-menu">
                <ul>
                    <li> <a href="#" className="link active">Home</a></li>
                    <li> <a href="#" className="link">Services</a></li>
                    <li> <a href="#" className="link">About</a></li>
                </ul>
            </div>
            <div className="nav-menu-btn">
                <i className='bx bx-menu'></i>
            </div>
        </nav>

        
        <div className="form-box">
        
            <div className="login-container" id="login">
                <div className="top">
                    <header>Admin</header>
                </div>

                <div className="input-box">
                  <form action="/signup">
                    <input type="submit" className="submit" value="Add Member"/>
                  </form>    
                </div>
            </div>

        </div>
    </div>

  )
}

export default Admin
