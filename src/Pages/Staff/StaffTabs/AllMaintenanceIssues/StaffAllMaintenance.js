import React, { useEffect, useState } from 'react'
import { useAuth } from "../../../../utils/auth";
import { Oval } from 'react-loader-spinner';

function StaffAllMaintenance() {
  const id = useAuth().profileId;
  const [isReLoading, setIsReLoading] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const [maintenance, setMaintenance] = useState([]);

  useEffect(() => {
      fetch(`/api/property/staff/maintenance/${id}`)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setMaintenance(data);
        setIsLoading(false);

      }).catch(() => {
        console.error("No maintenance to be fetched");
        setIsLoading(false);
      });
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

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Oval
          height={100}
          width={100}
          color="#00a1f1"
          wrapperStyle={{}}
          wrapperClass=""
          visible={true}
          ariaLabel='oval-loading'
          secondaryColor="#00a1f1"
          strokeWidth={2}
          strokeWidthSecondary={2}
        />
      </div>
    );
  }

  if(maintenance.length === 0){
    return (
        <h2 className="fetching-error"> No data available </h2>
    )
  } else {
    return (

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
              <tr className={`border-b ${s.Status === "Closed" ? 'bg-blue-200' : ''}`} key={i}>
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
  }
}

export default StaffAllMaintenance
