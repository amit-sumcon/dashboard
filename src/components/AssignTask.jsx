import React, { useState, useEffect, useRef } from "react";
import { useFormik } from "formik";
import Select from "react-select";
import Error from "./Error";
import { assignTaskSchema } from "../schema/assignTaskSchema";
import { useSelector } from "react-redux";
import axios from "axios";
import { toast } from "sonner";

const initial_values = {
	planned: "",
	name: "",
	freq: "D",
	department: "",
	doerEmail: null,
	doerName: null,
};

const departments = [
	"ACCOUNTS",
	"MDO",
	"S_T",
	"PM",
	"MD",
	"MANAGER_HO",
	"COORDINATOR_HO",
	"OHE",
	"MARKETING_TENDER",
	"HR",
	"CA",
	"BILLING_ENGINEER",
	"SURVEYER_DEPARTMENT",
	"OTHERS",
	"OFFICE_EXECUTIVES",
	"PURCHASE",
	"QC_ENGINEER",
];

const frequencies = [
	{ value: "D", label: "Daily" },
	{ value: "W", label: "Weekly" },
	{ value: "M", label: "Monthly" },
	{ value: "Y", label: "Yearly" },
	{ value: "Q", label: "Quarterly" },
	{ value: "F", label: "Fortnightly" },
	{ value: "E1ST", label: "First occurrence in a cycle" },
	{ value: "E2ND", label: "Second occurrence in a cycle" },
	{ value: "E3RD", label: "Third occurrence in a cycle" },
	{ value: "ELAST", label: "Last occurrence in a cycle" },
];

export default function AssignTaskForm({ showForm, setShowForm, setTasks }) {
	const [users, setUsers] = useState([]);
	const assignTaskWindowRef = useRef(null); // Reference for detecting clicks outside the form

	// Get user data from Redux store
	const { user } = useSelector((state) => state.user);

	// Fetch users from API if user is ADMIN or SUPER_ADMIN
	useEffect(() => {
		// Close form if click is outside
		const handleClickOutside = (event) => {
			if (
				assignTaskWindowRef.current &&
				!assignTaskWindowRef.current.contains(event.target)
			) {
				setShowForm(false);
			}
		};

		document.addEventListener("mousedown", handleClickOutside);

		// Fetch users if role is ADMIN or SUPER_ADMIN
		if (user && (user.role === "ADMIN" || user.role === "SUPER_ADMIN")) {
			const fetchUsers = async () => {
				try {
					const response = await axios.get(
						"http://localhost:6010/api/v1/users/",
						{
							withCredentials: true,
						}
					);

					if (response.status === 200) {
						// Map the users data to include just name and email
						const userOptions = response.data.data.map((user) => ({
							label: user.name, // Use name as label for doerName
							value: user.email, // Use email as value for doerEmail
							email: user.email, // Store email separately
							name: user.name, // Store name separately
						}));
						setUsers(userOptions);
					} else {
						console.error(
							"Error fetching users:",
							response.data.message
						);
					}
				} catch (error) {
					console.error("Error fetching users:", error);
				}
			};
			fetchUsers();
		}

		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
		};
	}, [setShowForm, user]);

	const {
		values,
		errors,
		handleBlur,
		handleChange,
		handleSubmit,
		touched,
		setFieldValue,
	} = useFormik({
		initialValues: initial_values,
		validationSchema: assignTaskSchema,
		onSubmit: async (values, { resetForm }) => {
			try {
				const response = await axios.post(
					"http://localhost:6010/api/v1/tasks/assign-task",
					{
						planned: values.planned,
						name: values.name,
						freq: values.freq,
						department: values.department,
						doerEmail: values.doerEmail,
						doerName: values.doerName,
					},
					{
						withCredentials: true,
					}
				);

				if (response.status === 200) {
					resetForm();
					setShowForm(false);
					toast.success(
						response.data.data.message ||
							"Successfully assigned the task."
					);
					const newTask = response.data.data;
					setTasks((prev) => [...prev, newTask]);
				} else {
					console.error(
						"Error assigning task:",
						response.data.message
					);
					alert("Failed to assign task. Please try again.");
				}
			} catch (error) {
				console.error("Error in API request:", error);
				alert("An error occurred. Please try again.");
			}
		},
	});

	console.log(values);

	return (
		<div
			className={`fixed top-0 right-0 h-full bg-white shadow-lg z-50 transform transition-transform ${
				showForm ? "translate-x-0" : "translate-x-full"
			}`}
			style={{ width: "400px" }}
			ref={assignTaskWindowRef} // Attach the ref here to detect clicks outside
		>
			{/* Close Button */}
			<button
				className="absolute top-4 right-4 text-gray-600 hover:text-gray-800"
				onClick={() => setShowForm(false)}
			>
				Close
			</button>
			<div className="max-w-md h-full mx-auto p-6 bg-white shadow-md rounded-md overflow-y-auto">
				<h1 className="text-xl font-bold mb-4">Assign Task</h1>
				<form onSubmit={handleSubmit} className="space-y-4">
					{/* Planned Date Field */}
					<div>
						<label className="after:content-['*'] after:ml-0.5 after:text-red-500 block text-sm font-medium text-gray-700 mb-1">
							Planned Date
						</label>
						<input
							type="date"
							name="planned"
							value={values.planned}
							onChange={handleChange}
							onBlur={handleBlur}
							className={`w-full p-3 border rounded-md focus:outline-none focus:ring-2 ${
								errors.planned && touched.planned
									? "border-red-500 focus:ring-red-500"
									: "border-gray-300 focus:ring-blue-500"
							}`}
						/>
						{errors.planned && touched.planned && (
							<Error msg={errors.planned} />
						)}
					</div>

					{/* Task Name Field */}
					<div>
						<label className="after:content-['*'] after:ml-0.5 after:text-red-500 block text-sm font-medium text-gray-700 mb-1">
							Task Name
						</label>
						<input
							type="text"
							name="name"
							placeholder="Enter task name"
							value={values.name}
							onChange={handleChange}
							onBlur={handleBlur}
							className={`w-full p-3 border rounded-md focus:outline-none focus:ring-2 ${
								errors.name && touched.name
									? "border-red-500 focus:ring-red-500"
									: "border-gray-300 focus:ring-blue-500"
							}`}
						/>
						{errors.name && touched.name && (
							<Error msg={errors.name} />
						)}
					</div>

					{/* Frequency Field */}
					<div>
						<label className="after:content-['*'] after:ml-0.5 after:text-red-500 block text-sm font-medium text-gray-700 mb-1">
							Frequency
						</label>
						<select
							name="freq"
							value={values.freq}
							onChange={handleChange}
							onBlur={handleBlur}
							className={`w-full p-3 border rounded-md focus:outline-none focus:ring-2 ${
								errors.freq && touched.freq
									? "border-red-500 focus:ring-red-500"
									: "border-gray-300 focus:ring-blue-500"
							}`}
						>
							{frequencies.map((freq) => (
								<option key={freq.value} value={freq.value}>
									{freq.label}
								</option>
							))}
						</select>
						{errors.freq && touched.freq && (
							<Error msg={errors.freq} />
						)}
					</div>

					{/* Department Field */}
					<div>
						<label className="after:content-['*'] after:ml-0.5 after:text-red-500 block text-sm font-medium text-gray-700 mb-1">
							Department
						</label>
						<select
							name="department"
							value={values.department}
							onChange={handleChange}
							onBlur={handleBlur}
							className={`w-full p-3 border rounded-md focus:outline-none focus:ring-2 ${
								errors.department && touched.department
									? "border-red-500 focus:ring-red-500"
									: "border-gray-300 focus:ring-blue-500"
							}`}
						>
							<option value="" disabled>
								Select a department
							</option>
							{departments.map((dept) => (
								<option key={dept} value={dept}>
									{dept}
								</option>
							))}
						</select>
						{errors.department && touched.department && (
							<Error msg={errors.department} />
						)}
					</div>

					{/* Doer Email Field */}
					<div>
						<label className="after:content-['*'] after:ml-0.5 after:text-red-500 block text-sm font-medium text-gray-700 mb-1">
							Doer's Email
						</label>
						<Select
							name="doerEmail"
							value={users.find(
								(user) => user.value === values.doerEmail
							)} // Match the selected email by its value
							onChange={(selectedOption) => {
								setFieldValue(
									"doerEmail",
									selectedOption.value
								); // Save email in doerEmail
								setFieldValue("doerName", selectedOption.name); // Save name in doerName
							}}
							options={users}
							isSearchable
							getOptionLabel={(e) => e.email} // Display email in the dropdown
							getOptionValue={(e) => e.value} // Use email as value
							className="w-full"
						/>
						{errors.doerEmail && touched.doerEmail && (
							<Error msg={errors.doerEmail} />
						)}
					</div>

					{/* Doer Name Field */}
					<div>
						<label className="after:content-['*'] after:ml-0.5 after:text-red-500 block text-sm font-medium text-gray-700 mb-1">
							Doer's Name
						</label>
						<Select
							name="doerName"
							value={users.find(
								(user) => user.name === values.doerName
							)} // Match the selected name by its value
							onChange={(selectedOption) => {
								setFieldValue("doerName", selectedOption.name); // Save name in doerName
								setFieldValue(
									"doerEmail",
									selectedOption.value
								); // Save email in doerEmail
							}}
							options={users}
							isSearchable
							getOptionLabel={(e) => e.name} // Display name in the dropdown
							getOptionValue={(e) => e.name} // Use name as value
							className="w-full"
						/>
						{errors.doerName && touched.doerName && (
							<Error msg={errors.doerName} />
						)}
					</div>

					{/* Submit Button */}
					<div>
						<button
							type="submit"
							className="w-full py-3 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700"
						>
							Submit
						</button>
					</div>
				</form>
			</div>
		</div>
	);
}
