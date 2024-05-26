import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

function ResidentSpecificFines() {
  const navigate = useNavigate();
  const { residentId } = useParams();
  const [residentFines, setResidentFines] = useState([]);
  useEffect(() => {
    fetch(`/api/property/resident/fines/${residentId}`)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log(data);
        setResidentFines(data);
      })
      .catch((e) => {
        console.error("No data to be fetched", e);
      });
  }, [residentId
  ]);

  return (
    <>
      <section className="container ">
        {residentFines.length === 0 ? (
          <h1 className="text-center">No Fines</h1>
        ) : (
          <table className="border-collapse border border-gray-300 rounded-t-lg overflow-hidden shadow-lg mt-6 mb-0 text-sm min-w-[400px] mx-auto">
            <thead className="bg-sky-500 text-white text-left font-bold">
              <tr className="bg-sky-500 text-white text-left font-bold">
                <th className="py-3 px-4">UserID</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4">Fine Type</th>
                <th className="py-3 px-4">Date Issued</th>
                <th className="py-3 px-4">Amount</th>
                <th className="py-3 px-4">Action</th>
              </tr>
            </thead>
            <tbody className=" border-b-4 border-sky-500">
              {residentFines.map((fine, i) => (
                <tr className="border-b even:bg-cyan-100" key={i}>
                  <td className="py-3 px-4">{fine.id}</td>
                  <td className="py-3 px-4">{fine.Status}</td>
                  <td className="py-3 px-4">{fine.Type}</td>
                  <td className="py-3 px-4">{fine.DateIssued}</td>
                  <td className="py-3 px-4">{fine.Amount}</td>
                  <td className="py-3 px-4">
                    <span className="action-btn">
                      <button
                        onClick={() => {
                          navigate(`${fine.id}/update`);
                        }}
                        className="py-2 px-3 bg-sky-500 text-white font-semibold rounded-md cursor-pointer text-xs"
                      >
                        Update Fine
                      </button>
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </section>
      <button
        onClick={() => {
          navigate("new_fine");
        }}
        className="fixed bottom-20 right-20 px-4 py-3 bg-sky-500 hover:bg-blue-500 text-white rounded-md shadow-md cursor-pointer"
      >
        New Fine
      </button>
    </>
  );
}

export default ResidentSpecificFines;
