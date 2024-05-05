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
          <ul className="nav-links-container">
            <li className="nav-link">
              <NavLink className="anchor-link" to="about">
                About Us
              </NavLink>
            </li>
            {!auth.user ? (
              <li className="nav-link">
                <NavLink className="anchor-link" to="login">
                  Login
                </NavLink>
              </li>
            ) : (
              <li className="nav-link">
                <NavLink className="anchor-link" to={`${auth.userRole}/dashboard`}>
                  {auth.user}
                </NavLink>
              </li>
            )}
          </ul>
        </nav>
      </header>
    </>
  );
}

export default Nav;
