import React, { useEffect, useState, useRef } from "react";
import { useAuth } from "../../../../utils/auth";
import "./ResidentsFines.css";
import { useReactToPrint } from "react-to-print";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Outlet, useLocation, useNavigate } from "react-router-dom";

function ResidentsFines() {
	const navigate = useNavigate();
	const componentPDF = useRef();
	const id = useAuth().profileId;
	const location = useLocation();
	const inputLocation = location.pathname.split("/").slice(-1)[0];
	const [profile, setProfile] = useState([]);

	useEffect(() => {
		fetch(`/api/property/resident/fines/${id}`)
			.then((response) => response.json())
			.then((data) => {
				console.log(data);
				setProfile(data);
			});
	}, [id]);

	const generatePDF = useReactToPrint({
		content: () => componentPDF.current,
		documentTitle: "Your collection of fines",
		onAfterPrint: () => toast.success("Document saved successfully"),
	});

	switch (inputLocation) {
		default:
			return (
				<section className="main">
					<ToastContainer />
					<section ref={componentPDF} style={{ width: "100%" }}>
						<table className="resident-table">
							<thead>
								<tr>
									<th>Name</th>
									<th>RoomNo</th>
									<th>Reason for fine</th>
									<th>Amount Due</th>
									<th>Date Issued</th>
									<th>Status</th>
								</tr>
							</thead>
							<tbody>
								{profile.map((s, i) => (
									<tr
										key={i}
										onClick={() => navigate("payment-upload")}
										className="hover:bg-sky-400"
									>
										<th>{s.Name}</th>
										<th>{s.RoomNo}</th>
										<th>{s.Type}</th>
										<th>{s.Amount}</th>
										<th>{s.DateIssued}</th>
										<th>{s.Status}</th>
									</tr>
								))}
							</tbody>
						</table>
					</section>
					<section>
						<button
							onClick={generatePDF}
							className="w-full px-3 py-2 bg-sky-500 text-white font-bold rounded-md cursor-pointer text-base transition duration-300 hover:bg-blue-600"
						>
							Export as PDF
						</button>
					</section>
				</section>
			);
		case "payment-upload":
			return <Outlet />;
	}
}

export default ResidentsFines;
