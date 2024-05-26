import React, { useEffect, useState } from "react";
import { useAuth } from "../../../../utils/auth";
import "./StaffProfile.css"; // Import CSS file
import { Oval } from "react-loader-spinner";

function StaffProfile() {
  const id = useAuth().profileId;
  const [isReLoading, setIsReLoading] = useState(true);
  const [profile, setProfile] = useState(null);
  const [editEmail, setEditEmail] = useState(false);
  const [editCellphone, setEditCellphone] = useState(false);
  const [newEmail, setNewEmail] = useState("");
  const [newCellphone, setNewCellphone] = useState("");
  const [loading, setLoading] = useState(true); // Loading state

  useEffect(() => {
    fetch(`/api/property/staff/profile/${id}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch profile data");
        }
        return response.json();
      })
      .then((data) => {
        setProfile(data);
        setLoading(false); // Set loading to false after data is fetched
      })
      .catch((error) => {
        console.error("Error fetching profile data:", error);
        setLoading(false); // Set loading to false in case of error
      });
  }, [id, isReLoading]);

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
      const response = await fetch(`/api/property/staff/profile/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: newEmail,
        }),
      });
      console.log(JSON.stringify({ email: newEmail }));
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
    setIsReLoading(!isReLoading);
  };

  const handleCellphoneUpdate = async () => {
    try {
      const response = await fetch(`/api/property/staff/profile/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          cellPhone: newCellphone,
        }),
      });
      console.log(JSON.stringify({ cellPhone: newCellphone }));
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
    setIsReLoading(!isReLoading);
  };

  // Loader component
  const Loader = (
    <div className="flex justify-center items-center h-screen">
      <Oval
        height={80}
        width={80}
        color="#00a1f1"
        visible={true}
        ariaLabel="oval-loading"
        secondaryColor="#00a1f1"
        strokeWidth={2}
        strokeWidthSecondary={2}
      />
    </div>
  );

  // Content to render once data is loaded
  const Content = (
    <>
      {profile && (
        <section className="profile-container">
          <h1 className="profile-heading">Staff Profile</h1>
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
                  <span className="editable" onClick={handleCellphoneClick}>
                    {profile.cellPhone}
                  </span>
                )}
                {editCellphone && (
                  <button id="updateButton" onClick={handleCellphoneUpdate}>
                    Update
                  </button>
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
                  <span className="editable" onClick={handleEmailClick}>
                    {profile.email}
                  </span>
                )}
                {editEmail && (
                  <button id="updateButton" onClick={handleEmailUpdate}>
                    Update
                  </button>
                )}
              </label>
            </article>
          </section>
        </section>
      )}
    </>
  );

  return <>{loading ? Loader : Content}</>;
}

export default StaffProfile;
