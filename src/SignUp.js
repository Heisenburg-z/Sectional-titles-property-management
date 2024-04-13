/* eslint-disable jsx-a11y/anchor-has-content */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import './index.css';

function SignUp() {
  return (
    <div class="wrapper">
        <nav class="nav">
            <div class="nav-logo">
                <p>Logo</p>
            </div>
            <div class="nav-menu">
                <ul>
                    <li> <a href="#" class="link active">Home</a></li>
                    <li> <a href="#" class="link">Services</a></li>
                    <li> <a href="#" class="link">About</a></li>
                </ul>
            </div>
            <div class="nav-menu-btn">
                <i class='bx bx-menu'></i>
            </div>
        </nav>

        <div class="form-box">
            <div class="login-container" id="login">
                <div class="top">
                    <header>Sign Up</header>
                </div>
                <div class="input-box">
                    <input type="text" class="input-field" placeholder="First Name" />
                    <i class="bx bx-user"></i>
                </div>
                <div class="input-box">
                    <input type="text" class="input-field" placeholder="Surname" />
                    <i class="bx bx-user"></i>
                </div>
                <div class="input-box">
                    <input type="text" class="input-field" placeholder="Username" />
                    <i class="bx bx-user"></i>
                </div>
                <div class="input-box">
                    <input type="text" class="input-field" placeholder="Email address" />
                    <i class="bx bx-user"></i>
                </div>
                <div class="input-box">
                    <input type="password" class="input-field" placeholder="Create a password" />
                    <i class="bx bx-lock-alt"></i>
                </div>
                <div class="input-box">
                    <input type="password" class="input-field" placeholder="Confirm a password" />
                    <i class="bx bx-lock-alt"></i>
                </div>
                <div class="input-box">
                    <form action="/admin">
                        <input type="submit" class="submit" value="Sign Up" />
                    </form>
                </div>
            </div>

        </div>
    </div>
  )
}

export default SignUp;
