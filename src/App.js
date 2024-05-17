import React from "react";
import {
  createBrowserRouter,
  Route,
  createRoutesFromElements,
  RouterProvider,
} from "react-router-dom";
import AdminPage from "./Pages/Admin/AdminPage";
import StaffPage from "./Pages/Staff/StaffPage";
import ResidentsPage from "./Pages/Residents/ResidentsPage";
import { RequireAuth } from "./routes/RequireAuth";
import { AuthProvider } from "./utils/auth";
import adminRoutes from "./routes/AdminRoutes";
import residentRoutes from "./routes/ResidentRoutes";
import staffRoutes from "./routes/StaffRoutes";
import baseRoute from "./routes/BaseRoutes";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      {baseRoute}
      <Route
        path="/admin"
        element={
          <RequireAuth>
            <AdminPage />
          </RequireAuth>
        }
      >
        {adminRoutes}
      </Route>
      <Route
        path="/resident"
        element={
          <RequireAuth>
            <ResidentsPage />
          </RequireAuth>
        }
      >
        {residentRoutes}
      </Route>
      <Route
        path="/staff"
        element={
          <RequireAuth>
            <StaffPage />
          </RequireAuth>
        }
      >
        {staffRoutes}
      </Route>
    </Route>,
  ),
);
function App() {
  return (
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  );
}

export default App;
