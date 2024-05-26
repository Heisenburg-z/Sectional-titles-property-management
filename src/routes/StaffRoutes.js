import { Route } from "react-router-dom";
import StaffAllMaintenance from "../Pages/Staff/StaffTabs/AllMaintenanceIssues/StaffAllMaintenance";
import StaffProfile from "../Pages/Staff/StaffTabs/Profile/StaffProfile";
import { RequireAuth } from "./RequireAuth";
import StaffDashboard from "../Pages/Staff/StaffTabs/Dashboard/StaffDashboard";

const staffRoutes = (
  <Route>
    <Route
      path="dashboard"
      element={
        <RequireAuth>
          <StaffDashboard />
        </RequireAuth>
      }
    />
    <Route
      path="allmaintenanceissues"
      element={
        <RequireAuth>
          <StaffAllMaintenance />
        </RequireAuth>
      }
    />
    <Route
      path="staffprofile"
      element={
        <RequireAuth>
          <StaffProfile />
        </RequireAuth>
      }
    />
  </Route>
);

export default staffRoutes;
