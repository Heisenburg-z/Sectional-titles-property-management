import React from "react";
import Nav from "../Navbar/Nav";
import "./LandingPage.css";
import { Outlet } from "react-router-dom";

function LandingPage() {
	return (
		<>
			<Nav />
			<section className="container">
				<Outlet />
			</section>
		</>
	);
}

export default LandingPage;
