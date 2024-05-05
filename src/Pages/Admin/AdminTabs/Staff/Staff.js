import React, { useEffect, useState } from "react";
import "./Staff.css";
import { Outlet, useLocation, useNavigate } from "react-router-dom";

function Staff() {
  const location = useLocation();
  const path = location.pathname.split('/')[3];
  const navigate = useNavigate();
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
    return ( path === 'staffsignupform' ? <Outlet/> :
    <><h2 className="fetching-error"> No data available </h2>
    <button id="bottom-right-button" onClick={() => navigate('staffsignupform')}>+ Sign Up</button>
    </>
  );
  }
  else{ 
    return ( path === 'staffsignupform' ? <Outlet/> :
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
          <button id="bottom-right-button" onClick={() => navigate('staffsignupform')}>+ Sign Up</button>
        </section>
    )
  }
  
}

export default Staff
