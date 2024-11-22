import React, { useEffect } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import Dashboard from "../pages/Dashboard";
import List from "../pages/List";
import View from "../pages/View";
import Roles from "../pages/Roles";
import Permissions from "../pages/Permissions";
import Layout from "../shared/Layout";
import ProtectedRoute from "../components/ProtectedRoute";
import Login from "../pages/Login";
import TaskManagement from "../pages/TaskManagement";
import { toast } from "sonner";
import Cookies from "js-cookie";
import { useSelector } from "react-redux";
import axios from "axios";
import { isValidToken } from "../utils/functions";

function AppRouter({ setIsDarkMode }) {
	const navigate = useNavigate();
	const { user } = useSelector((state) => state.user);
	useEffect(() => {
		const refreshToken = async () => {
			try {
				const refreshToken = user.refreshToken;
				const accessToken = Cookies.get("accessToken");
				const host = "http://localhost:6010/api/v1/users/refresh-token";

				if (!refreshToken && !accessToken) {
					toast.error("Authentication token not found");
					Cookies.remove("accessToken");
					navigate("/login");
					return;
				}

				const data = {
					refreshToken: refreshToken,
				};

				const response = await axios.post(host, data, {
					withCredentials: true,
				});
				if (response.data.success) {
					Cookies.set("accessToken", response.data.data.accessToken);
					console.log("Set access token");
				}
			} catch (error) {
				console.error("Error:", error);
				navigate("/login");
			}
		};

		const tokenCheckInterval = async () => {
			const accessToken = Cookies.get("accessToken");
			const refToken = user.refreshToken;

			if (!refToken || !accessToken) {
				clearInterval(tokenCheckInterval);
				navigate("/login");
				return;
			}
			const isRefreshTokenValid = isValidToken(refToken);
			console.log("Refresh token valid check: ", isRefreshTokenValid);
			if (!isRefreshTokenValid) {
				navigate("/login");
				return;
			}

			const isAccessTokenValid = isValidToken(accessToken);
			console.log("Access token valid check: ", isAccessTokenValid);
			if (!isAccessTokenValid) {
				await refreshToken();
			}
		};

		return () => {
			clearInterval(tokenCheckInterval);
		};
	}, [navigate, user.refreshToken]);

	return (
		<Routes>
			<Route path="/login" element={<Login />} /> {/* Public route */}
			<Route path="/" element={<Layout setIsDarkMode={setIsDarkMode} />}>
				{/* Protected Routes */}
				<Route element={<ProtectedRoute />}>
					<Route index element={<Dashboard />} />
					<Route path="tasks" element={<TaskManagement />} />

					{/* User Routes */}
					<Route path="user">
						<Route path="list" element={<List />} />
						<Route path="view" element={<View />} />
					</Route>

					{/* Roles and Permissions Routes */}
					<Route path="roles-permissions">
						<Route path="roles" element={<Roles />} />
						<Route path="permissions" element={<Permissions />} />
					</Route>
				</Route>
			</Route>
		</Routes>
	);
}

export default AppRouter;
