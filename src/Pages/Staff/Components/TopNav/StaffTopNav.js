import React from "react";
import "./StaffTopNav.css";
import { IoNotifications } from "react-icons/io5";

function StaffTopNav({ className }) {
  return (
    <header className={className} data-testid="staff-top-nav">
      <h1 className="header-title">STAFF / DASHBOARD</h1>
      <IoNotifications size={30} className="header-icon" />
    </header>
  );
}

export default StaffTopNav;