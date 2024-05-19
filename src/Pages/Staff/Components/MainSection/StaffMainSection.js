import React from "react";
import "./StaffMainSection.css";
function StaffMain({ className, children }) {
  return <main className={className} data-testid="staff-main">{children}</main>;
}

export default StaffMain;