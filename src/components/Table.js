import React from 'react';
import axios from 'axios';
import { toast } from 'sonner';

// Helper function to format date and time
const formatDateTime = (dateString) => {
    const date = new Date(dateString);
    const options = {
        year: 'numeric',
        month: 'numeric',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true, // Optional: set to false for 24-hour format
    };
    return date.toLocaleString(undefined, options);
};

const formatDate = (dateString) => {
    const date = new Date(dateString);
    const options = {
        year: 'numeric',
        month: 'numeric',
        day: 'numeric',
    };
    return date.toLocaleDateString(undefined, options);
};

const Tasktable = ({ columns, filteredTasks, onUpdateStatus }) => {
    const columnKeys = Object.keys(columns).filter((columnName) => columns[columnName]);

    const handleStatusChange = async (taskId) => {
        try {
            const res = await axios.put(
                `http://localhost:6010/api/v1/tasks/status/${taskId}`,
                { status: true }, // Toggle the status
                { withCredentials: true }
            );

            if (res.status === 200) {
                const updatedStatus = res.data.data.status;
                onUpdateStatus(taskId, updatedStatus);
                toast.success(res.data.message || "Task status updated successfully.");
            }
        } catch (error) {
            if (error.response) {
                // Handle errors from the server
                const { status, data } = error.response;

                switch (status) {
                    case 400:
                        toast.error(data.message || "Bad Request. Please check your input.");
                        break;
                    case 404:
                        toast.error(data.message || "Task not found.");
                        break;
                    case 500:
                        toast.error(data.message || "Server error. Please try again later.");
                        break;
                    default:
                        toast.error(data.message || "An unexpected error occurred.");
                        break;
                }
            } else if (error.request) {
                // Handle network errors
                toast.error("Network error. Please check your connection.");
            } else {
                // Handle any other errors
                toast.error("An error occurred. Please try again.");
            }

            console.error("Failed to update status:", error);
        }
    };

    return (
        <div className="overflow-x-auto">
            <table className="w-full table-auto border-collapse border border-gray-800 dark:border-gray-100">
                <thead>
                    <tr className="text-gray-700 dark:text-gray-200">
                        {columnKeys.map((columnName) => (
                            <th key={columnName} className="border border-gray-800 px-4 py-2">
                                {columnName}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {filteredTasks.map((task, index) => (
                        <tr key={index} className="text-gray-700 dark:text-gray-400">
                            {columnKeys.map((columnName) => (
                                <td key={columnName} className="border border-gray-800 px-4 py-2">
                                {columnName === 'status' ? (
                                    <input
                                        type="checkbox"
                                        checked={task[columnName]}
                                        onChange={() => handleStatusChange(task.id)}
                                        className="cursor-pointer"
                                    />
                                ) : columnName === 'planned' ? (
                                    task[columnName] ? formatDate(task[columnName]) : null
                                ) : columnName === 'actual' || columnName === 'updatedAt' ? (
                                    task[columnName] ? formatDateTime(task[columnName]) : null
                                ) : (
                                    task[columnName]
                                )}
                            </td>                            
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Tasktable;
