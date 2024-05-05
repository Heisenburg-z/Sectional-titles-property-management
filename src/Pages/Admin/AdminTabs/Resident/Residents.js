import React, { useEffect, useState } from "react";
import "./Resident.css";
import { Outlet, useLocation, useNavigate } from "react-router-dom";

function Resident() {
  const location = useLocation();
  const path = location.pathname.split('/')[3];
  const navigate = useNavigate();
  const [resident, setResident] = useState([]);


  useEffect(() => {
		fetch(`/api/property/admin/resident`)
			.then((response) => {
				return response.json();
			})
			.then((data) => { 
        //console.log(data);
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
    return (path === 'signupform' ? <Outlet/> :

    <><h2 className="fetching-error"> No data available </h2>
    <button id="bottom-right-button" onClick={() => navigate('signupform')}>+ Sign Up</button></>);
  }
  else{
    return ( path === 'signupform' ? <Outlet/> :
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
          <button id="bottom-right-button" onClick={() => navigate('signupform')}>+ Sign Up</button>
        </section>
    )
  } 
}


export default Resident;
