import React, { useState, useEffect } from "react";
import axios from "axios";
import Pagination from "../components/Pagination";
import Table from "../components/Table";
import SearchBar from "../components/SearchBar";
import ColumnToggle from "../components/ColumnToggle";
import Export from "../components/Export";

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

	useEffect(() => {
		fetchTasks();
	}, []);

	const fetchTasks = async () => {
		try {
			const res = await axios.get("http://localhost:6010/api/v1/tasks/", {
				withCredentials: true,
			});
			setTasks(res.data.data || []); // Fallback to empty array if no data
		} catch (error) {
			console.error("Error fetching tasks:", error);
			setTasks([]); // Ensure the app doesn't break if API call fails
		}
	};

	const handleSearch = (event) => {
		setSearchTerm(event.target.value);
		setCurrentPage(1);
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
		<div className="w-full mx-auto">
			<div className="flex flex-col gap-3 md:flex-row items-start justify-between md:items-center mb-4">
				<SearchBar
					handleSearch={handleSearch}
					setTasksPerPage={setTasksPerPage}
					tasksPerPage={tasksPerPage}
				/>

				<div className="flex items-center">
					<Export tasks={tasks} />
					<ColumnToggle
						columns={columns}
						handleColumnToggle={handleColumnToggle}
					/>
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
		</div>
	);
};

export default TaskManagement;
