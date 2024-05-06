import React,{useEffect, useState} from "react";
import { useAuth } from "../../../../utils/auth";
import './ResidentsFines.css';
function ResidentsFines() {

    const id = useAuth().profileId;
    const [profile, setProfile] = useState([]);
    useEffect(() => {
        fetch(`/api/property/resident/fines/${id}`)
          .then((response) => {
            return response.json();
          })
          .then((data) => {
            console.log(data);
            setProfile(data);
          });
      }, [id]);
  return (
    <section>
      <table className="resident-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>RoomNo</th>
                <th>Reason for fine</th>
                <th>Amount Due</th>
                <th>Date Issued</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
                {profile.map((s, i)=>(
                <tr key={i}>
                    <th>{s.Name}</th>
                    <th>{s.RoomNo}</th>
                    <th>{s.Type}</th>
                    <th>{s.Amount}</th>
                    <th>{s.DateIssued}</th>
                    <th>{s.Status}</th>
                </tr>
                ))}
                
            </tbody>
            </table>
    </section>
  )
}

export default ResidentsFines
