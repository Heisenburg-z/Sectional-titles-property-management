import React from 'react'
import './ResidentsResports.css';
import { Outlet} from "react-router-dom";


function ResidentsReports() {
  return (
    <section className="area">
     <section className="buttons">
      <button>Maintenance</button>
      <button>Fines</button>
      <button>Issues</button>
     </section>
     <br /><br />
     <Outlet/>
    </section>
  )
}

export default ResidentsReports