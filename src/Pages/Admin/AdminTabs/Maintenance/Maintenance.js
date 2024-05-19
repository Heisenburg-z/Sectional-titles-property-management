import React, { useEffect, useState } from "react";
import { Oval } from 'react-loader-spinner';

function Maintenance() {
  const [maintenance, setMaintenance] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch(`/api/property/admin/allmaintenance`)
      .then((response) => response.json())
      .then((data) => {
        setMaintenance(data);
        setIsLoading(false);
      })
      .catch(() => {
        console.error("No data to be fetched");
        setIsLoading(false);
      });
  }, []);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Oval
          height={100}
          width={100}
          color="#4fa94d"
          wrapperStyle={{}}
          wrapperClass=""
          visible={true}
          ariaLabel='oval-loading'
          secondaryColor="#4fa94d"
          strokeWidth={2}
          strokeWidthSecondary={2}
        />
      </div>
    );
  }

  if (maintenance.length === 0) {
    return <h2 className="fetching-error">No data available</h2>;
  } else {
    return (
      <section className="pt-2 flex items-center justify-center">
        <table className="border-collapse border border-gray-300 rounded-t-lg overflow-hidden shadow-lg mt-6 mb-0 text-sm min-w-[400px]">
          <thead className="bg-sky-500 text-white text-left font-bold">
            <tr className="bg-sky-500 text-white text-left font-bold">
              <th className="py-3 px-4">Description</th>
              <th className="py-3 px-4">Room Number</th>
              <th className="py-3 px-4">Type</th>
              <th className="py-3 px-4">Date</th>
              <th className="py-3 px-4">Status</th>
            </tr>
          </thead>
          <tbody className="border-b border-b-4 border-sky-500">
            {maintenance.map((s, i) => (
              <tr
                className={`border-b even:bg-cyan-100 ${s.Status === "Closed" ? 'line-through' : ''}`}
                key={i}
              >
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
    );
  }
}

export default Maintenance;

