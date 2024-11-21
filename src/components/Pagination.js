import React from 'react';

const Pagination = ({ currentPage, tasksPerPage, tasks, paginate, nextPage, prevPage, goToFirstPage, goToLastPage }) => {
    const showingText = `Showing ${Math.min((currentPage - 1) * tasksPerPage + 1, tasks.length)} to ${Math.min(currentPage * tasksPerPage, tasks.length)} of ${tasks.length} entries`;

    return (
        <div className='w-full flex flex-col justify-between items-center sm:flex-row'>
            <div className='text-gray-700 dark:text-gray-300'>{showingText}</div>
            <ul className="flex list-none justify-end py-4">
                <li className="mx-1">
                    <button
                        className="px-2 py-1 rounded bg-gray-200 dark:bg-gray-600"
                        onClick={() => goToFirstPage()}
                    >
                        <i className='bx bx-chevrons-left text-2xl font-medium dark:text-gray-300' ></i>
                    </button>
                </li>
                <li className="mx-1">
                    <button
                        className="px-2 py-1 rounded bg-gray-200 dark:bg-gray-600"
                        onClick={() => prevPage()}
                    >
                        <i className='bx bx-chevron-left text-2xl font-medium dark:text-gray-300'></i>
                    </button>
                </li>
                {[...Array(Math.ceil(tasks.length / tasksPerPage)).keys()].map(number => (
                    <li key={number} className="mx-1">
                        <button
                            className={`px-4 py-2 rounded ${currentPage === number + 1 ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
                            onClick={() => paginate(number + 1)}
                        >
                            {number + 1}
                        </button>
                    </li>
                ))}
                <li className="mx-1">
                    <button
                        className="px-2 py-1 rounded bg-gray-200 dark:bg-gray-600"
                        onClick={() => nextPage()}
                    >
                        <i className='bx bx-chevron-right text-2xl font-medium dark:text-gray-300'></i>
                    </button>
                </li>
                <li className="mx-1">
                    <button
                        className="px-2 py-1 rounded bg-gray-200 dark:bg-gray-600"
                        onClick={() => goToLastPage()}
                    >
                        <i className='bx bx-chevrons-right text-2xl font-medium dark:text-gray-300' ></i>
                    </button>
                </li>
            </ul>
        </div>
    );
};

export default Pagination;