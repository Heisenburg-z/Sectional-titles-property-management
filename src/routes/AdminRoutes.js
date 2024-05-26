import React from "react";
import { Route } from "react-router-dom";
import Staff from "../Pages/Admin/AdminTabs/Staff/Staff";
import StaffSignUpForm from "../Pages/Admin/SignUp/StaffSignUp";
import Fines from "../Pages/Admin/AdminTabs/Fines/Fines";
import AdminSignUpForm from "../Pages/Admin/SignUp/AdminSignUp";
import Profile from "../Pages/Admin/AdminTabs/Profile/Profile";
import ResidentSignUpForm from "../Pages/Admin/SignUp/ResidentSignUp";
import DashBoard from "../Pages/Admin/AdminTabs/Dashboard/DashBoard";
import Maintenance from "../Pages/Admin/AdminTabs/Maintenance/Maintenance";
import Admins from "../Pages/Admin/AdminTabs/Admin/Admins";
import FinesUpdateForm from "../Pages/Admin/AdminTabs/Fines/FinesUpdateForm";
import AdminResidentDashBoard from "../Pages/Admin/AdminTabs/Resident/AdminResidentDashBoard";
import { RequireAuth } from "./RequireAuth";
import ResidentSpecificFines from "../Pages/Admin/AdminTabs/Resident/ResidentSpecificFines";
import NewFine from "../Pages/Admin/AdminTabs/Fines/NewFine";

const adminRoutes = (
  <Route>
    <Route
      path="fines"
      element={
        <RequireAuth>
          <Fines />
        </RequireAuth>
      }
    >
      <Route
        path=":fineId/update"
        element={
          <RequireAuth>
            <FinesUpdateForm />
          </RequireAuth>
        }
      />
      <Route
        path="update"
        element={
          <RequireAuth>
            <FinesUpdateForm />
          </RequireAuth>
        }
      />
    </Route>
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
          <AdminResidentDashBoard />
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
      <Route
        path=":residentId/fines"
        element={
          <RequireAuth>
            <ResidentSpecificFines />
          </RequireAuth>
        }
      />
      <Route
        path=":residentId/fines/:fineId/update"
        element={
          <RequireAuth>
            <FinesUpdateForm />
          </RequireAuth>
        }
      />
      <Route
        path=":residentId/fines/new_fine"
        element={
          <RequireAuth>
            <NewFine />
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
