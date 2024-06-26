import { useLocation } from "react-router-dom";
import "./TopNav.css";
import { IoNotifications } from "react-icons/io5";

function TopNav() {
  const location = useLocation();
  const displayName = location.pathname.split("/");

  return (
    <header className="header">
      <h2 className="header-title text-slate-600">
        {displayName[1].toUpperCase()} {displayName[2].toUpperCase()}
      </h2>
      <IoNotifications size={30} className="header-icon" />
    </header>
  );
}

export default TopNav;
