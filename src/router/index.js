import React from "react";
import { Route, Routes } from "react-router-dom";
import Dashboard from "../pages/Dashboard";
import List from "../pages/List";
import View from "../pages/View";
import Roles from "../pages/Roles";
import Permissions from "../pages/Permissions";
import Layout from "../shared/Layout";
import ProtectedRoute from "../components/ProtectedRoute";
import Login from "../pages/Login";
import TaskManagement from "../pages/TaskManagement";

function AppRouter({ setIsDarkMode }) {
	return (
		<Routes>
			<Route path="/login" element={<Login />} /> {/* Public route */}
			<Route element={<ProtectedRoute />}>
				<Route
					path="/"
					element={<Layout setIsDarkMode={setIsDarkMode} />}
				>
					{/* Protected Routes */}
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
