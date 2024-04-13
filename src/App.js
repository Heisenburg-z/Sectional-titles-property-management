/* eslint-disable jsx-a11y/anchor-has-content */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import './index.css';

function App() {
  

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
                    <header>Welcome</header>
                </div>

                <div className="google">
                    <i className="bx bxl-google"></i>
                </div>

                <div className="input-box">
                    <input type="text" className="input-field" placeholder="Username"/>
                    <i className="bx bx-user"></i>
                </div>
                <div className="input-box">
                    <input type="password" className="input-field" placeholder="Password"/>
                    <i className="bx bx-lock-alt"></i>
                </div>
                <div className="input-box">
                  <form action="/admin">
                  <input type="submit" className="submit" value="Login"/>
                  </form>
                    
                </div>
                <div className="forgot">
                    <label><a href="#"></a> Forgot password?</label>
                </div>
            </div>

        </div>
    </div>
  );
}

export default App;
