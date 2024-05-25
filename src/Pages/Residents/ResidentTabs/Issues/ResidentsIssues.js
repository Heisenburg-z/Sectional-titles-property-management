import React, {  useState } from 'react'
import { useAuth } from "../../../../utils/auth";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
function ResidentsIssues() {
  const [dropdownValue, setDropdownValue] = useState("");

  const handleDropdownChange = (e) => {
		setDropdownValue(e.target.value);
	};
  const [roomNo, setRoomNo] = useState("");
  const [date, setdate] = useState("");
  const [description, setDescription] = useState("");
  const id = useAuth().profileId;
  
  const handleOnSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`/api/property/resident/maintenance`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          maintenanceType: dropdownValue,
          roomNumber: roomNo,
          date: date,
          Description: description,
          Status: "Open",
          userId: id,
        }),
      });
      if(response.ok){
        console.log("Request sent" + response);
        setDropdownValue("");
        setRoomNo("");
        setdate("");
        setDescription("");

         // Show success toast notification
        toast.success("Maintenance log submitted successfully!");
      }
      
    } catch (error) {
      console.error("Error adding maintenance problem:", error);
      toast.error("Error adding maintenance problem.");
    }

    
  };
  return (
    <section className="pt-2 w-full flex items-center justify-center">
         <ToastContainer />  
        <form action="" className="bg-white shadow-md rounded-md p-8 w-2/5 flex flex-col items-center" onSubmit={handleOnSubmit}>
            <select name="" id="" data-testid="maintenance-dropdown" 
            className="my-2 px-4 py-2 w-3/4 text-black border border-black rounded-md bg-transparent outline-none transition duration-300 focus:border-blue-500 focus:outline-none" 
            onChange={handleDropdownChange} value={dropdownValue}>
                <option value="">Type of Maintenance</option>
                <option value="Cleaning">Cleaning</option>
                <option value="Electricity">Electricity</option>
                <option value="Security">Security</option>
                <option value="Groundskeeping">Groundskeeping</option>
            </select>
            <label htmlFor="room-number">Room Number:</label>
            <input type="text"
                className="my-2 px-4 py-3 w-full text-black border border-black rounded-md bg-transparent outline-none transition duration-300 focus:border-blue-500 focus:outline-none" 
                id="room-number" value={roomNo} onChange={(e)=> setRoomNo(e.target.value)}/>
            <input type="date" 
                className="my-2 px-4 py-3 w-full text-black border border-black rounded-md bg-transparent outline-none transition duration-300 focus:border-blue-500 focus:outline-none"
                value={date} onChange={(e)=> setdate(e.target.value)}/>
            <label htmlFor="description">Description</label>
            <textarea 
                className="my-2 px-4 py-3 w-full text-black border border-black rounded-md bg-transparent outline-none transition duration-300 focus:border-blue-500 focus:outline-none"
                id="description" rows="5" col="40" value={description} 
            onChange={(e)=>setDescription(e.target.value)}></textarea>
            <button type="submit" 
                className="w-full px-4 py-3 bg-blue-500 text-white font-bold rounded-md cursor-pointer text-base transition duration-300 hover:bg-blue-600"  
            >Submit</button>
        </form>
    </section>
  )
}

export default ResidentsIssues
