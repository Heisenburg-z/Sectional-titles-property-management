import React, { useEffect, useState } from "react";
import "./Staff.css";

function Staff() {
  //const [Columns, setColumns] = useState([]);
  const [staff, setStaff] = useState([]);

  useEffect(() => {
		fetch(`/api/property/admin/staff`)
			.then((response) => {
				return response.json();
			})
			.then((data) => { 
        //setColumns(Object.keys(data[0])); not needed because we assign the table header manually. Gael
        setStaff(data);
			});
	}, []);

  return (
      <section className="staff-section">
        <table className="staff-table">
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
                staff.map((s, i) => (
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

export default Staff
