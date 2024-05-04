import React, { useEffect, useState } from "react";
import "./Resident.css";

function Resident() {
  const [resident, setResident] = useState([]);


  useEffect(() => {
		fetch(`/api/property/admin/resident`)
			.then((response) => {
				return response.json();
			})
			.then((data) => { 

        console.log(data);
        setResident(data);
			}).catch(() => {
        console.error('No data to be fetched');
    });
	}, []);

  const deleteResident = id => {
    fetch(`/api/property/admin/resident/delete/${id}`, {
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

  if(resident.length === 0){
    return <h2 className="fetching-error"> No data available </h2>;
  }
  else{
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
                <th>Action</th>
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
                      <td>
                        <span  className="action-btn">
                          <button className="remove-btn" onClick={ () => deleteResident(s.id)}>Remove</button>  
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


export default Resident;
