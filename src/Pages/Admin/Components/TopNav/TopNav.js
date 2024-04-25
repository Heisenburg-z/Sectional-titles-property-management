import "./TopNav.css";
import { IoNotifications } from "react-icons/io5";

function TopNav({ className }) {
  return (
    <header className={className}>
      <h1 className="header-title">ADMIN / DASHBOARD</h1>
      <IoNotifications size={30} className="header-icon" />
    </header>
  );
}

export default TopNav;
