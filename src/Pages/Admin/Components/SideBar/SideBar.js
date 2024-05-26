import "./SideBar.css";
import React from "react";
import { NavLink } from "react-router-dom";
import { FaBars, FaUsers, FaUsersGear, FaToolbox } from "react-icons/fa6";
import { GiTakeMyMoney } from "react-icons/gi";
import { GiExitDoor } from "react-icons/gi";
import { useAuth } from "../../../../utils/auth.js";
import Brand from "../../../../images/SCPY_Logo.png";

function SideBar() {
  const auth = useAuth();
  const logout = () => {
    auth.logout();
  };
  return (
    <section className="sidebar">
      <NavLink to="dashboard" className="flex items-center justify-center">
        <img src={Brand} alt="" style={{ width: "120px", height: "120px" }} />
      </NavLink>
      <ul className="sidebar-links-container">
        <li className="sidebar-link-li">
          <NavLink className="sidebar-link" to="dashboard">
            <span className="icon-text hover:text-sky-100">
              <FaBars size="1.5em" />
              <p className="item-padding">Dashboard</p>
            </span>
          </NavLink>
        </li>
        <li className="sidebar-link-li">
          <NavLink className="sidebar-link" to="staff">
            <span className="icon-text hover:text-sky-100">
              <FaUsers size="1.5em" />
              <p className="item-padding">Staff</p>
            </span>
          </NavLink>
        </li>
        <li className="sidebar-link-li">
          <NavLink className="sidebar-link" to="residents">
            <span className="icon-text hover:text-sky-100">
              <FaUsers size="1.5em" />
              <p className="item-padding">Residents</p>
            </span>
          </NavLink>
        </li>
        <li className="sidebar-link-li">
          <NavLink className="sidebar-link" to="admins">
            <span className="icon-text hover:text-sky-100">
              <FaUsersGear size="1.5em" />
              <p className="item-padding">Admins</p>
            </span>
          </NavLink>
        </li>
        <li className="sidebar-link-li">
          <NavLink className="sidebar-link" to="maintenance">
            <span className="icon-text hover:text-sky-100">
              <FaToolbox size="1.5em" />
              <p className="item-padding">Maintenance</p>
            </span>
          </NavLink>
        </li>
        <li className="sidebar-link-li">
          <NavLink className="sidebar-link" to="fines">
            <span className="icon-text hover:text-sky-100">
              <GiTakeMyMoney size="1.5em" />
              <p className="item-padding">Fines</p>
            </span>
          </NavLink>
        </li>
      </ul>
      <footer className="sidebar-footer">
        <ul className="sidebar-footer-li-container">
          <li className="sidebar-link-li__image">
            <NavLink className="sidebar-link" to="profile">
              <span className="icon-text">
                <p className="ml-10 item-padding font-bold hover:text-sky-100">
                  {auth.user}
                </p>
              </span>
            </NavLink>
          </li>
          <li className="sidebar-link-li">
            <NavLink className="sidebar-link" to="/">
              <span className="icon-text hover:text-sky-100">
                <GiExitDoor size="1.5em" />
                <p className="item-padding " onClick={logout}>
                  Sign Out
                </p>
              </span>
            </NavLink>
          </li>
        </ul>
      </footer>
    </section>
  );
}

export default SideBar;
