import React from "react";
import { Building2 } from "lucide-react";
import { useFormik } from "formik";
import { loginValidationSchema } from "../schema/loginValidationSchema";
import axios from "axios";
import Error from "../components/Error";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setUser } from "../redux/slices/userSlice";
import { toast } from "sonner";

const initial_values = {
	email: "",
	password: "",
};

export default function Login() {
	const inFifteenMinutes = new Date(new Date().getTime() + 15 * 60 * 1000);
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const { values, handleBlur, handleChange, errors, handleSubmit, touched } =
		useFormik({
			initialValues: initial_values,
			validateOnBlur: true,
			validationSchema: loginValidationSchema,
			validateOnChange: true,
			onSubmit: async (values, { resetForm }) => {
				const host = "http://localhost:6010/api/v1/users/login";
				try {
					const response = await axios.post(host, values);

					// Set cookies and update state
					Cookies.set("accessToken", response.data.data.accessToken, {
						expires: inFifteenMinutes,
					});
					dispatch(setUser(response.data.data));

					// Show success message
					toast.success(
						response.data.data.message || "Successfully Logged In"
					);
					resetForm();
					navigate("/");
				} catch (error) {
					if (error.response) {
						const { status, data } = error.response;
						switch (status) {
							case 400:
								toast.error(
									data.message ||
										"Bad Request. Please check your input."
								);
								break;
							case 404:
								toast.error(
									data.message ||
										"User not found. Please check your credentials."
								);
								break;
							case 500:
								toast.error(
									data.message ||
										"Server error. Please try again later."
								);
								break;
							default:
								toast.error(
									data.message ||
										"An unexpected error occurred."
								);
						}
					} else {
						toast.error(
							"Network error. Please check your internet connection."
						);
					}
				}
			},
		});

	return (
		<div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-teal-400 to-blue-500">
			<div className="w-full max-w-96 mx-6 shadow-lg rounded-lg bg-white">
				<div className="space-y-2 p-6">
					<div className="flex items-center justify-center mb-4">
						<Building2 className="h-12 w-12 text-teal-600" />
					</div>
					<h2 className="text-2xl font-semibold text-center text-gray-800">
						Sumcon Infraventures
					</h2>
					<p className="text-center text-gray-600">
						Enter your credentials to access the dashboard
					</p>
				</div>

				<form onSubmit={handleSubmit} className="space-y-4 p-6">
					<div className="space-y-2">
						<label
							htmlFor="email"
							className="after:content-['*'] after:ml-0.5 after:text-red-500 block text-gray-700"
						>
							Email
						</label>
						<input
							id="email"
							type="email"
							placeholder="m@example.com"
							required
							value={values.email}
							onChange={handleChange}
							onBlur={handleBlur}
							className={`w-full p-3 border rounded-md focus:outline-none focus:ring-2 ${
								errors.email && touched.email
									? "border-red-500 focus:ring-red-500"
									: "border-gray-300 focus:ring-blue-500"
							}`}
						/>
						{errors.email && touched.email && (
							<Error msg={errors.email} />
						)}
					</div>

					<div className="space-y-2">
						<label
							htmlFor="password"
							className="after:content-['*'] after:ml-0.5 after:text-red-500 block text-gray-700"
						>
							Password
						</label>
						<input
							id="password"
							type="password"
							placeholder="Enter 6 digits password"
							required
							value={values.password}
							onChange={handleChange}
							onBlur={handleBlur}
							className={`w-full p-3 border rounded-md focus:outline-none focus:ring-2 ${
								errors.password && touched.password
									? "border-red-500 focus:ring-red-500"
									: "border-gray-300 focus:ring-blue-500"
							}`}
						/>
						{errors.password && touched.password && (
							<Error msg={errors.password} />
						)}
					</div>

					<div className="mt-4">
						<button
							type="submit"
							disabled={
								!values.email ||
								!values.password ||
								Object.keys(errors).length > 0
							}
							className={`w-full py-3 ${
								!values.email ||
								!values.password ||
								Object.keys(errors).length > 0
									? "bg-gray-400 cursor-not-allowed"
									: "bg-blue-600 hover:bg-blue-700"
							} text-white rounded-md transition duration-200`}
						>
							Log in
						</button>
					</div>
				</form>
			</div>
		</div>
	);
}
