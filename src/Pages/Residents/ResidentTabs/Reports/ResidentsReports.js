import React from 'react'
import './ResidentsResports.css';
import { Outlet, useNavigate} from "react-router-dom";


function ResidentsReports() {
  const navigate = useNavigate();
  return (
    <section className="area">
     <section className="buttons">
      <button onClick={()=> navigate(`/resident/reports/fines`)}>Fines</button>
      <button onClick={()=> navigate(`/resident/reports/issues`)}>Issues</button>
     </section>
     <br />
     <Outlet/>
    </section>
  )
}

export default ResidentsReports