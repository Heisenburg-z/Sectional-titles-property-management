import React from "react";
import { useNavigate } from "react-router-dom";

function FinesDashBoard() {
	const navigate = useNavigate();
	return (
		<section className="container " class="pt-2 flex items-center justify-center">
			<table className="border-collapse border border-gray-300 rounded-t-lg overflow-hidden shadow-lg mt-6 mb-0 text-sm min-w-[400px]">
				<thead className="bg-sky-500 text-white text-left font-bold">
					<tr
						onClick={navigate("update")}
						className="bg-sky-500 text-white text-left font-bold"
					>
						<th className="py-3 px-4">Name</th>
						<th className="py-3 px-4">Surname</th>
						<th className="py-3 px-4">Username</th>
						<th className="py-3 px-4">Email</th>
						<th className="py-3 px-4">Address</th>
						<th className="py-3 px-4">Cellno</th>
						<th className="py-3 px-4">Action</th>
					</tr>
				</thead>

				<tbody className=" border-b-4 border-sky-500">
					<tr className="border-b even:bg-cyan-100">
						<td className="py-3 px-4">Blessing</td>
						<td className="py-3 px-4">Kodze</td>
						<td className="py-3 px-4">0109176603180</td>
						<td className="py-3 px-4">blessing@kodze</td>
						<td className="py-3 px-4">76 Summit Rd</td>
						<td className="py-3 px-4">0658494978</td>
						<td className="py-3 px-4">
							<span className="action-btn">
								<button className="py-2 px-3 bg-sky-500 text-white font-semibold rounded-md cursor-pointer text-xs">
									Remove
								</button>
							</span>
						</td>
					</tr>
				</tbody>
			</table>
		</section>
	);
}

export default FinesDashBoard;
