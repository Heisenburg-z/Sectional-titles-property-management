import React, {  useState, useEffect } from 'react'
import {toast, ToastContainer} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { Oval } from 'react-loader-spinner';


function VistorsPage() {
  const [dropdownValue, setDropdownValue] = useState("");

  const handleDropdownChange = (e) => {
		setDropdownValue(e.target.value);
	};
  const [roomNo, setRoomNo] = useState("");
  const [date, setDate] = useState('');
  const [startDate, setStartDate] = useState('');
  const [leaveDate, setLeaveDate] = useState('');
  const [residentName, setResidentName] = useState("");
  const [residentEmail, setResidentEmail] = useState("");
  const [vistorEmail, setVistorEmail] = useState("");
  const [vistorName, setVistorName] = useState("");
  const [vistorSurname, setVistorSurname] = useState("");
  const [view, setView] = useState('form'); // 'form' or 'table'
  const [visitors, setVisitors] = useState([]);
  const [loading, setLoading] = useState(false); // Loading state

    // Fetch visitor data based on residentEmail

    const reloadVisitorsTable = async () => {
      if (residentEmail) {
        setLoading(true); // Set loading to true before fetching data
        try {
          const response = await fetch(`/api/property/resident/allvistors?residentEmail=${residentEmail}`);
          if (response.ok) {
            const data = await response.json();
            setVisitors(data);
          } else {
            toast.error('Failed to fetch visitors');
          }
        } catch (error) {
          toast.error('Error fetching visitors');
          console.error('Error fetching visitors:', error);
        }
        finally {
          setLoading(false);
        }
      }
    };

    useEffect(() => {
      const fetchVisitors = async () => {
        if (residentEmail) {
          setLoading(true); // Set loading to true before fetching data
          try {
            const response = await fetch(`/api/property/resident/allvistors?residentEmail=${residentEmail}`);
            if (response.ok) {
              const data = await response.json();
              setVisitors(data);
            } else {
              toast.error('Failed to fetch visitors');
            }
          } catch (error) {
            toast.error('Error fetching visitors');
            console.error('Error fetching visitors:', error);
          }
          finally {
            setLoading(false);
          }
        }
      };
  
      if (view === 'table') {
        fetchVisitors();
      }
    }, [residentEmail, view]);
  
  const handleOnSubmit = async (e) => {
    e.preventDefault();

    if (dropdownValue === '') {
      toast.error('Please select a visitation type');
      return;
    }

    try {
      const response = await fetch(`/api/property/resident/vistors`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          visitationType: dropdownValue,
          roomNumber: roomNo,
          residentName: residentName,
          residentEmail: residentEmail,
          vistorName: vistorName,
          vistorSurname: vistorSurname,
          vistorEmail: vistorEmail,
          date:  dropdownValue === 'Sleepover' ? `${startDate} to ${leaveDate}` : date,
        }),
      });
      if(response.ok){
        console.log("Request sent" + response);
        toast.success('Vistor Successfully Signed In!');
        setDropdownValue('');
        setRoomNo('');
        setDate('');
        setStartDate('');
        setLeaveDate('');
        setResidentName('');
        setResidentEmail('');
         // Reload visitors after adding a new visitor
         reloadVisitorsTable();
      }
      
    } catch (error) {
      toast.error("Error Signing In Vistor.");
      console.error("Error adding maintenance problem:", error);
    }
    
    
  };

  const switchToTableView = () => setView('table');
  const switchToFormView = () => setView('form');

  return (
    <section className="pt-6 flex  flex-col items-center justify-center ">
        <ToastContainer /> 
        <section className="mb-4 flex">
        <button 
          onClick={switchToFormView} 
          className={`px-4 py-2 ${view === 'form' ? 'bg-[#00a1f1] text-white font-bold rounded-md cursor-pointer text-base transition duration-300 hover:bg-[#0080c0db]' : 'bg-gray-300 text-black font-bold rounded-md cursor-pointer text-base transition duration-300 hover:bg-gray-400'}`}
        >
          Sign In Vistor
        </button>
        <button 
          onClick={switchToTableView} 
          className={`px-4 py-2 ml-2 ${view === 'table' ? 'bg-[#00a1f1] text-white font-bold rounded-md cursor-pointer text-base transition duration-300 hover:bg-[#0080c0db]' : 'bg-gray-300 text-black font-bold rounded-md cursor-pointer text-base transition duration-300 hover:bg-gray-400'}`}
        >
          View Signed In Vistors
        </button>
      </section>
        {/* Render form or table based on view state */}
        { view === 'form' && (
          <form action="" className="bg-white shadow-md rounded-md p-8 w-2/5 flex flex-col items-center" onSubmit={handleOnSubmit}>
          <select name="" id="" 
          className="my-2 px-4 py-2 w-3/4 text-black border border-black rounded-md bg-transparent outline-none transition duration-300 focus:border-blue-500 focus:outline-none" 
          onChange={handleDropdownChange} value={dropdownValue} required>
              <option value="">Type of Visitation</option>
              <option value="Day Visit">Day Visit</option>
              <option value="Sleepover">Sleepover</option>
          </select>
          {dropdownValue === 'Sleepover' ? (
        <>
          <label>Start Date:</label>
          <input
            type="date"
            className="my-2 px-4 py-3 w-full text-black border border-black rounded-md bg-transparent outline-none transition duration-300 focus:border-blue-500 focus:outline-none"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            required
          />
          <label>Leave Date:</label>
          <input
            type="date"
            className="my-2 px-4 py-3 w-full text-black border border-black rounded-md bg-transparent outline-none transition duration-300 focus:border-blue-500 focus:outline-none"
            value={leaveDate}
            onChange={(e) => setLeaveDate(e.target.value)}
            required
          />
        </>
      ) : (
        <>
          <label>Date:</label>
          <input
            type="date"
            className="my-2 px-4 py-3 w-full text-black border border-black rounded-md bg-transparent outline-none transition duration-300 focus:border-blue-500 focus:outline-none"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
          />
        </>
      )}
          <label htmlFor="">Residents Name:</label>
          <input type="text"
              className="my-2 px-4 py-3 w-full text-black border border-black rounded-md bg-transparent outline-none transition duration-300 focus:border-blue-500 focus:outline-none" 
              id="tt" value={residentName} onChange={(e)=> setResidentName(e.target.value)} required/>
          <label htmlFor="">Residents Email Address:</label>
          <input type="text"
              className="my-2 px-4 py-3 w-full text-black border border-black rounded-md bg-transparent outline-none transition duration-300 focus:border-blue-500 focus:outline-none" 
              id="tt" value={residentEmail} onChange={(e)=> setResidentEmail(e.target.value)} required readOnly/>
          <label htmlFor="">Room Number:</label>
          <input type="text"
              className="my-2 px-4 py-3 w-full text-black border border-black rounded-md bg-transparent outline-none transition duration-300 focus:border-blue-500 focus:outline-none" 
              id="tt" value={roomNo} onChange={(e)=> setRoomNo(e.target.value)} required/>
          <label htmlFor="">Vistor Name:</label>
          <input type="text"
              className="my-2 px-4 py-3 w-full text-black border border-black rounded-md bg-transparent outline-none transition duration-300 focus:border-blue-500 focus:outline-none" 
              id="tt" value={vistorName} onChange={(e)=> setVistorName(e.target.value)} required/>
          <label htmlFor="">Vistor Surname:</label>
          <input type="text"
              className="my-2 px-4 py-3 w-full text-black border border-black rounded-md bg-transparent outline-none transition duration-300 focus:border-blue-500 focus:outline-none" 
              id="tt" value={vistorSurname} onChange={(e)=> setVistorSurname(e.target.value)} required/>
          <label htmlFor="">Vistor Email Address:</label>
          <input type="text"
              className="my-2 px-4 py-3 w-full text-black border border-black rounded-md bg-transparent outline-none transition duration-300 focus:border-blue-500 focus:outline-none" 
              id="tt" value={vistorEmail} onChange={(e)=> setVistorEmail(e.target.value)} required/>
          <button type="submit" 
              className="w-full px-4 py-3 bg-blue-500 text-white font-bold rounded-md cursor-pointer text-base transition duration-300 hover:bg-blue-600"  
          >Submit</button>
        </form>
        ) }
        {view === 'table' && (
        <>
          {loading ? (
            <section className="flex justify-center items-center h-full">
              <Oval
                height={50}
                width={50}
                color="#00a1f1"
                visible={true}
                ariaLabel="oval-loading"
                secondaryColor="#00a1f1"
                strokeWidth={2}
                strokeWidthSecondary={2}
              />
            </section>
          ) : (
            <table className="resident-table">
              <thead className="bg-[#00a1f1]">
                <tr>
                  <th className="text-white text-center">Name</th>
                  <th className="text-white text-center">Surname</th>
                  <th className="text-white text-center">Email</th>
                  <th className="text-white text-center">Room Visiting</th>
                  <th className="text-white text-center">Visitation Type</th>
                  <th className="text-white text-center">Visitation Period</th>
                  <th className="text-white text-center">Sign Out Vistor</th>
                </tr>
              </thead>
              <tbody>
                {visitors.map((visitor) => (
                  <tr key={visitor.id} className="text-center">
                    <td className="text-center">{visitor.vistorName}</td>
                    <td className="text-center">{visitor.vistorSurname}</td>
                    <td className="text-center">{visitor.vistorEmail}</td>
                    <td className="text-center">{visitor.roomNumber}</td>
                    <td className="text-center">{visitor.visitationType}</td>
                    <td className="text-center">{visitor.date}</td>
                    <td className="text-center">
                      <button
                        className="px-1 py-1 bg-[#00a1f1] text-white font-bold rounded-md cursor-pointer text-base transition duration-300 hover:bg-[#008cd1]"
                      >
                        Sign Out
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </>
      )}
    </section>
  )
}

export default VistorsPage