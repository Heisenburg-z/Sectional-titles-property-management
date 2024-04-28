import React, { useEffect, useState } from "react";
import { useAuth } from "../../../../utils/auth";
import "./Profile.css";

function Profile() {
	const id = useAuth().profileId;
	const [profile, setProfile] = useState(null);

	useEffect(() => {
		fetch(`http://localhost:7071/api/property/admin/profile/${id}`)
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
						{profile.surName} {profile.name}
					</h1>
					<p>email:{profile.email}</p>
					<p>phone: {profile.cellPhone}</p>
					<p>role: {profile.roles}</p>
					<p>Home Address: {profile.userAddress}</p>
				</section>
			)}
		</>
	);
}

export default Profile;

// {
//   "userAddress": "asdlfja;slkdfj;als",
//   "surName": "Yun",
//   "roles": "Resident",
//   "name": "Chan",
//   "userName": "autumn_leaf",
//   "email": "blessingeleer.school@gmail.com",
//   "cellPhone": "0070703450345"
// }
