import React from "react";
import { useNavigate, Outlet } from "react-router-dom";

function ResidentsReports() {
  const navigate = useNavigate();

  return (
    <section className="main">
      <section className="btn-group">
        <button  onClick={()=>navigate('maintenance')}>Maintenance</button>
        <button onClick={()=>navigate('fines')}>Fines</button>
      </section>
      <Outlet/>
    </section>
  );
}

export default ResidentsReports;
