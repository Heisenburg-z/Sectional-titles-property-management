import "../SideBar/ResidentsSideBar.css";
import { VscAccount } from "react-icons/vsc";
import { NavLink } from "react-router-dom";
import { FaBars } from "react-icons/fa6";
//import { GiTakeMyMoney } from "react-icons/gi";
import { TbReportSearch } from "react-icons/tb";
import { GiExitDoor } from "react-icons/gi";
import { useAuth } from "../../../../utils/auth.js";
import { FaRegEdit, FaRegAddressCard } from "react-icons/fa";
import Brand from "../../../../images/SCPY_Logo.png";

function ResidentsSideBar({ className }) {
  const auth = useAuth();
  const logout = () => {
    auth.logout();
  };
  return (
    <section className={className}>
      <NavLink to="" className="flex items-center justify-center">
        <img src={Brand} alt="" style={{ width: "120px", height: "120px" }} />
      </NavLink>

      <ul className="sidebar-links-container">
        <li className="sidebar-link-li ">
          <NavLink className="sidebar-link" to="dashboard">
            <span className="icon-text hover:text-sky-100">
              <FaBars size="1.5em" />
              <p className="item-padding">Dashboard</p>
            </span>
          </NavLink>
        </li>
        <li className="sidebar-link-li ">
          <NavLink className="sidebar-link" to="issues">
            <span className="icon-text hover:text-sky-100">
              <FaRegEdit size="1.5em" />
              <p className="item-padding">Issues</p>
            </span>
          </NavLink>
        </li>
        <li className="sidebar-link-li ">
          <NavLink className="sidebar-link" to="reports/maintenance">
            <span className="icon-text hover:text-sky-100">
              <TbReportSearch size="1.5em" />
              <p className="item-padding">Reports</p>
            </span>
          </NavLink>
        </li>
        <li className="sidebar-link-li">
          <NavLink className="sidebar-link" to="vistors">
            <span className="icon-text hover:text-sky-100">
              <FaRegAddressCard size="1.5em" />
              <p className="item-padding">Visitations</p>
            </span>
          </NavLink>
        </li>
      </ul>

      <footer className="sidebar-footer">
        <ul className="sidebar-footer-li-container">
          <li className="sidebar-link-li__image">
            <NavLink className="sidebar-link" to="profile">
              <span className="icon-text hover:text-sky-100">
                <VscAccount size="1.5em" />
                <p className="ml-2 item-padding">{auth.user}</p>
              </span>
            </NavLink>
          </li>
          <li className="sidebar-link-li ">
            <NavLink className="sidebar-link " to="/">
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

export default ResidentsSideBar;
