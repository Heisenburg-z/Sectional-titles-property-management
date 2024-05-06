import React, { useEffect, useState } from "react";
import { useAuth } from "../../../../utils/auth";
import "./ResidentProfile.css"; // Import CSS file

function ResidentProfile() {
  const id = useAuth().profileId;
  const [profile, setProfile] = useState(null);
  const [editEmail, setEditEmail] = useState(false);
  const [editCellphone, setEditCellphone] = useState(false);
  const [newEmail, setNewEmail] = useState("");
  const [newCellphone, setNewCellphone] = useState("");

  useEffect(() => {
    fetch(`/api/property/resident/profile/${id}`)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setProfile(data);
      });
  }, [id]);

  const handleEmailClick = () => {
    setEditEmail(true);
    setNewEmail(profile.email);
  };

  const handleCellphoneClick = () => {
    setEditCellphone(true);
    setNewCellphone(profile.cellPhone);
  };

  const handleEmailChange = (e) => {
    setNewEmail(e.target.value);
  };

  const handleCellphoneChange = (e) => {
    setNewCellphone(e.target.value);
  };

  const handleEmailUpdate = async () => {
    try {
      const response = await fetch(`/api/property/resident/profile/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          email: newEmail

        })
      });
      console.log(JSON.stringify({email: newEmail}));
      if (response.ok) {
        setEditEmail(false);
        // Assuming you want to update the profile displayed after successful update
        const updatedProfile = await response.json();
        setProfile(updatedProfile);
      } else {
        console.error("Failed to update email:", response.statusText);
      }
    } catch (error) {
      console.error("Error updating email:", error);
    }
  };

  const handleCellphoneUpdate = async () => {
    try {
      const response = await fetch(`/api/property/resident/profile/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          cellPhone: newCellphone
        })
      });
      console.log(JSON.stringify({cellPhone: newCellphone}));
      if (response.ok) {
        setEditCellphone(false);
        // Assuming you want to update the profile displayed after successful update
        const updatedProfile = await response.json();
        setProfile(updatedProfile);
      } else {
        console.error("Failed to update cellphone:", response.statusText);
      }
    } catch (error) {
      console.error("Error updating cellphone:", error);
    }
  };


  return (
    <>
      {profile && (
        <section className="profile-container">
          <h1 className="profile-heading">Resident Profile</h1>
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
              <label>
                Cell Phone:
                {editCellphone ? (
                  <input
                    type="text"
                    value={newCellphone}
                    onChange={handleCellphoneChange}
                  />
                ) : (
                  <span onClick={handleCellphoneClick}>{profile.cellPhone}</span>
                )}
                {editCellphone && (
                  <button onClick={handleCellphoneUpdate}>Update</button>
                )}
              </label>
            </article>
            <article className="detail">
              <label>
                Email:
                {editEmail ? (
                  <input
                    type="email"
                    value={newEmail}
                    onChange={handleEmailChange}
                  />
                ) : (
                  <span onClick={handleEmailClick}>{profile.email}</span>
                )}
                {editEmail && (
                  <button onClick={handleEmailUpdate}>Update</button>
                )}
              </label>
            </article>
          </section>
        </section>
      )}
    </>
  );
}

export default ResidentProfile;