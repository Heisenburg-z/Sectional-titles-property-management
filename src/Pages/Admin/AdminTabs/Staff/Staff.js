import React, { useEffect, useState } from "react";
import {toast, ToastContainer} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { Outlet, useLocation, useNavigate } from "react-router-dom";

function Staff() {
  const location = useLocation();
  const [isReLoad, setIsReLoad] = useState(true);
  const path = location.pathname.split("/")[3];
  const navigate = useNavigate();
  const [staff, setStaff] = useState([]);
  const [newRole, setNewRole] = useState("");

  useEffect(() => {
    fetch(`/api/property/admin/staff`)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setStaff(data);
      });
  }, [isReLoad]);

  const deleteStaff = (id) => {
    fetch(`/api/property/admin/staff/delete/${id}`, {
      method: "POST",
    })
      .then((response) => response.json())
      .then(() => {
        console.log("Success");
        setIsReLoad(!isReLoad);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  const updateRole = (id) => {
    fetch(`/api/property/admin/staff/updaterole/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ newRole }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.message === "Role updated successfully") {
          console.log("Role updated successfully");
          toast.success("Role updated successfully");
          setIsReLoad(!isReLoad);
        } else {
          toast.error("Failed to update role");
        }
      })
      .catch((error) => {
        toast.error("Error updating role");
        console.error("Error updating role:", error);
      });
  };

  if (staff.length === 0) {
    return path === "staffsignupform" ? (
      <Outlet />
    ) : (
      <>
        <h2 className="fetching-error"> No data available </h2>
        <button
          id="bottom-right-button"
          className="fixed bottom-20 right-20 px-4 py-3 bg-sky-500 hover:bg-blue-700 text-white rounded-md shadow-md cursor-pointer"
          onClick={() => navigate("staffsignupform")}
        >
          + Sign Up
        </button>
      </>
    );
  } else {
    return path === "staffsignupform" ? (
      <Outlet />
    ) : (
      <section className="staff-section">
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
              <th className="py-3 px-4">Update Role</th>
            </tr>
          </thead>

          <tbody className="border-b border-b-4 border-sky-500">
            {staff.map((s, i) => (
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
                      onClick={() => deleteStaff(s.id)}
                    >
                      Remove
                    </button>
                  </span>
                </td>
                <td className="py-3 px-4">
                  <div>
                    <input
                      type="text"
                      value={newRole}
                      onChange={(e) => setNewRole(e.target.value)}
                      className="py-2 px-3 border rounded-md"
                      placeholder="New Role"
                    />
                    <button
                      className="py-2 px-3 bg-sky-500 text-white font-semibold rounded-md cursor-pointer text-xs ml-2"
                      onClick={() => updateRole(s.id)}
                    >
                      Update Role
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <button
          id="bottom-right-button"
          className="fixed bottom-20 right-20 px-4 py-3 bg-sky-500 hover:bg-blue-500 text-white rounded-md shadow-md cursor-pointer"
          onClick={() => navigate("staffsignupform")}
        >
          + Sign Up
        </button>
      </section>
    );
  }
}

export default Staff;
