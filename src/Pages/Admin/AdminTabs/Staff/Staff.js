import React, { useEffect, useState } from "react";
import {toast, ToastContainer} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';

function Staff() {
  const location = useLocation();
  const [isReLoad, setIsReLoad] = useState(true);
  const path = location.pathname.split("/")[3];
  const navigate = useNavigate();
  const [staff, setStaff] = useState([]);
  const [newRole, setNewRole] = useState("");
  const [editingRowId, setEditingRowId] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
      fetch(`/api/property/admin/staff`)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setStaff(data);
      });
    },3000)
  }, [isReLoad]);

  const deleteStaff = (id) => {
    fetch(`/api/property/admin/staff/delete/${id}`, {
      method: "POST",
    })
      .then((response) => response.json())
      .then(() => {
        console.log("Success");
      
      })
      .catch((error) => {
        console.error("Error:", error);
      });
      setIsReLoad(!isReLoad);
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
          setEditingRowId(null);
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
      isLoading? ( <Backdrop sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }} open
        >
         <CircularProgress color="inherit" />
        </Backdrop> ):(

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
      )
    );
  } else {
    return path === "staffsignupform" ? (
      <Outlet />
    ) : (
      isLoading? ( <Backdrop sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }} open
        >
         <CircularProgress color="inherit" />
        </Backdrop> ):(

        <section className="staff-section" class="pt-2 flex items-center justify-center">
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
                  {editingRowId === s.id ? (
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
                      <button
                        className="py-2 px-3 bg-red-500 text-white font-semibold rounded-md cursor-pointer text-xs ml-2"
                        onClick={() => setEditingRowId(null)}
                      >
                        Cancel
                      </button>
                    </div>
                  ) : (
                    <button
                      className="py-2 px-3 bg-sky-500 text-white font-semibold rounded-md cursor-pointer text-xs"
                      onClick={() => {
                        setEditingRowId(s.id);
                        setNewRole("");
                      }}
                    >
                      Edit Role
                    </button>
                  )}
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
      )
    );
  }
}

export default Staff;
