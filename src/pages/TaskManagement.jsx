import React, { useState, useEffect } from "react";
import axios from "axios";
import { useSelector } from "react-redux"; // To get the user info from Redux store
import Pagination from "../components/Pagination";
import Table from "../components/Table";
import SearchBar from "../components/SearchBar";
import ColumnToggle from "../components/ColumnToggle";
import Export from "../components/Export";
import AssignTaskForm from "../components/AssignTask";

const TaskManagement = () => {
	const [tasks, setTasks] = useState([]);
	const [searchTerm, setSearchTerm] = useState("");
	const [currentPage, setCurrentPage] = useState(1);
	const [tasksPerPage, setTasksPerPage] = useState(5);
	const [columns, setColumns] = useState({
		id: true,
		name: true,
		assignedBy: true,
		department: true,
		doerEmail: true,
		doerName: true,
		freq: true,
		planned: true,
		actual: true,
		status: true,
		taskCode: true,
		updatedAt: true,
		updatedBy: true,
	});
	const [showForm, setShowForm] = useState(false); // Track visibility of the form

	// Get user and role from Redux store
	const { user } = useSelector((state) => state.user); // Assuming the user and role are stored under 'user'
	const userRole = user?.role;
	const doerEmail = user?.email;

	// Fetch tasks when component mounts or role changes
	useEffect(() => {
		if (doerEmail && userRole) {
			fetchTasks(doerEmail, userRole);
		}
	}, [doerEmail, userRole]);

	// Function to fetch tasks based on role
	const fetchTasks = async (email, role) => {
		try {
			let url = "http://localhost:6010/api/v1/tasks/";
			let params = {};

			if (role === "TEAM_MEMBER") {
				// For TEAM_MEMBER, fetch only their tasks
				url = "http://localhost:6010/api/v1/tasks/my-tasks"; // Custom endpoint for TEAM_MEMBER
				params = { doerEmail: email }; // Send email as parameter
			}

			const res = await axios.get(url, {
				params: params,
				withCredentials: true, // Ensure cookies/session are sent if using authentication
			});
			setTasks(res.data.data || []); // Set tasks, fallback to empty array if no data
		} catch (error) {
			console.error("Error fetching tasks:", error);
			setTasks([]); // Ensure the app doesn't break if API call fails
		}
	};

	const handleSearch = (event) => {
		setSearchTerm(event.target.value);
		setCurrentPage(1);
		console.log(event.target.value);
	};

	const handleColumnToggle = (columnName) => {
		setColumns({
			...columns,
			[columnName]: !columns[columnName],
		});
	};

	const updateTaskStatus = (taskId, newStatus) => {
		setTasks((prevTasks) =>
			prevTasks.map((task) =>
				task.id === taskId ? { ...task, status: newStatus } : task
			)
		);
	};

	// Sort tasks by 'id' in ascending order
	const sortedTasks = [...tasks].sort((a, b) => a.id - b.id);

	const indexOfLastTask = currentPage * tasksPerPage;
	const indexOfFirstTask = indexOfLastTask - tasksPerPage;
	const filteredTasks = sortedTasks
		.filter(
			(task) =>
				task.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
				task.email?.toLowerCase().includes(searchTerm.toLowerCase())
		)
		.slice(indexOfFirstTask, indexOfLastTask);

	const paginate = (pageNumber) => setCurrentPage(pageNumber);

	const nextPage = () => {
		if (currentPage < Math.ceil(tasks.length / tasksPerPage)) {
			setCurrentPage(currentPage + 1);
		}
	};

	const prevPage = () => {
		if (currentPage > 1) {
			setCurrentPage(currentPage - 1);
		}
	};

	const goToFirstPage = () => {
		setCurrentPage(1);
	};

	const goToLastPage = () => {
		setCurrentPage(Math.ceil(tasks.length / tasksPerPage));
	};

	return (
		<div className="w-full mx-auto relative">
			<div className="flex flex-col gap-3 md:flex-row items-start justify-between md:items-center mb-4">
				<SearchBar
					handleSearch={handleSearch}
					setTasksPerPage={setTasksPerPage}
					tasksPerPage={tasksPerPage}
				/>

				<div
					className={`flex items-center ${
						userRole === "TEAM_MEMBER" && "hidden"
					}`}
				>
					<Export tasks={tasks} />
					<ColumnToggle
						columns={columns}
						handleColumnToggle={handleColumnToggle}
					/>
					{/* Button to toggle the AssignTaskForm */}
					<button
						onClick={() => setShowForm(true)}
						className="ml-4 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
					>
						Add Task
					</button>
				</div>
			</div>

			<div className="w-full">
				<Table
					columns={columns}
					filteredTasks={filteredTasks}
					onUpdateStatus={updateTaskStatus}
				/>
			</div>

			<Pagination
				currentPage={currentPage}
				tasksPerPage={tasksPerPage}
				tasks={tasks}
				paginate={paginate}
				nextPage={nextPage}
				prevPage={prevPage}
				goToFirstPage={goToFirstPage}
				goToLastPage={goToLastPage}
			/>

			<AssignTaskForm
				showForm={showForm}
				setShowForm={setShowForm}
				tasks={tasks}
				setTasks={setTasks}
			/>
		</div>
	);
};

export default TaskManagement;
