import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { Oval } from 'react-loader-spinner';

function FinesDashBoard() {
	const navigate = useNavigate();
	const [fines, setFines] = useState([]);
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		setLoading(true);
		fetch(`/api/property/admin/fines/all`)
			.then((response) => response.json())
			.then((data) => {
				setFines(data);
				setLoading(false);
			})
			.catch((e) => {
				console.error("No data to be fetched", e);
				setLoading(false);
			});
	}, []);

	const handleUpdateSuccess = () => {
		toast.success("Fine updated successfully");
	};

	return (
		<>
			<ToastContainer />
			<section className="container">
				{loading ? (
					<div className="flex justify-center items-center min-h-screen">
						<Oval
							height={80}
							width={80}
							color="#4fa94d"
							wrapperStyle={{}}
							wrapperClass=""
							visible={true}
							ariaLabel="oval-loading"
							secondaryColor="#4fa94d"
							strokeWidth={2}
							strokeWidthSecondary={2}
						/>
					</div>
				) : fines.length === 0 ? (
					<h1>No Fines</h1>
				) : (
					<table className="border-collapse border border-gray-300 rounded-t-lg overflow-hidden shadow-lg mt-6 mb-0 text-sm min-w-[400px]">
						<thead className="bg-sky-500 text-white text-left font-bold">
							<tr className="bg-sky-500 text-white text-left font-bold">
								<th className="py-3 px-4">UserID</th>
								<th className="py-3 px-4">Status</th>
								<th className="py-3 px-4">Fine Type</th>
								<th className="py-3 px-4">Date Issued</th>
								<th className="py-3 px-4">Amount</th>
								<th className="py-3 px-4">Action</th>
							</tr>
						</thead>
						<tbody className="border-b-4 border-sky-500">
							{fines.map((fine, i) => (
								<tr className="border-b even:bg-cyan-100" key={i}>
									<td className="py-3 px-4">{fine.id}</td>
									<td className="py-3 px-4">{fine.Status}</td>
									<td className="py-3 px-4">{fine.Type}</td>
									<td className="py-3 px-4">{fine.DateIssued}</td>
									<td className="py-3 px-4">{fine.Amount}</td>
									<td className="py-3 px-4">
										<span className="action-btn">
											<button
												onClick={() => {
													navigate(`${fine.id}/update`, { state: { handleUpdateSuccess } });
												}}
												className="py-2 px-3 bg-sky-500 text-white font-semibold rounded-md cursor-pointer text-xs"
											>
												Update Fine
											</button>
										</span>
									</td>
								</tr>
							))}
						</tbody>
					</table>
				)}
			</section>
			<button
				onClick={() => {
					navigate("new_fine");
				}}
				className="fixed bottom-20 right-20 px-4 py-3 bg-sky-500 hover:bg-blue-500 text-white rounded-md shadow-md cursor-pointer"
			>
				New Fine
			</button>
		</>
	);
}

export default FinesDashBoard;

