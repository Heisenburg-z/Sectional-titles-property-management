import React from "react";
import file from "./modelling.pdf";
import { useParams } from "react-router-dom";

function FinesUpdateForm() {
  const { fineId } = useParams();
  const response = (message) => {
    fetch(
      `http://localhost:7071/api/property/admin/resident/${fineId}/fine/update`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          Status: message,
        }),
      },
    );
  };
  return (
    <section className="container w-full h-full flex">
      <section className="container w-3/5 h-4/5 p-2 basis-1/2  bg-sky-100 mx-2">
        <iframe src={file} title="fines" width="100%" height="100%"></iframe>
      </section>
      <section className="basis-1/2 flex flex-col justify-center ">
        <h1 className="text-3xl text-start">Update Status</h1>
        <button
          onClick={() => response("Updaid")}
          className=" bg-sky-400 px-5 py-2 my-2 mx-2 w-2/5 rounded-md hover:bg-sky-500"
        >
          Open
        </button>
        <button
          onClick={() => response("Paid")}
          className="bg-sky-400 px-5 py-2 my-2  mx-2 w-2/5 rounded-md hover:bg-sky-500"
        >
          Closed
        </button>
        <button
          onClick={() => response("Pending...")}
          className="bg-sky-400 px-5 py-2 mx-2 my-2 w-2/5  rounded-md hover:bg-sky-500"
        >
          Pending
        </button>
      </section>
    </section>
  );
}

export default FinesUpdateForm;
