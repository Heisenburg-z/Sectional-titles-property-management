import React, { useEffect, useState } from "react";
import { Oval } from "react-loader-spinner";
import { useAuth } from "../../../../utils/auth";

function ResidentsReports() {
  const id = useAuth().profileId;
  const [profile, setProfile] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`/api/property/resident/reports/${id}`)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setProfile(data);
        setLoading(false);
      });
  }, [id]);

  return (
    <section className="main">
      {loading ? (
        <div className="flex justify-center items-center h-screen">
          <Oval
            height={100}
            width={100}
            color="#00a1f1"
            visible={true}
            ariaLabel="oval-loading"
            secondaryColor="#00a1f1"
            strokeWidth={2}
            strokeWidthSecondary={2}
          />
        </div>
      ) : (
        <table className="resident-table">
          <thead>
            <tr>
              <th>RoomNo</th>
              <th>Type Of Maintenance</th>
              <th>Description</th>
              <th>Date Issued</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {profile.map((s, i) => (
              <tr key={i}>
                <td>{s.roomNumber}</td>
                <td>{s.maintenanceType}</td>
                <td>{s.Description}</td>
                <td>{s.date}</td>
                <td>{s.Status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </section>
  );
}

export default ResidentsReports;
