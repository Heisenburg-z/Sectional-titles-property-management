import "../SideBar/ResidentsSideBar.css";
import { NavLink } from "react-router-dom";
import { FaBars, FaToolbox } from "react-icons/fa6";
import { GiTakeMyMoney } from "react-icons/gi";
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
				<img src={Brand} alt="" style={{ width: '120px', height: '120px' }}/>
			</NavLink>

			<ul className="sidebar-links-container">
				<li className="sidebar-link-li">
					<NavLink className="sidebar-link" to="dashboard">
						<span className="icon-text">
							<FaBars size="1.5em" />
							<p className="item-padding">Dashboard</p>
						</span>
					</NavLink>
				</li>
				<li className="sidebar-link-li">
					<NavLink className="sidebar-link" to="issues">
						<span className="icon-text">
							<FaRegEdit size="1.5em" />
							<p className="item-padding">Issues</p>
						</span>
					</NavLink>
				</li>
				<li className="sidebar-link-li">
					<NavLink className="sidebar-link" to="maintenance">
						<span className="icon-text">
							<FaToolbox size="1.5em" />
							<p className="item-padding">Maintenance</p>
						</span>
					</NavLink>
				</li>
				<li className="sidebar-link-li">
					<NavLink className="sidebar-link" to="reports/maintenance">
						<span className="icon-text">
							<TbReportSearch size="1.5em" />
							<p className="item-padding">Reports</p>
						</span>
					</NavLink>
				</li>
				<li className="sidebar-link-li">
					<NavLink className="sidebar-link" to="vistors">
						<span className="icon-text">
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
							<span className="icon-text">
								<img
									className="sidebar-footer-profile"
									src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=3164&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
									alt="profile"
								/>
								<p className="item-padding">Bokang Molepo</p>
							</span>
						</NavLink>
					</li>
					<li className="sidebar-link-li">
						<NavLink className="sidebar-link" to="/">
							<span className="icon-text">
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
