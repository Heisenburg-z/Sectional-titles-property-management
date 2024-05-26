
import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import ResidentsFines from "../ResidentsFines";
import { BrowserRouter, MemoryRouter } from "react-router-dom";
//import { useAuth } from "../../../../utils/auth";
import { ToastContainer } from "react-toastify";
import useAuth from "../../../../utils/auth";

// Mock useAuth hook
jest.mock("../../../../utils/auth.js", () => ({
  useAuth: () => ({
    profileId: "123",
  }),
}));
jest.mock("../ResidentsFines.css", () => ({}));

global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve([{ Name: "Weezy", RoomNo: "101", Type: "Noise", Amount: "50", DateIssued: "2022-01-01", Status: "Unpaid" }]),
  })
);

jest.mock("react-to-print", () => ({
  useReactToPrint: jest.fn().mockImplementation(() => jest.fn()),
}));

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => jest.fn(),
  useLocation: () => ({
    pathname: "/path/to/location",
  }),
}));

describe("ResidentsFines Component", () => {
  test("renders without crashing", () => {
    render(
      <BrowserRouter>
        <ResidentsFines />
      </BrowserRouter>
    );
  });

  test("displays loading spinner while fetching data", async () => {
    render(
      <BrowserRouter>
        <ResidentsFines />
      </BrowserRouter>
    );
    expect(screen.getByLabelText("oval-loading")).toBeInTheDocument();
    await waitFor(() => expect(screen.queryByLabelText("oval-loading")).not.toBeInTheDocument());
  });

  test("renders fines table with correct data", async () => {
    render(
      <BrowserRouter>
        <ResidentsFines />
      </BrowserRouter>
    );
    await waitFor(() => expect(screen.getByText("John Doe")).toBeInTheDocument());
    expect(screen.getByText("101")).toBeInTheDocument();
    expect(screen.getByText("Noise")).toBeInTheDocument();
    expect(screen.getByText("$50")).toBeInTheDocument();
    expect(screen.getByText("2022-01-01")).toBeInTheDocument();
    expect(screen.getByText("Unpaid")).toBeInTheDocument();
  });

  test("shows 'No Fines To Display' when there are no fines", async () => {
    global.fetch.mockImplementationOnce(() =>
      Promise.resolve({
        json: () => Promise.resolve([]),
      })
    );

    render(
      <BrowserRouter>
        <ResidentsFines />
      </BrowserRouter>
    );

    await waitFor(() => expect(screen.getByText("No Fines To Display")).toBeInTheDocument());
  });

  test("renders 'Export as PDF' button", () => {
    render(
      <BrowserRouter>
        <ResidentsFines />
      </BrowserRouter>
    );

    expect(screen.getByText("Export as PDF")).toBeInTheDocument();
  });

//   test("calls PDF generation function when 'Export as PDF' button is clicked", async () => {
//     const generatePDF = jest.fn();
//     jest.mock("react-to-print", () => ({
//       useReactToPrint: () => generatePDF,
//     }));

//     render(
//       <BrowserRouter>
//         <ResidentsFines />
//       </BrowserRouter>
//     );

//     fireEvent.click(screen.getByText("Export as PDF"));
//     expect(generatePDF).toHaveBeenCalled();
//   });

  test("shows toast notification after PDF generation", async () => {
    render(
      <BrowserRouter>
        <ResidentsFines />
      </BrowserRouter>
    );

    fireEvent.click(screen.getByText("Export as PDF"));
    await waitFor(() => expect(screen.getByText("Document saved successfully")).toBeInTheDocument());
  });

//   test("navigates to 'payment-upload' route when a fine row is clicked", async () => {
//     const navigate = jest.fn();
//     jest.mock("react-router-dom", () => ({
//       ...jest.requireActual("react-router-dom"),
//       useNavigate: () => navigate,
//     }));

//     render(
//       <MemoryRouter initialEntries={["/path/to/location"]}>
//         <ResidentsFines />
//       </MemoryRouter>
//     );

//     await waitFor(() => expect(screen.getByText("John Doe")).toBeInTheDocument());
//     fireEvent.click(screen.getByText("John Doe"));
//     expect(navigate).toHaveBeenCalledWith("payment-upload");
//   });
});
