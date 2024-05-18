import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import Resident from "./Residents";

const AdminResidentDashBoard = () => {
  const location = useLocation();
  const inputLocation = location.pathname.split("/").slice(-1)[0];
  switch (inputLocation) {
    case "fines":
      return <Outlet />;
    case "new_fine":
      return <Outlet />;
    default:
      return <Resident />;
  }
};

export default AdminResidentDashBoard;
