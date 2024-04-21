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
import SignUpForm from "./Pages/SignUP/SignUpForm";
import ResidentsPage from "./Pages/Residents/ResidentsPage";
import { RequireAuth } from "./routes/RequireAuth";
import { AuthProvider } from "./utils/auth";




const router = createBrowserRouter(
	createRoutesFromElements(
		<Route>

			<Route path="/" element={<LandingPage />}>
				<Route path="" element={<Hero />} />
				<Route path="/about" element={<About />} />
				<Route path="/login" element={<LoginForm />} />
				<Route path="*" element={<Error404 />} />
			</Route>
			<Route path="/admin" element={<RequireAuth><AdminPage /></RequireAuth>} />
			<Route path="/signup" element={<RequireAuth><SignUpForm /></RequireAuth>} />
			<Route path="/resident" element={<RequireAuth><ResidentsPage /></RequireAuth>} />
			<Route path="/staff" element={<RequireAuth><StaffPage /></RequireAuth>} />

		</Route>
	)
);
function App() {
	return <AuthProvider><RouterProvider router={router} /></AuthProvider>;
}

export default App;
