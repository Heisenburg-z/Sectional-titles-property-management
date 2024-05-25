import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function FinesUpdateForm() {
  const { fineId } = useParams();
  const navigate = useNavigate();

  const response = (message) => {
    fetch(`/api/property/admin/resident/${fineId}/fine/update`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        Status: message,
      }),
    })
      .then((res) => {
        if (res.ok) {
          toast.success("Status updated successfully!");
          // Navigate back after a short delay to allow users to see the toast
          setTimeout(() => navigate(-1), 2000);
        } else {
          throw new Error("Failed to update status");
        }
      })
      .catch((error) => {
        console.error("Error:", error);
        toast.error("An error occurred while updating status");
      });
  };

  return (
    <>
      <ToastContainer />
      <section className="container w-full h-full flex mx-auto">
        <section className="basis-1/2 flex flex-col justify-center mx-auto">
          <h1 className="text-3xl text-center font-bold mb-10">
            Update Status
          </h1>
          <button
            onClick={() => response("Unpaid")}
            className="bg-sky-400 px-4 py-2 my-2 mx-auto w-2/5 rounded-md hover:bg-sky-500"
          >
            Open
          </button>
          <button
            onClick={() => response("Paid")}
            className="bg-sky-400 px-4 py-2 my-2 mx-auto w-2/5 rounded-md hover:bg-sky-500"
          >
            Closed
          </button>
          <button
            onClick={() => response("Pending...")}
            className="bg-sky-400 px-4 py-2 my-2 mx-auto w-2/5 rounded-md hover:bg-sky-500"
          >
            Pending
          </button>
        </section>
      </section>
    </>
  );
}

export default FinesUpdateForm;
