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

const router = createBrowserRouter(
	createRoutesFromElements(
		<Route>
			<Route path="/" element={<LandingPage />}>
				<Route path="" element={<Hero />} />
				<Route path="/about" element={<About />} />
				<Route path="/login" element={<LoginForm />} />
				<Route path="*" element={<Error404 />} />
			</Route>
			<Route path="/admin" element={<AdminPage />}/>
			<Route path="/signup" element={<SignUpForm />} />
			<Route path="/resident" element={<ResidentsPage />} />
			<Route path="/staff" element={<StaffPage />} />
		</Route>
	)
);
function App() {
	return <RouterProvider router={router} />;
}

export default App;
