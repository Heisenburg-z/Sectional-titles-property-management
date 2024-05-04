import React, { useEffect, useState } from "react";
import "./Staff.css";

function Staff() {
  const [staff, setStaff] = useState([]);

  useEffect(() => {
		fetch(`/api/property/admin/staff`)
			.then((response) => {
				return response.json();
			})
			.then((data) => { 
        setStaff(data);
			});
	}, []);

  const deleteStaff = id => {
    fetch(`/api/property/admin/staff/delete/${id}`, {
      method: 'POST',
    })
      .then(response => response.json())
      .then(() => {
        console.log('Success');

        //Fetch again / reload
    })
    .catch(error => {
        console.error('Error:', error);
    });
  }

  if(staff.length === 0){
    return <h2 className="fetching-error"> No data available </h2>;
  }
  else{ 
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
                <th>Action</th>
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
                      <td>
                        <span  className="action-btn">
                          <button className="removestaff-btn" onClick={ () => deleteStaff(s.id)}>Remove</button>  
                        </span>
                      </td>
                    </tr>
                  ))
                }
            </tbody>
          </table>
        </section>
    )
  }
  
}

export default Staff
