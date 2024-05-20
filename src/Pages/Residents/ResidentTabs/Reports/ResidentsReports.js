import React from 'react'
import './ResidentsResports.css';
import { useAuth } from '../../../../utils/auth';
import { useEffect, useState } from 'react';


function ResidentsReports() {
  const id = useAuth().profileId;
    const [profile, setProfile] = useState([]);
    useEffect(() => {
        fetch(`/api/property/resident/reports/${id}`)
          .then((response) => {
            return response.json();
          })
          .then((data) => {
            console.log(data);
            setProfile(data);
          });
      }, [id]);

      
  return (
    <section className="main">
      
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
                {profile.map((s, i)=>(
                <tr key={i}>
                    <th>{s.roomNumber}</th>
                    <th>{s.maintenanceType}</th>
                    <th>{s.Description}</th>
                    <th>{s.date}</th>
                    <th>{s.Status}</th>
                </tr>
                ))}
                
            </tbody>
            </table>
            
    </section>
  )
}

export default ResidentsReports