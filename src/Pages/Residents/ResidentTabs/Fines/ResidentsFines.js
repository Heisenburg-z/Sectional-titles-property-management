import React,{useEffect, useState, useRef} from "react";
import { useAuth } from "../../../../utils/auth";
import './ResidentsFines.css';
import { useReactToPrint } from "react-to-print";
function ResidentsFines() {

    const componentPDF = useRef();
    const id = useAuth().profileId;
    const [profile, setProfile] = useState([]);
    useEffect(() => {
        fetch(`/api/property/resident/fines/${id}`)
          .then((response) => {
            return response.json();
          })
          .then((data) => {
            console.log(data);
            setProfile(data);
          });
      }, [id]);

      const generatePDF = useReactToPrint({
        content: () => componentPDF.current,
        documentTitle: "Your collection of fines",
        onAfterPrint: ()=>alert("Document saved")
      });
  return (
    <section className="main">
      <section ref={componentPDF} style={{width: '100%'}}>
      <table className="resident-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>RoomNo</th>
                <th>Reason for fine</th>
                <th>Amount Due</th>
                <th>Date Issued</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
                {profile.map((s, i)=>(
                <tr key={i}>
                    <th>{s.Name}</th>
                    <th>{s.RoomNo}</th>
                    <th>{s.Type}</th>
                    <th>{s.Amount}</th>
                    <th>{s.DateIssued}</th>
                    <th>{s.Status}</th>
                </tr>
                ))}
                
            </tbody>
            </table>
            </section>
            <section>
              <button onClick={generatePDF} className="w-full px-3 py-2 bg-sky-500 text-white font-bold rounded-md cursor-pointer text-base transition duration-300 hover:bg-blue-600"  >Export as PDF</button>
            </section>
    </section>
  )
}

export default ResidentsFines
