import React, {  useState } from 'react'
import {toast, ToastContainer} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

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

  
  const handleOnSubmit = async (e) => {
    e.preventDefault();
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
      }
      
    } catch (error) {
      toast.error("Error Signing In Vistor.");
      console.error("Error adding maintenance problem:", error);
    }

    
  };
  return (
    <section className="pt-6 flex items-center justify-center">
        <ToastContainer />  
        <form action="" className="bg-white shadow-md rounded-md p-8 w-2/5 flex flex-col items-center" onSubmit={handleOnSubmit}>
            <select name="" id="" 
            className="my-2 px-4 py-2 w-3/4 text-black border border-black rounded-md bg-transparent outline-none transition duration-300 focus:border-blue-500 focus:outline-none" 
            onChange={handleDropdownChange} value={dropdownValue}>
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
            />
            <label>Leave Date:</label>
            <input
              type="date"
              className="my-2 px-4 py-3 w-full text-black border border-black rounded-md bg-transparent outline-none transition duration-300 focus:border-blue-500 focus:outline-none"
              value={leaveDate}
              onChange={(e) => setLeaveDate(e.target.value)}
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
            />
          </>
        )}
            <label htmlFor="">Residents Name:</label>
            <input type="text"
                className="my-2 px-4 py-3 w-full text-black border border-black rounded-md bg-transparent outline-none transition duration-300 focus:border-blue-500 focus:outline-none" 
                id="tt" value={residentName} onChange={(e)=> setResidentName(e.target.value)}/>
            <label htmlFor="">Residents Email Address:</label>
            <input type="text"
                className="my-2 px-4 py-3 w-full text-black border border-black rounded-md bg-transparent outline-none transition duration-300 focus:border-blue-500 focus:outline-none" 
                id="tt" value={residentEmail} onChange={(e)=> setResidentEmail(e.target.value)}/>
            <label htmlFor="">Room Number:</label>
            <input type="text"
                className="my-2 px-4 py-3 w-full text-black border border-black rounded-md bg-transparent outline-none transition duration-300 focus:border-blue-500 focus:outline-none" 
                id="tt" value={roomNo} onChange={(e)=> setRoomNo(e.target.value)}/>
            <label htmlFor="">Vistor Name:</label>
            <input type="text"
                className="my-2 px-4 py-3 w-full text-black border border-black rounded-md bg-transparent outline-none transition duration-300 focus:border-blue-500 focus:outline-none" 
                id="tt" value={vistorName} onChange={(e)=> setVistorName(e.target.value)}/>
            <label htmlFor="">Vistor Surname:</label>
            <input type="text"
                className="my-2 px-4 py-3 w-full text-black border border-black rounded-md bg-transparent outline-none transition duration-300 focus:border-blue-500 focus:outline-none" 
                id="tt" value={vistorSurname} onChange={(e)=> setVistorSurname(e.target.value)}/>
            <label htmlFor="">Vistor Email Address:</label>
            <input type="text"
                className="my-2 px-4 py-3 w-full text-black border border-black rounded-md bg-transparent outline-none transition duration-300 focus:border-blue-500 focus:outline-none" 
                id="tt" value={vistorEmail} onChange={(e)=> setVistorEmail(e.target.value)}/>
            <button type="submit" 
                className="w-full px-4 py-3 bg-blue-500 text-white font-bold rounded-md cursor-pointer text-base transition duration-300 hover:bg-blue-600"  
            >Submit</button>
        </form>
    </section>
  )
}

export default VistorsPage