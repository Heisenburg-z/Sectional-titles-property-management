import React from "react";
import "./Nav.css";
import { NavLink } from "react-router-dom";
import { useAuth } from "../../../utils/auth";
function Nav() {
  const auth = useAuth();

  return (
    <>
      <header>
        <nav className="navbar">
          <NavLink to="" className="logo">
            Logo
          </NavLink>
          <ul>
            <li>
              <NavLink to="about">About Us</NavLink>
            </li>
            {!auth.user ? (
              <li>
                <NavLink to="login">Login</NavLink>
              </li>
            ) : (
              <li>{auth.user}</li>
            )}
          </ul>
        </nav>
      </header>
    </>
  );
}

export default Nav;
