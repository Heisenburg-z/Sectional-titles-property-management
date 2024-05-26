import React from "react";
import { Route } from "react-router-dom";
import { RequireAuth } from "./RequireAuth";
import ResidentsFines from "../Pages/Residents/ResidentTabs/Fines/ResidentsFines";
import ResidentsIssues from "../Pages/Residents/ResidentTabs/Issues/ResidentsIssues";
import ResidentsDashBoard from "../Pages/Residents/ResidentTabs/Dashboard/ResidentsDashboard";
import ResidentMaintenance from "../Pages/Residents/ResidentTabs/Reports/ResidentMaintenance";
import ResidentsReports from "../Pages/Residents/ResidentTabs/Reports/ResidentsReports";
import ResidentProfile from "../Pages/Residents/ResidentTabs/Profile/ResidentProfile";
import VistorsPage from "../Pages/Residents/ResidentTabs/Vistors/VistorsPage";
import UploadPaymentForm from "../Pages/Residents/ResidentTabs/Fines/UploadPaymentForm";

const residentRoutes = (
	<Route>
		<Route
			path="dashboard"
			element={
				<RequireAuth>
					<ResidentsDashBoard />
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
		>
			<Route
			path="maintenance"
			element={
				<RequireAuth>
					<ResidentMaintenance />
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
		>
			<Route
				path="payment-upload"
				element={
					<RequireAuth>
						<UploadPaymentForm />
					</RequireAuth>
				}
			/>
		</Route>

		</Route>
		
		<Route
			path="issues"
			element={
				<RequireAuth>
					<ResidentsIssues />
				</RequireAuth>
			}
		/>

		<Route
			path="vistors"
			element={
				<RequireAuth>
					<VistorsPage />
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
);

export default residentRoutes;
