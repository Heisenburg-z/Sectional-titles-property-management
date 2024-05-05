import React from "react";
import { useState, useEffect } from "react";
import "./Admins.css";

function Admins() {
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
	return (
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
						<th>Action</th>
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
		</section>
	);
}

export default Admins;
