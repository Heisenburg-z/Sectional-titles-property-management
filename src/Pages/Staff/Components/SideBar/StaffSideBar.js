import React from "react";
import { VscAccount } from "react-icons/vsc";
import "./StaffSideBar.css";
import { NavLink } from "react-router-dom";
import { FaBars } from "react-icons/fa6";
import { TbReportSearch } from "react-icons/tb";
import { GiExitDoor } from "react-icons/gi";
import { useAuth } from "../../../../utils/auth.js";
import { FaTools } from "react-icons/fa";
import Brand from "../../../../images/SCPY_Logo.png";

function StaffSideBar({ className }) {
  const auth = useAuth();
  const logout = () => {
    auth.logout();
  };
  return (
    <section className={className} data-testid="staff-sidebar">
      <NavLink to="dashboard" className="flex items-center justify-center">
        <img src={Brand} alt="" style={{ width: "120px", height: "120px" }} />
      </NavLink>

      <ul className="sidebar-links-container">
        <li className="sidebar-link-li">
          <NavLink className="sidebar-link" to="staffdashboard">
            <span className="icon-text hover:text-sky-100">
              <FaBars size="1.5em" />
              <p className="item-padding">Dashboard</p>
            </span>
          </NavLink>
        </li>
        <li className="sidebar-link-li">
          <NavLink className="sidebar-link" to="allmaintenanceissues">
            <span className="icon-text hover:text-sky-100">
              <FaTools size="1.5em" />
              <p className="item-padding">All Maintenance Issues</p>
            </span>
          </NavLink>
        </li>
        <li className="sidebar-link-li">
          <NavLink className="sidebar-link" to="staffreports">
            <span className="icon-text hover:text-sky-100">
              <TbReportSearch size="1.5em" />
              <p className="item-padding">Reports</p>
            </span>
          </NavLink>
        </li>
      </ul>
      <footer className="sidebar-footer">
        <ul className="sidebar-footer-li-container">
          <li className="sidebar-link-li__image">
            <NavLink className="sidebar-link" to="staffprofile">
              <span className="icon-text hover:text-sky-100">
                <VscAccount size="1.5em" />
                <p className="ml-2 item-padding font-bold">{auth.user}</p>
              </span>
            </NavLink>
          </li>
          <li className="sidebar-link-li">
            <NavLink className="sidebar-link" to="/">
              <span className="icon-text hover:underline hover:text-sky-100">
                <GiExitDoor size="1.5em" />
                <p className="item-padding" onClick={logout}>
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

export default StaffSideBar;
