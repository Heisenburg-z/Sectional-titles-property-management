import React, { useEffect, useState } from 'react'
import { useAuth } from "../../../../utils/auth";
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';

function StaffAllMaintenance() {
  const id = useAuth().profileId;
  const [isReLoading, setIsReLoading] = useState(true);
  const [maintenance, setMaintenance] = useState([]);

  useEffect(() => {
    setTimeout(() => {
      setIsReLoading(false)
      fetch(`/api/property/staff/maintenance/${id}`)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setMaintenance(data);

      }).catch(() => {
        console.error("No maintenance to be fetched");
      });
    }, 2000)
  }, [id, isReLoading]);

  const handleStatusUpdate = async (docid, taskStatus) => {
		try {
			fetch(`/api/property/staff/maintenance/UpdateStatus/${docid}/${taskStatus}`, {
				method: "PUT",
      })
        .then((response) => response.json())
        .then(() => {
          console.log("Success");

      }).catch((error) => {
        console.error("Error updating status:", error);
      });

		} catch (error) {
			console.error("Error updating status:", error);
		}
		setIsReLoading(!isReLoading);
	};


  if(maintenance.length === 0){
    return (
      isReLoading? ( <Backdrop sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }} open
        >
         <CircularProgress color="inherit" />
        </Backdrop> ):(

        <h2 className="fetching-error"> No data available </h2>
      )
    )
  } else {
    return (
      isReLoading? ( <Backdrop sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }} open
        >
         <CircularProgress color="inherit" />
        </Backdrop> ):(

        <section className="pt-2 flex items-center justify-center">
        <table className="border-collapse border border-gray-300 rounded-t-lg overflow-hidden shadow-lg mt-6 mb-0 text-sm min-w-[400px]">
          <thead className="bg-sky-500 text-white text-left font-bold">
            <tr className="bg-sky-500 text-white text-left font-bold">
              <th className="py-3 px-4"> </th>
              <th className="py-3 px-4">Description</th>
              <th className="py-3 px-4">RoomNumber</th>
              <th className="py-3 px-4">Date</th>
              <th className="py-3 px-4">Status</th>
            </tr>
          </thead>
          <tbody className="border-b border-b-4 border-sky-500">
            {maintenance.map((s, i) => (
              <tr class="border-b even:bg-cyan-100 " className={`table-row ${s.Status === "Closed" ? 'line-through' : ''}`} key={i}>
                <td className="py-3 px-4"> 
                
                  <span className="py-2 px-3 text-sky-500 font-semibold rounded-md cursor-pointer text-xs"  
                    onClick={() => {if (s.Status === "Open") {
                        handleStatusUpdate(s.id, "Closed")

                      } else if (s.Status === "Closed") {
                        handleStatusUpdate(s.id, "Open")

                      }}}
                  > Report </span>

                </td>
                <td className="py-3 px-4">{s.Description}</td>
                <td className="py-3 px-4">{s.roomNumber}</td>
                <td className="py-3 px-4">{s.date}</td>
                <td className="py-3 px-4">{s.Status}</td>
              </tr>
            ))}
          </tbody>
        </table>
        </section>
        )
      )
  }
}

export default StaffAllMaintenance