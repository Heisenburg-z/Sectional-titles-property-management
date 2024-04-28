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
				// console.log(data);  16a7361594710c85a7b9df27dc6357223dffdc23git
				setProfile(data);
			});
	}, [id]);

	return (
        <>
        {profile && (
             <section className="profile-container">
     <h1 className="profile-heading"> Profile</h1>
     <section className="profile-details">
       <article className="detail">
         <label>Name:</label>
         <span>{profile.name}</span>
       </article>
       <article className="detail">
         <label>Surname:</label>
         <span>{profile.surName}</span>
       </article>
       <article className="detail">
         <label>Roles:</label>
         <span>{profile.roles}</span>
       </article>
       <article className="detail">
         <label>Username:</label>
         <span>{profile.userName}</span>
       </article>
       <article className="detail">
         <label>Address:</label>
         <span>{profile.userAddress}</span>
       </article>
       <article className="detail">
         <label>Cell Phone:</label>
         <span>{profile.cellPhone}</span>
       </article>
       <article className="detail">
         <label>Email:</label>
         <span>{profile.email}</span>
       </article>
     </section>
   </section>

        )}
    </>
	);
}

export default StaffProfile;