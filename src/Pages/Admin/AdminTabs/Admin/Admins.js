import React from "react";
import { useState, useEffect } from "react";
import "./Admins.css";
import { Outlet, useLocation, useNavigate } from "react-router-dom";

function Admins() {
	const location = useLocation();
	const path = location.pathname.split("/")[3];
	const navigate = useNavigate();
	const [admins, setAdmins] = useState([]);

	useEffect(() => {
		fetch(`/api/property/admin/admins`)
			.then((response) => {
				return response.json();
			})
			.then((data) => {
				//console.log(data);
				setAdmins(data);
			})
			.catch(() => {
				console.error("No data to be fetched");
			});
	}, []);

	return path === "signupform" ? (
		<Outlet />
	) : (
		<section className="admin-section">
			<table className="admin-table">
				<thead>
					<tr>
						<th>Name</th>
						<th>Surname</th>
						<th>Username</th>
						<th>Email</th>
						<th>Address</th>
						<th>Cellno</th>
					</tr>
				</thead>

				<tbody>
					{admins.map((s, i) => (
						<tr key={i}>
							<td>{s.name}</td>
							<td>{s.surName}</td>
							<td>{s.userName}</td>
							<td>{s.email}</td>
							<td>{s.userAddress}</td>
							<td>{s.cellPhone}</td>
						</tr>
					))}
				</tbody>
			</table>
			<button id="bottom-right-button" onClick={() => navigate("signupform")}>
				+ Sign Up
			</button>
		</section>
	);
}

export default Admins;
