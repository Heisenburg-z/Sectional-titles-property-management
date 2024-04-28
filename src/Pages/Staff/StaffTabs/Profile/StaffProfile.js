import React, { useEffect, useState } from "react";
import { useAuth } from "../../../../utils/auth";
import "./StaffProfile.css";

function StaffProfile() {
	const id = useAuth().profileId;
	const [profile, setProfile] = useState(null);

	useEffect(() => {
		fetch(`/api/property/staff/profile/${id}`)
			.then((response) => {
				return response.json();
			})
			.then((data) => {
				// console.log(data);
				setProfile(data);
			});
	}, [id]);

	return (
		<>
			{profile && (
				<section className="profile-section">
					<h1>
						{profile.surName}, {profile.name}
					</h1>
					<p>Email Address:{profile.email}</p> <br></br>
					<p>Cellphone Number: {profile.cellPhone}</p><br></br>
					<p>Role: {profile.roles}</p><br></br>
					<p>Home Address: {profile.userAddress}</p>
				</section>
			)}
		</>
	);
}

export default StaffProfile;