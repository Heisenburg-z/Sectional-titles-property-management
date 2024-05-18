import React from "react";
import file from "./modelling.pdf";

function FinesUpdateForm() {
  return (
    <section className="container w-full h-full flex">
      <section className="container w-3/5 h-4/5 p-2 basis-1/2  bg-sky-100 mx-2">
        <iframe src={file} title="fines" width="100%" height="100%"></iframe>
      </section>
      <section className="basis-1/2 flex flex-col justify-center ">
        <h1 className="text-3xl text-start">Update Status</h1>
        <button className=" bg-sky-400 px-5 py-2 mx-2 rounded-md hover:bg-sky-500">
          Open
        </button>
        <button className="bg-sky-400 px-5 py-2 mx-2 rounded-md hover:bg-sky-500">
          Closed
        </button>
        <button className="bg-sky-400 px-5 py-2 mx-2 rounded-md hover:bg-sky-500">
          Pending
        </button>
      </section>
    </section>
  );
}

export default FinesUpdateForm;
