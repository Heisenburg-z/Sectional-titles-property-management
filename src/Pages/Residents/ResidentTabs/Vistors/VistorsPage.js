import React, { useState, useEffect } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Oval } from 'react-loader-spinner';
import auth from "../../../../utils/firebase";
import { onAuthStateChanged } from 'firebase/auth';

function VisitorsPage() {
  const [dropdownValue, setDropdownValue] = useState("");
  const [roomNo, setRoomNo] = useState("");
  const [date, setDate] = useState('');
  const [startDate, setStartDate] = useState('');
  const [leaveDate, setLeaveDate] = useState('');
  const [residentName, setResidentName] = useState("");
  const [residentEmail, setResidentEmail] = useState("");
  const [visitorEmail, setVisitorEmail] = useState("");
  const [visitorName, setVisitorName] = useState("");
  const [visitorSurname, setVisitorSurname] = useState("");
  const [view, setView] = useState('form'); // 'form' or 'table'
  const [visitors, setVisitors] = useState([]);
  const [loading, setLoading] = useState(false); // Loading state

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setResidentEmail(user.email);
      } else {
        setResidentEmail('');
      }
    });

    return () => unsubscribe();
  }, []);

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
      } finally {
        setLoading(false);
      }
    }
  };

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
          visitorName: visitorName,
          visitorSurname: visitorSurname,
          visitorEmail: visitorEmail,
          date: dropdownValue === 'Sleepover' ? `${startDate} to ${leaveDate}` : date,
        }),
      });

      if (response.ok) {
        toast.success('Visitor Successfully Signed In!');
        setDropdownValue('');
        setRoomNo('');
        setDate('');
        setStartDate('');
        setLeaveDate('');
        setResidentName('');
        setVisitorName('');
        setVisitorSurname('');
        setVisitorEmail('');
        fetchVisitors();
      }

    } catch (error) {
      toast.error("Error Signing In Visitor.");
      console.error("Error adding visitor:", error);
    }
  };

  const handleSignOut = async (visitorId) => {
    try {
      const response = await fetch(`/api/property/admin/resident/deletevisitor/${visitorId}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        toast.success('Visitor signed out successfully!');
        fetchVisitors();
      } else {
        fetchVisitors();
        toast.error('Failed to sign out visitor');
      }
    } catch (error) {
      fetchVisitors();
      toast.error('Error signing out visitor');
      console.error('Error signing out visitor:', error);
    }
  };

  const switchToTableView = () => setView('table');
  const switchToFormView = () => setView('form');

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
        } finally {
          setLoading(false);
        }
      }
    };

    if (view === 'table') {
      fetchVisitors();
    }
  }, [residentEmail, view]);

  return (
    <section className="pt-30p w-full flex flex-col items-center justify-center"> {/* Adjusted top padding */}
      <ToastContainer />
      <section className="mb-4 flex">
        <button 
          onClick={switchToFormView} 
          className={`px-4 py-2 ${view === 'form' ? 'bg-[#00a1f1] text-white font-bold rounded-md cursor-pointer text-base transition duration-300 hover:bg-[#0080c0db]' : 'bg-gray-300 text-black font-bold rounded-md cursor-pointer text-base transition duration-300 hover:bg-gray-400'}`}
        >
          Sign In Visitor
        </button>
        <button 
          data-testid="view-signed-in-visitors-button"
          onClick={switchToTableView} 
          className={`px-4 py-2 ml-2 ${view === 'table' ? 'bg-[#00a1f1] text-white font-bold rounded-md cursor-pointer text-base transition duration-300 hover:bg-[#0080c0db]' : 'bg-gray-300 text-black font-bold rounded-md cursor-pointer text-base transition duration-300 hover:bg-gray-400'}`}
        >
          View Signed In Visitors
        </button>
      </section>

      {view === 'form' && (
        <form className="bg-white shadow-md rounded-md p-6 w-full max-w-md flex flex-col items-center" onSubmit={handleOnSubmit}>
          <select 
            className="my-2 px-4 py-2 w-full text-black border border-gray-300 rounded-md bg-transparent outline-none transition duration-300 focus:border-blue-500 focus:outline-none" 
            onChange={(e) => setDropdownValue(e.target.value)} 
            value={dropdownValue} 
            required
          >
            <option value="">Type of Visitation</option>
            <option value="Day Visit">Day Visit</option>
            <option value="Sleepover">Sleepover</option>
          </select>
          {dropdownValue === 'Sleepover' ? (
            <>
              <label className="w-full text-center">Start Date:</label>
              <input
                type="date"
                className="my-2 px-4 py-3 w-full text-black border border-gray-300 rounded-md bg-transparent outline-none transition duration-300 focus:border-blue-500 focus:outline-none"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                required
              />
              <label className="w-full text-center">Leave Date:</label>
              <input
                type="date"
                className="my-2 px-4 py-3 w-full text-black border border-gray-300 rounded-md bg-transparent outline-none transition duration-300 focus:border-blue-500 focus:outline-none"
                value={leaveDate}
                onChange={(e) => setLeaveDate(e.target.value)}
                required
              />
            </>
          ) : (
            <>
              <label className="w-full text-center">Date:</label>
              <input
                type="date"
                className="my-2 px-4 py-3 w-full text-black border border-gray-300 rounded-md bg-transparent outline-none transition duration-300 focus:border-blue-500 focus:outline-none"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                required
              />
            </>
          )}
          <label className="w-full text-center" htmlFor="residents-name">Residents Name:</label>
          <input 
            type="text"
            className="my-2 px-4 py-3 w-full text-black border border-gray-300 rounded-md bg-transparent outline-none transition duration-300 focus:border-blue-500 focus:outline-none" 
            id="residents-name" 
            value={residentName} 
            onChange={(e) => setResidentName(e.target.value)} 
            required
          />
          <label className="w-full text-center" htmlFor="residents-email-address">Residents Email Address:</label>
          <input 
            type="text"
            className="my-2 px-4 py-3 w-full text-black border border-gray-300 rounded-md bg-transparent outline-none transition duration-300 focus:border-blue-500 focus:outline-none" 
            id="residents-email-address" 
            value={residentEmail} 
            onChange={(e) => setResidentEmail(e.target.value)} 
            required 
            readOnly
          />
          <label className="w-full text-center" htmlFor="room-number">Room Number:</label>
          <input 
            type="text"
            className="my-2 px-4 py-3 w-full text-black border border-gray-300 rounded-md bg-transparent outline-none transition duration-300 focus:border-blue-500 focus:outline-none" 
            id="room-number" 
            value={roomNo} 
            onChange={(e) => setRoomNo(e.target.value)} 
            required
          />
          <label className="w-full text-center" htmlFor="visitor-name">Visitor Name:</label>
          <input 
            type="text"
            className="my-2 px-4 py-3 w-full text-black border border-gray-300 rounded-md bg-transparent outline-none transition duration-300 focus:border-blue-500 focus:outline-none" 
            id="visitor-name" 
            value={visitorName} 
            onChange={(e) => setVisitorName(e.target.value)} 
            required
          />
          <label className="w-full text-center" htmlFor="visitor-surname">Visitor Surname:</label>
          <input 
            type="text"
            className="my-2 px-4 py-3 w-full text-black border border-gray-300 rounded-md bg-transparent outline-none transition duration-300 focus:border-blue-500 focus:outline-none" 
            id="visitor-surname" 
            value={visitorSurname} 
            onChange={(e) => setVisitorSurname(e.target.value)} 
            required
          />
          <label className="w-full text-center" htmlFor="visitor-email-address">Visitor Email Address:</label>
          <input 
            type="email"
            className="my-2 px-4 py-3 w-full text-black border border-gray-300 rounded-md bg-transparent outline-none transition duration-300 focus:border-blue-500 focus:outline-none" 
            id="visitor-email-address" 
            value={visitorEmail} 
            onChange={(e) => setVisitorEmail(e.target.value)} 
            required
          />
          <button 
            type="submit" 
            className="mt-4 px-6 py-2 bg-[#00a1f1] text-white font-bold rounded-md cursor-pointer text-lg transition duration-300 hover:bg-[#0080c0db]"
          >
            Submit
          </button>
        </form>
      )}

      {view === 'table' && (
        <section className="w-full flex flex-col items-center">
          {loading ? (
            <div className="flex justify-center items-center">
              <Oval
                height={80}
                width={80}
                color="#00a1f1"
                visible={true}
                ariaLabel="oval-loading"
                secondaryColor="#00a1f1"
                strokeWidth={2}
                strokeWidthSecondary={2}
              />
            </div>
          ) : (
            <>
              {visitors.length === 0 ? (
                <div className="text-gray-500 text-lg mt-4">No visitors signed in</div>
              ) : (
                <table className="resident-table">
                  <thead>
                    <tr>
                      <th className="px-4 py-2">Visitor Name</th>
                      <th className="px-4 py-2">Visitor Surname</th>
                      <th className="px-4 py-2">Visitor Email</th>
                      <th className="px-4 py-2">Sign In Date</th>
                      <th className="px-4 py-2">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {visitors.map((visitor) => (
                      <tr key={visitor.id}>
                        <td className="border px-4 py-2">{visitor.visitorName}</td>
                        <td className="border px-4 py-2">{visitor.visitorSurname}</td>
                        <td className="border px-4 py-2">{visitor.visitorEmail}</td>
                        <td className="border px-4 py-2">{visitor.date}</td>
                        <td className="border px-4 py-2">
                          <button
                            onClick={() => handleSignOut(visitor.id)}
                            className="px-4 py-2 bg-[#00a1f1] text-white font-bold rounded-md cursor-pointer text-sm transition duration-300 hover:bg-[#00a1f1]"
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
      )}
    </section>
  );
}

export default VisitorsPage;
