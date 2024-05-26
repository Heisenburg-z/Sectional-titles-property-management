import React, { useEffect, useState, useRef } from "react";
import { useAuth } from "../../../../utils/auth";
import "./ResidentsFines.css";
import { useReactToPrint } from "react-to-print";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { Oval } from "react-loader-spinner";

function ResidentsFines() {
  const navigate = useNavigate();
  const componentPDF = useRef();
  const id = useAuth().profileId;
  const location = useLocation();
  const inputLocation = location.pathname.split("/").slice(-1)[0];
  const [profile, setProfile] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`/api/property/resident/fines/${id}`)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setProfile(data);
        setLoading(false);
      });
  }, [id]);

  const generatePDF = useReactToPrint({
    content: () => componentPDF.current,
    documentTitle: "Your collection of fines",
    onAfterPrint: () => toast.success("Document saved successfully"),
  });

  switch (inputLocation) {
    default:
      return (
        <section className="main">
          <ToastContainer />
          {loading ? (
            <div className="flex justify-center items-center h-screen">
              <Oval
                height={100}
                width={100}
                color="#00a1f1"
                visible={true}
                ariaLabel="oval-loading"
                secondaryColor="#00a1f1"
                strokeWidth={2}
                strokeWidthSecondary={2}
              />
            </div>
          ) : profile.length > 0 ? (
            <section ref={componentPDF} style={{ width: "100%" }}>
              <table className="resident-table">
                <thead>
                  <tr>
                    <th>Reason for fine</th>
                    <th>Amount Due</th>
                    <th>Date Issued</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {profile.map((s, i) => (
                    <tr
                      key={i}
                      onClick={() => navigate("payment-upload")}
                      className="hover:bg-sky-400"
                    >
                      <td>{s.Type}</td>
                      <td>{s.Amount}</td>
                      <td>{s.DateIssued}</td>
                      <td>{s.Status}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </section>
          ) : (
            <div class="text-slate-600">No Fines To Display</div>
          )}
          <section>
            <button
              onClick={generatePDF}
              className="w-full px-3 py-2 bg-sky-500 text-white font-bold rounded-md cursor-pointer text-base transition duration-300 hover:bg-blue-600"
            >
              Export as PDF
            </button>
          </section>
        </section>
      );
    case "payment-upload":
      return <Outlet />;
  }
}

export default ResidentsFines;