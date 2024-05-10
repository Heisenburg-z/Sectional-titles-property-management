import React, {  useState } from 'react'
import './ResidentsMaintenance.css';
function ResidentsMaintenance() {
  const [dropdownValue, setDropdownValue] = useState("");

  const handleDropdownChange = (e) => {
		setDropdownValue(e.target.value);
	};
  const [roomNo, setRoomNo] = useState("");
  const [date, setdate] = useState("");
  const [description, setDescription] = useState("");

  
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
        }),
      });
      if(response.ok){
        console.log("Request sent" + response);
        setDropdownValue("");
        setRoomNo("");
        setdate("");
        setDescription("")
      }
      
    } catch (error) {
      console.error("Error adding maintenance problem:", error);
    }

    
  };




  return (
    <section>
        <form action="" className='form' onSubmit={handleOnSubmit}>
            <select name="" id="" className='input-field' onChange={handleDropdownChange} value={dropdownValue}>
                <option value="">Type of Maintenance</option>
                <option value="Cleaning">Cleaning</option>
                <option value="Electricity">Electricity</option>
                <option value="Security">Security</option>
                <option value="Groundskeeping">Groundskeeping</option>
            </select>
            <label htmlFor="">Room Number:</label>
            <input type="text" className='input-field' id="" value={roomNo} onChange={(e)=> setRoomNo(e.target.value)}/>
            <input type="date" className='input-field' value={date} onChange={(e)=> setdate(e.target.value)}/>
            <label htmlFor="">Description</label>
            <textarea className='input-field' id="" rows="5" col="40" value={description} 
            onChange={(e)=>setDescription(e.target.value)}></textarea>
            <button type="submit">Submit</button>

        </form>
    </section>
  )
}

export default ResidentsMaintenance
