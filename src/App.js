/* eslint-disable jsx-a11y/anchor-has-content */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import LandingPage from "./Pages/Home/LandingPage/LandingPage";
import {
	createBrowserRouter,
	Route,
	createRoutesFromElements,
	RouterProvider,
} from "react-router-dom";
import LoginForm from "./Pages/Login/LoginForm";
import About from "./Pages/About/About";
import AdminPage from "./Pages/Admin/AdminPage";
import StaffPage from "./Pages/Staff/StaffPage";
import Hero from "./Pages/Home/Hero/Hero";
import Error404 from "./Pages/Errors/Error404";
//import SignUpForm from "./Pages/SignUP/SignUpForm";
import ResidentsPage from "./Pages/Residents/ResidentsPage";
import { RequireAuth } from "./routes/RequireAuth";
import { AuthProvider } from "./utils/auth";
import Reports from "./Pages/Admin/AdminTabs/Reports/Reports";
import Fines from "./Pages/Admin/AdminTabs/Fines/Fines";
import Staff from "./Pages/Admin/AdminTabs/Staff/Staff";
import Residents from "./Pages/Admin/AdminTabs/Resident/Residents";
import Maintenance from "./Pages/Admin/AdminTabs/Maintenance/Maintenance";
import Admins from "./Pages/Admin/AdminTabs/Admin/Admins";
import DashBoard from "./Pages/Admin/AdminTabs/Dashboard/DashBoard";
import ResidentsDashBoard from "./Pages/Residents/ResidentTabs/Dashboard/ResidentsDashboard";
import ResidentsFileComplaint from "./Pages/Residents/ResidentTabs/FileComplaint/ResidentsFileComplaint";
import ResidentsIssues from "./Pages/Residents/ResidentTabs/Issues/ResidentsIssues";
import ResidentsFines from "./Pages/Residents/ResidentTabs/Fines/ResidentsFines";
import ResidentsMaintenance from "./Pages/Residents/ResidentTabs/Maintenance/ResidentsMaintenance";
import ResidentsReports from "./Pages/Residents/ResidentTabs/Reports/ResidentsReports";
import StaffAllMaintenance from "./Pages/Staff/StaffTabs/AllMaintenanceIssues/StaffAllMaintenance";
import AssignedMaintenance from "./Pages/Staff/StaffTabs/AssignMaintenanceIssues/AssignedMaintenance";
import StaffDashboard from "./Pages/Staff/StaffTabs/Dashboard/StaffDashboard";
import StaffReports from "./Pages/Staff/StaffTabs/Reports/StaffReports";
import Profile from "./Pages/Admin/AdminTabs/Profile/Profile";
import ResidentProfile from "./Pages/Residents/ResidentTabs/Profile/ResidentProfile";

const router = createBrowserRouter(
	createRoutesFromElements(
		<Route>
			<Route path="/" element={<LandingPage />}>
				<Route path="" element={<Hero />} />
				<Route path="/about" element={<About />} />
				<Route path="/login" element={<LoginForm />} />
				<Route path="*" element={<Error404 />} />
			</Route>
			<Route
				path="/admin"
				element={
					<RequireAuth>
						<AdminPage />
					</RequireAuth>
				}
			>
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
				/>
				<Route
					path="residents"
					element={
						<RequireAuth>
							<Residents />
						</RequireAuth>
					}
				/>
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
				/>
				<Route
					path="profile"
					element={
						<RequireAuth>
							<Profile />
						</RequireAuth>
					}
				/>
			</Route>
			<Route
				path="/resident"
				element={
					<RequireAuth>
						<ResidentsPage />
					</RequireAuth>
				}
			>
				<Route
					path="dashboard"
					element={
						<RequireAuth>
							<ResidentsDashBoard />
						</RequireAuth>
					}
				/>
				<Route
					path="filecomplaint"
					element={
						<RequireAuth>
							<ResidentsFileComplaint />
						</RequireAuth>
					}
				/>
				<Route
					path="issues"
					element={
						<RequireAuth>
							<ResidentsIssues />
						</RequireAuth>
					}
				/>
				<Route
					path="fines"
					element={
						<RequireAuth>
							<ResidentsFines />
						</RequireAuth>
					}
				/>
				<Route
					path="maintenance"
					element={
						<RequireAuth>
							<ResidentsMaintenance />
						</RequireAuth>
					}
				/>
				<Route
					path="reports"
					element={
						<RequireAuth>
							<ResidentsReports />
						</RequireAuth>
					}
				/>
				<Route
					path="profile"
					element={
						<RequireAuth>
							<ResidentProfile />
						</RequireAuth>
					}
				/>
			</Route>
			<Route
				path="/staff"
				element={
					<RequireAuth>
						<StaffPage />
					</RequireAuth>
				}
			>
				<Route
					path="staffdashboard"
					element={
						<RequireAuth>
							<StaffDashboard />
						</RequireAuth>
					}
				/>
				<Route
					path="assignedmaintenanceissues"
					element={
						<RequireAuth>
							<AssignedMaintenance />
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
					path="staffreports"
					element={
						<RequireAuth>
							<StaffReports />
						</RequireAuth>
					}
				/>
			</Route>
		</Route>
	)
);
function App() {
	return (
		<AuthProvider>
			<RouterProvider router={router} />
		</AuthProvider>
	);
}

export default App;
