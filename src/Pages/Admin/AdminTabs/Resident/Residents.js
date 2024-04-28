import React, { useEffect, useState } from "react";
import "./Resident.css";

function Resident() {
  //const [Columns, setColumns] = useState([]);
  const [resident, setResident] = useState([]);

  useEffect(() => {
		fetch(`/api/property/admin/resident`)
			.then((response) => {
				return response.json();
			})
			.then((data) => { 
        //setColumns(Object.keys(data[0])); not needed because we assign the table header manually. Gael
        setResident(data);
			});
	}, []);

  return (
      <section className="resident-section">
        <table className="resident-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Surname</th>
              <th>Username</th>
              <th>Email</th>
              <th>Address</th>
              <th>Cellno</th>
            </tr>
          </thead>
              
          <tbody>
              {
                resident.map((s, i) => (
                  <tr key={i}>
                    <td>{s.name}</td>
                    <td>{s.surName}</td>
                    <td>{s.userName}</td>
                    <td>{s.email}</td>
                    <td>{s.userAddress}</td>
                    <td>{s.cellPhone}</td>
                  </tr>
                ))
              }
          </tbody>
        </table>
      </section>
  )
}

export default Resident;
