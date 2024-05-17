import React from "react";
import { Route } from "react-router-dom";
import { RequireAuth } from "./RequireAuth";
import Staff from "../Pages/Admin/AdminTabs/Staff/Staff";
import StaffSignUpForm from "../Pages/Admin/SignUp/StaffSignUp";
import Fines from "../Pages/Admin/AdminTabs/Fines/Fines";
import Reports from "../Pages/Admin/AdminTabs/Reports/Reports";
import AdminSignUpForm from "../Pages/Admin/SignUp/AdminSignUp";
import Residents from "../Pages/Admin/AdminTabs/Resident/Residents";
import Profile from "../Pages/Admin/AdminTabs/Profile/Profile";
import ResidentSignUpForm from "../Pages/Admin/SignUp/ResidentSignUp";
import DashBoard from "../Pages/Admin/AdminTabs/Dashboard/DashBoard";
import Maintenance from "../Pages/Admin/AdminTabs/Maintenance/Maintenance";
import Admins from "../Pages/Admin/AdminTabs/Admin/Admins";

const adminRoutes = (
  <Route>
    <Route
      path="reports"
      element={
        <RequireAuth>
          <Reports />
        </RequireAuth>
      }
    />
    <Route
      path="fines"
      element={
        <RequireAuth>
          <Fines />
        </RequireAuth>
      }
    />
    <Route
      path="staff"
      element={
        <RequireAuth>
          <Staff />
        </RequireAuth>
      }
    >
      <Route
        path="staffsignupform"
        element={
          <RequireAuth>
            <StaffSignUpForm />
          </RequireAuth>
        }
      />
    </Route>
    <Route
      path="residents"
      element={
        <RequireAuth>
          <Residents />
        </RequireAuth>
      }
    >
      <Route
        path="signupform"
        element={
          <RequireAuth>
            <ResidentSignUpForm />
          </RequireAuth>
        }
      />
    </Route>
    <Route
      path="maintenance"
      element={
        <RequireAuth>
          <Maintenance />
        </RequireAuth>
      }
    />
    <Route
      path="dashboard"
      element={
        <RequireAuth>
          <DashBoard />
        </RequireAuth>
      }
    />
    <Route
      path="admins"
      element={
        <RequireAuth>
          <Admins />
        </RequireAuth>
      }
    >
      <Route
        path="signupform"
        element={
          <RequireAuth>
            <AdminSignUpForm />
          </RequireAuth>
        }
      />
    </Route>
    <Route
      path="profile"
      element={
        <RequireAuth>
          <Profile />
        </RequireAuth>
      }
    />
  </Route>
);

export default adminRoutes;
