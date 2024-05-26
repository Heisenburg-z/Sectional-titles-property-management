import React from "react";
import "./Nav.css";
import { NavLink } from "react-router-dom";
import { useAuth } from "../../../utils/auth";
import Brand from "../../../images/SCPY_Logo1.png";

function Nav() {
	const auth = useAuth();

	return (
		<>
			<header> 
				<nav className="navbar">

					<NavLink
						to=""
						className="pl-[80px] ml-10 rounded-lg"
					>
						<img src={Brand} alt="" style={{ width: "80px", height: "80px" }} />
					</NavLink>

					<section class="shadow-lg rounded-l-full">
						<ul className="nav-links-container pr-[50px]">
							<li className="nav-link text-sky-400 hover:text-sky-600 hover:underline font-bold">
								<NavLink className="anchor-link" to="about">
									About Us
								</NavLink>
							</li>
							{!auth.user ? (
								<li className="nav-link text-sky-400 hover:text-sky-600 hover:underline font-bold">
									<NavLink className="anchor-link" to="login">
										Login
									</NavLink>
								</li>
							) : (
								<li className="nav-link text-sky-400 hover:text-sky-600 hover:underline font-bold">
									<NavLink
										className="anchor-link"
										to={`${auth.userRole}/dashboard`}
									>
										{auth.user}
									</NavLink>
								</li>
							)}
						</ul>
					</section>
					
				</nav>
			</header>
		</>
	);
}

export default Nav;
