import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function UploadPaymentForm() {
	const [file, setFile] = useState(null);
	// const navigate = useNavigate();

	// function handleChange(event) {
	// 	setFile(event.target.files[0]);
	// }

	function handleSubmit(event) {
		event.preventDefault();
		const url = "/api/property/admin/resident/234/234/upload";
		const formData = new FormData();
		formData.append("file", file);
		formData.append("fileName", file.name);
		const config = {
			headers: {
				"content-type": "multipart/form-data",
			},
		};
		fetch(url, { method: "POST", body: formData, ...config })
			.then((response) => {
				if (response.ok) {
					// Handle success
					console.log("File uploaded successfully");
				} else {
					// Handle error
					console.error("Failed to upload file");
				}
			})
			.catch((error) => {
				console.error("Error occurred while uploading file:", error);
			});
	}

	return (
		<section className="w-full justify-center">
			<form method="POST" enctype="multipart/form-data">
				<input
					type="file"
					className="block w-full text-sm text-slate-500
        file:mr-4 file:py-2 file:px-4 file:rounded-md
        file:border-0 file:text-sm file:font-semibold
        file:bg-sky-50 file:text-sky-700
        hover:file:bg-sky-400"
					onChange={(event) => setFile(event.target.files[0])}
				/>
			</form>

			<button
				onClick={handleSubmit}
				className="px-3 py-2 rounded-md mt-5 bg-sky-400 hover:bg-sky-600"
			>
				Upload file
			</button>
		</section>
	);
}

export default UploadPaymentForm;
