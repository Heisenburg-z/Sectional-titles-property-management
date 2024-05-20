import React, { useState } from "react";
import { Form, useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function NewFine() {
  const [reason, setReason] = useState("");
  const [amount, setAmount] = useState(0);
  const [fineType, setFineType] = useState("");
  const [dueDate, setDueDate] = useState("");
  const { residentId } = useParams();

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `/api/property/admin/resident/${residentId}/fine/newfine`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            Type: fineType,
            Amount: amount,
            DateIssued: new Date().toISOString(),
            DueDate: dueDate,
            Reason: reason,
            Status: "Unpaid",
            userId: residentId,
          }),
        },
      );
      if (response.ok) {
        setDueDate("");
        setAmount("");
        setFineType("");
        setReason("");
        toast.success("Fine created successfully!");
      } else {
        throw new Error("Failed to create fine");
      }
    } catch (error) {
      console.error("Error adding fine:", error);
      toast.error("An error occurred while creating the fine");
    }
  };

  return (
    <>
      <ToastContainer />
      <section className="container flex flex-col text-center">
        <h1>Add New Fine</h1>
        <Form className="flex flex-col align-center border rounded border-white w-3/5 mx-auto">
          <select
            className="my-2 px-4 py-2 w-2/5 text-black mx-auto border border-sky-500 rounded-md bg-transparent outline-none transition duration-300 focus:border-blue-500 focus:outline-none"
            onChange={(e) => setFineType(e.target.value)}
            value={fineType}
          >
            <option value="">Type of Fine</option>
            <option value="Late Rent">Late Rent</option>
            <option value="Overdue Fees">Overdue Fees</option>
            <option value="Maintenance Violation">Maintenance Violation</option>
            <option value="Lease Violation">Lease Violation</option>
          </select>
          <textarea
            placeholder="Reason"
            className="my-2 block py-5 px-2 w-2/5 mx-auto text-sm border-sky-500 text-gray-900 bg-gray-50 rounded-lg border focus:ring-blue-500 focus:border-blue-500"
            onChange={(e) => setReason(e.target.value)}
            value={reason}
          />
          <input
            type="number"
            placeholder="Amount"
            className="bg-gray-50 w-2/5 h-full mx-auto rounded border border-sky-500 p-1 my-2"
            onChange={(e) => setAmount(e.target.value)}
            value={amount}
          />
          <input
            type="date"
            placeholder="Due Date"
            className="w-2/5 h-full border bg-gray-50 mx-auto rounded p-1 my-2 border-sky-500"
            onChange={(e) => setDueDate(e.target.value)}
            value={dueDate}
          />
          <button
            onClick={handleOnSubmit}
            className="bg-sky-400 hover:bg-sky-500 text-gray-50 w-1/5 mx-auto p-2 rounded my-2"
          >
            Create
          </button>
        </Form>
      </section>
    </>
  );
}

export default NewFine;

//TODO: Fields required
//Fine Type
//Room Number
//Reason
// Name
// surname
// ID Number
// 2024-05-19 06:24:00
// Due Date
// Status
// Proof of Payment
