import React, { useEffect, useState } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Oval } from 'react-loader-spinner';

function Resident() {
  const location = useLocation();
  const [isReLoad, setIsReLoad] = useState(true);
  const path = location.pathname.split("/")[3];
  const navigate = useNavigate();
  const [resident, setResident] = useState([]); // Add the resident state
  const [loading, setLoading] = useState(false); // Loading state

  useEffect(() => {
    setLoading(true); 
    fetch(`/api/property/admin/resident`)
      .then((response) => response.json())
      .then((data) => {
        setResident(data);
        setLoading(false); 
      })
      .catch((error) => {
        console.error('Error fetching residents:', error);
        toast.error('Error fetching residents');
        setLoading(false); 
      });
  }, [isReLoad]);

  const deleteResident = (id) => {
    fetch(`/api/property/admin/resident/delete/${id}`, {
      method: "POST",
    })
      .then((response) => response.json())
      .then(() => {
        toast.success("Resident deleted successfully");
        setIsReLoad(!isReLoad);
      })
      .catch((error) => {
        console.error("Error:", error);
        toast.error("Error deleting resident");
      });
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Oval
          height={80}
          width={80}
          color="#00a1f1"
          wrapperStyle={{}}
          wrapperClass=""
          visible={true}
          ariaLabel="oval-loading"
          secondaryColor="#00a1f1"
          strokeWidth={2}
          strokeWidthSecondary={2}
        />
      </div>
    );
  }

  if (resident.length === 0) {
    return path === "signupform" ? (
      <Outlet />
    ) : (
      <>
        <ToastContainer />
        <h2 className="fetching-error text-slate-600">No data available</h2>
        <button
          id="bottom-right-button"
          className="fixed bottom-20 right-20 px-4 py-3 bg-sky-500 hover:bg-blue-700 text-white rounded-md shadow-md cursor-pointer"
          onClick={() => navigate("signupform")}
        >
          + Sign Up
        </button>
      </>
    );
  } else {
    return path === "signupform" ? (
      <Outlet />
    ) : (
      <section className="resident-section pt-2 flex items-center justify-center">
        <ToastContainer />
        <table className="border-collapse border border-gray-300 rounded-t-lg overflow-hidden shadow-lg mt-6 mb-0 text-sm min-w-[400px]">
          <thead className="bg-sky-500 text-white text-left font-bold">
            <tr className="bg-sky-500 text-white text-left font-bold">
              <th className="py-3 px-4">Name</th>
              <th className="py-3 px-4">Surname</th>
              <th className="py-3 px-4">Username</th>
              <th className="py-3 px-4">Email</th>
              <th className="py-3 px-4">Address</th>
              <th className="py-3 px-4">Cellno</th>
              <th className="py-3 px-4">Action</th>
              <th className="py-3 px-4">Fines</th>
            </tr>
          </thead>

          <tbody className="border-b border-b-4 border-sky-500">
            {resident.map((s, i) => (
              <tr className="border-b even:bg-cyan-100" key={i}>
                <td className="py-3 px-4">{s.name}</td>
                <td className="py-3 px-4">{s.surName}</td>
                <td className="py-3 px-4">{s.userName}</td>
                <td className="py-3 px-4">{s.email}</td>
                <td className="py-3 px-4">{s.userAddress}</td>
                <td className="py-3 px-4">{s.cellPhone}</td>
                <td className="py-3 px-4">
                  <span className="action-btn">
                    <button
                      className="py-2 px-3 bg-sky-500 text-white font-semibold rounded-md cursor-pointer text-xs"
                      onClick={() => deleteResident(s.id)}
                    >
                      Remove
                    </button>
                  </span>
                </td>
                <td className="py-3 px-4">
                  <span className="action-btn">
                    <button
                      className="py-2 px-3 bg-inherit hover:bg-red-600 text-white font-semibold rounded-md cursor-pointer text-xs"
                      onClick={() => navigate(`${s.id}/fines`)}
                    >
                      Fines
                    </button>
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <button
          id="bottom-right-button"
          className="fixed bottom-20 right-20 px-4 py-3 bg-sky-500 hover:bg-blue-500 text-white rounded-md shadow-md cursor-pointer"
          onClick={() => navigate("signupform")}
        >
          + Sign Up
        </button>
      </section>
    );
  }
}

export default Resident;
