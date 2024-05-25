import React from "react";
import { useNavigate, Outlet } from "react-router-dom";

function ResidentsReports() {
  const navigate = useNavigate();

  return (
    <section className="main">
      <section className="btn-group">
        <button 
          onClick={() => navigate('maintenance')} 
          className="px-4 py-2 bg-[#00a1f1] text-white font-bold rounded-md cursor-pointer text-base transition duration-300 hover:bg-[#0080c0db] mr-1"
        >
          Maintenance
        </button>
        <button 
          onClick={() => navigate('fines')} 
          className="px-4 py-2 bg-[#00a1f1] text-white font-bold rounded-md cursor-pointer text-base transition duration-300 hover:bg-[#0080c0db] ml-1"
        >
          Fines
        </button>
      </section>
      <Outlet />
    </section>
  );
}

export default ResidentsReports;
