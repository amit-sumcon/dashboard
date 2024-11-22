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
	const [users, setUsers] = useState([]);
	const [searchTerm, setSearchTerm] = useState("");
	const [currentPage, setCurrentPage] = useState(1);
	const [usersPerPage, setusersPerPage] = useState(5);
	const [columns, setColumns] = useState({
		id: true,
		name: true,
		username: true,
		email: true,
		phoneNumber: true,
		role: true,
		avatarUrl: true,
		createdAt: true,
	});
	const [showForm, setShowForm] = useState(false);

	useEffect(() => {
		fetchUsers();
	}, []);

	// Function to fetch tasks based on role
	const fetchUsers = async (email, role) => {
		try {
			const url = "http://localhost:6010/api/v1/users/";

			const res = await axios.get(url, {
				withCredentials: true,
			});
			setUsers(res.data.data || []);
		} catch (error) {
			console.error("Error fetching tasks:", error);
			setUsers([]);
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

	// Sort tasks by 'id' in ascending order
	const sortedUsers = [...users].sort((a, b) => a.id - b.id);

	const indexOfLastUser = currentPage * usersPerPage;
	const indexOfFirstUser = indexOfLastUser - usersPerPage;
	const filteredUsers = sortedUsers
		.filter(
			(task) =>
				task.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
				task.email?.toLowerCase().includes(searchTerm.toLowerCase())
		)
		.slice(indexOfFirstUser, indexOfLastUser)
		.map((user) => ({
			...user,
			id: user.id.split("-")[0], // Extract only the first segment of the UUID
		}));

	const paginate = (pageNumber) => setCurrentPage(pageNumber);

	const nextPage = () => {
		if (currentPage < Math.ceil(users.length / usersPerPage)) {
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
		setCurrentPage(Math.ceil(users.length / usersPerPage));
	};

	return (
		<div className="w-full mx-auto relative">
			<div className="flex flex-col gap-3 md:flex-row items-start justify-between md:items-center mb-4">
				<SearchBar
					handleSearch={handleSearch}
					setTasksPerPage={setusersPerPage}
					tasksPerPage={usersPerPage}
				/>

				<div className="flex items-center">
					<Export tasks={users} />
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
				<Table columns={columns} filteredTasks={filteredUsers} />
			</div>

			<Pagination
				currentPage={currentPage}
				tasksPerPage={usersPerPage}
				tasks={users}
				paginate={paginate}
				nextPage={nextPage}
				prevPage={prevPage}
				goToFirstPage={goToFirstPage}
				goToLastPage={goToLastPage}
			/>

			{/* <AssignTaskForm
				showForm={showForm}
				setShowForm={setShowForm}
				tasks={users}
				setTasks={}
			/> */}
		</div>
	);
};

export default TaskManagement;
