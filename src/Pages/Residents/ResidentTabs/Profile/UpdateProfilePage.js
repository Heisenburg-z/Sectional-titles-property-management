import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import "./UpdateProfile.css";

function UpdateProfilePage({ profileId }) {
  const [profile, setProfile] = useState(null);
  const [updatedProfile, setUpdatedProfile] = useState(null);
  const history = useHistory();

  useEffect(() => {
    fetch(`http://localhost:7071/api/property/resident/profile/${profileId}`)
      .then((response) => response.json())
      .then((data) => {
        setProfile(data);
        setUpdatedProfile({ ...data });
      });
  }, [profileId]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUpdatedProfile((prevProfile) => ({
      ...prevProfile,
      [name]: value,
    }));
  };

  const handleUpdateProfile = () => {
    fetch(`/api/property/resident/profile/${profileId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedProfile),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        // Optionally, handle success response
        history.push("/resident/profile"); // Redirect back to profile page after update
      })
      .catch((error) => {
        console.error("Error updating profile:", error);
        // Handle error
      });
  };

  return (
    <section>
      <h1>Update Profile</h1>
      {profile && (
        <form>
          {Object.entries(profile).map(([key, value]) => (
            <fieldset key={key}>
              <label htmlFor={key}>{key}</label>
              <input
                type="text"
                id={key}
                name={key}
                value={updatedProfile[key]}
                onChange={handleInputChange}
              />
            </fieldset>
          ))}
          <button type="button" onClick={handleUpdateProfile}>
            Update Profile
          </button>
        </form>
      )}
    </section>
  );
}

export default UpdateProfilePage;
