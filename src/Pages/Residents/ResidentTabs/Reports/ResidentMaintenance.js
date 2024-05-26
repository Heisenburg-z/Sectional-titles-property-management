import React, { useEffect, useState, useRef } from "react";
import { Oval } from "react-loader-spinner";
import { useAuth } from "../../../../utils/auth";
import "./ResidentsResports.css";
import { useReactToPrint } from "react-to-print";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function ResidentsMaintenance() {
  const componentPDF = useRef();
  const id = useAuth().profileId;
  const [profile, setProfile] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    fetch(`/api/property/resident/reports/${id}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        return response.json();
      })
      .then((data) => {
        if (data.length === 0) {
          setError(true); // Set error if no items available
        }
        setProfile(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setError(true); // Set error if fetch fails
        setLoading(false);
      });
  }, [id]);

  const generatePDF = useReactToPrint({
    content: () => componentPDF.current,
    documentTitle: "Your collection of fines",
    onAfterPrint: () => toast.success("Document saved successfully"),
  });

  return (
    <section className="main">
      <ToastContainer />
      {loading && !error ? (
        <div className="flex justify-center items-center h-screen">
          <Oval
            height={100}
            width={100}
            color="#00a1f1"
            visible={true}
            ariaLabel="oval-loading"
            secondaryColor="#00a1f1"
            strokeWidth={2}
            strokeWidthSecondary={2}
          />
        </div>
      ) : error ? (
        <div className="flex justify-center items-center h-screen">
          <p class="text-slate-600">No data available.</p>
        </div>
      ) : (
        <section ref={componentPDF} style={{ width: "100%" }}>
          <table className="resident-table">
            <thead>
              <tr>
                <th>Type Of Maintenance</th>
                <th>Description</th>
                <th>Date Issued</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {profile.map((s, i) => (
                <tr key={i}>
                  <td>{s.maintenanceType}</td>
                  <td>{s.Description}</td>
                  <td>{s.date}</td>
                  <td>{s.Status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
      )}
      <section>
        {!loading && !error && (
          <button
            onClick={generatePDF}
            className="w-full px-3 py-2 bg-sky-500 text-white font-bold rounded-md cursor-pointer text-base transition duration-300 hover:bg-blue-600"
          >
            Export as PDF
          </button>
        )}
      </section>
    </section>
  );
}

export default ResidentsMaintenance;

