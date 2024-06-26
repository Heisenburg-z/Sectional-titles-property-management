import React from "react";
import "./StaffTopNav.css";
import { IoNotifications } from "react-icons/io5";
import { useLocation } from "react-router-dom";

function StaffTopNav({ className }) {
  const location = useLocation();
  const displayName = location.pathname.split("/");
  return (
    <header className={className} data-testid="staff-top-nav">
      <h1 className="header-title text-slate-600">
        {displayName[1].toUpperCase()} DASHBOARD
      </h1>
      <IoNotifications size={30} className="header-icon" />
    </header>
  );
}

export default StaffTopNav;

