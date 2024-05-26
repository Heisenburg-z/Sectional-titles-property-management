import "./ResidentsTopNav.css";
import React from "react";
import { useLocation } from "react-router-dom";
import { IoNotifications } from "react-icons/io5";

function ResidentsTopNav({ className }) {
  const location = useLocation();
  const displayName = location.pathname.split("/");

  return (
    <header className={className}>
      <h1 className="header-title text-slate-600">
        {displayName[1].toUpperCase()} {displayName[2].toUpperCase()}
      </h1>
      <IoNotifications size={30} className="header-icon" />
    </header>
  );
}

export default ResidentsTopNav;

