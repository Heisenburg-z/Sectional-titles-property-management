import "./ResidentsTopNav.css";
import { IoNotifications } from "react-icons/io5";

function ResidentsTopNav({ className }) {
  return (
    <header className={className}>
      <h1 className="header-title">RESIDENTS / DASHBOARD</h1>
      <IoNotifications size={30} className="header-icon" />
    </header>
  );
}

export default ResidentsTopNav;