import React, { useEffect, useState } from "react";

function Maintenance() {
  const [maintenance, setMaintenance] = useState([]);

  useEffect(() => {
    fetch(`/api/property/admin/allmaintenance`)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        //console.log(data);
        setMaintenance(data);
      })
      .catch(() => {
        console.error("No data to be fetched");
      });
  });

  if(maintenance.length === 0){
    return (
      <h2 className="fetching-error"> No data available </h2>
    )
  } else {
    return (
      <section className="maintenance-section">
        <table className="border-collapse border border-gray-300 rounded-t-lg overflow-hidden shadow-lg mt-6 mb-0 text-sm min-w-[400px]">
          <thead className="bg-sky-500 text-white text-left font-bold">
            <tr className="bg-sky-500 text-white text-left font-bold">
              <th className="py-3 px-4">Description</th>
              <th className="py-3 px-4">RoomNumber</th>
              <th className="py-3 px-4">Type</th>
              <th className="py-3 px-4">Date</th>
              <th className="py-3 px-4">Status</th>
            </tr>
          </thead>
          <tbody className="border-b border-b-4 border-sky-500">
            {maintenance.map((s, i) => (
              <tr className="border-b even:bg-cyan-100 " key={i}>
                <td className="py-3 px-4">{s.Description}</td>
                <td className="py-3 px-4">{s.roomNumber}</td>
                <td className="py-3 px-4">{s.maintenanceType}</td>
                <td className="py-3 px-4">{s.date}</td>
                <td className="py-3 px-4">{s.Status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    )
  }
}

export default Maintenance
