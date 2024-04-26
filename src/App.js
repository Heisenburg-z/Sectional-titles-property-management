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
// import SignUpForm from "./Pages/SignUP/SignUpForm";
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
							<DashBoard/>
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
			</Route>
			<Route
				path="/resident"
				element={
					<RequireAuth>
						<ResidentsPage />
					</RequireAuth>
				}
			/>
			<Route
				path="/staff"
				element={
					<RequireAuth>
						<StaffPage />
					</RequireAuth>
				}
			/>
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
