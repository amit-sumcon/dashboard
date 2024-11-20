import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { checkAuthToken } from "../utils/auth";

const ProtectedRoutes = () => {
	const isAuthenticated = checkAuthToken();

	return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />;
};

export default ProtectedRoutes;
