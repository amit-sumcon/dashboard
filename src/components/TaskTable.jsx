import React, { useState } from "react";

const TaskTable = ({ data }) => {
	const [currentPage, setCurrentPage] = useState(1);
	const [rowsPerPage] = useState(5); // Adjust rows per page as needed
	const [sortOrder, setSortOrder] = useState("asc");

	const handleSort = () => {
		setSortOrder((prev) => (prev === "asc" ? "desc" : "asc"));
	};

	const handleExport = (type) => {
		alert(`Exporting as ${type}`);
		// Implement export logic
	};

	const indexOfLastRow = currentPage * rowsPerPage;
	const indexOfFirstRow = indexOfLastRow - rowsPerPage;
	const sortedData = [...data].sort((a, b) => {
		if (sortOrder === "asc") return a.name.localeCompare(b.name);
		return b.name.localeCompare(a.name);
	});

	const currentData = sortedData.slice(indexOfFirstRow, indexOfLastRow);

	const totalPages = Math.ceil(data.length / rowsPerPage);

	return (
		<div className="p-4">
			<div className="flex justify-between items-center mb-4">
				<h1 className="text-xl font-bold">Task Table</h1>
				<div className="space-x-2">
					<button
						onClick={() => handleExport("PDF")}
						className="px-4 py-2 bg-red-500 text-white rounded"
					>
						Export PDF
					</button>
					<button
						onClick={() => handleExport("Excel")}
						className="px-4 py-2 bg-green-500 text-white rounded"
					>
						Export Excel
					</button>
					<button
						onClick={() => handleExport("CSV")}
						className="px-4 py-2 bg-blue-500 text-white rounded"
					>
						Export CSV
					</button>
				</div>
			</div>

			<table className="w-full table-auto border-collapse border border-gray-300">
				<thead>
					<tr className="bg-gray-100">
						<th className="border border-gray-300 px-4 py-2">ID</th>
						<th className="border border-gray-300 px-4 py-2">
							Task Code
						</th>
						<th
							className="border border-gray-300 px-4 py-2 cursor-pointer"
							onClick={handleSort}
						>
							Name {sortOrder === "asc" ? "↑" : "↓"}
						</th>
						<th className="border border-gray-300 px-4 py-2">
							Frequency
						</th>
						<th className="border border-gray-300 px-4 py-2">
							Department
						</th>
						<th className="border border-gray-300 px-4 py-2">
							Planned
						</th>
						<th className="border border-gray-300 px-4 py-2">
							Actual
						</th>
						<th className="border border-gray-300 px-4 py-2">
							Status
						</th>
						<th className="border border-gray-300 px-4 py-2">
							Doer Email
						</th>
						<th className="border border-gray-300 px-4 py-2">
							Doer Name
						</th>
						<th className="border border-gray-300 px-4 py-2">
							Assigned By
						</th>
						<th className="border border-gray-300 px-4 py-2">
							Updated By
						</th>
						<th className="border border-gray-300 px-4 py-2">
							Created At
						</th>
						<th className="border border-gray-300 px-4 py-2">
							Updated At
						</th>
					</tr>
				</thead>
				<tbody>
					{currentData.map((row, index) => (
						<tr key={index} className="text-center">
							<td className="border border-gray-300 px-4 py-2">
								{row.id}
							</td>
							<td className="border border-gray-300 px-4 py-2">
								{row.taskcode}
							</td>
							<td className="border border-gray-300 px-4 py-2">
								{row.name}
							</td>
							<td className="border border-gray-300 px-4 py-2">
								{row.freq}
							</td>
							<td className="border border-gray-300 px-4 py-2">
								{row.department}
							</td>
							<td className="border border-gray-300 px-4 py-2">
								{row.planned}
							</td>
							<td className="border border-gray-300 px-4 py-2">
								{row.actual}
							</td>
							<td className="border border-gray-300 px-4 py-2">
								{row.status}
							</td>
							<td className="border border-gray-300 px-4 py-2">
								{row.doeremil}
							</td>
							<td className="border border-gray-300 px-4 py-2">
								{row.doername}
							</td>
							<td className="border border-gray-300 px-4 py-2">
								{row.assignedBy}
							</td>
							<td className="border border-gray-300 px-4 py-2">
								{row.updatedBy}
							</td>
							<td className="border border-gray-300 px-4 py-2">
								{row.createtedAt}
							</td>
							<td className="border border-gray-300 px-4 py-2">
								{row.updatedAt}
							</td>
						</tr>
					))}
				</tbody>
			</table>

			<div className="flex justify-between items-center mt-4">
				<button
					onClick={() =>
						setCurrentPage((prev) => Math.max(prev - 1, 1))
					}
					disabled={currentPage === 1}
					className="px-4 py-2 bg-gray-500 text-white rounded disabled:opacity-50"
				>
					Previous
				</button>
				<span>
					Page {currentPage} of {totalPages}
				</span>
				<button
					onClick={() =>
						setCurrentPage((prev) => Math.min(prev + 1, totalPages))
					}
					disabled={currentPage === totalPages}
					className="px-4 py-2 bg-gray-500 text-white rounded disabled:opacity-50"
				>
					Next
				</button>
			</div>
		</div>
	);
};

export default TaskTable;
