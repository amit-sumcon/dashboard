import React, { useState, useRef, useEffect } from 'react';
import * as XLSX from 'xlsx';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

function Export({ tasks }) {
    const [isShow, setIsShow] = useState(false);
    const dropdownRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsShow(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const convertToCSV = () => {
        const csvData = [
            ['ID', 'Name', 'Email', 'AssignedBy', 'Department', 'Doer Email', 'Doer Name', 'Freq', 'Planned', 'Status', 'TaskCode', 'UpdatedAt', 'UpdatedBy']
        ];

        tasks.forEach(task => {
            csvData.push([
                task.id,
                task.name,
                task.email,
                task.assignedBy,
                task.department,
                task.doerEmail,
                task.doerName,
                task.freq,
                task.planned,
                task.status,
                task.taskCode,
                task.updatedAt,
                task.updatedBy,
            ]);
        });

        return csvData.map(row => row.join(',')).join('\n');
    };

    const handleCSVDownload = () => {
        const csvData = convertToCSV();
        const csvFileName = 'tasks.csv';
        const blob = new Blob([csvData], { type: 'text/csv;charset=utf-8;' });
        const link = document.createElement('a');
        const url = URL.createObjectURL(blob);
        link.setAttribute('href', url);
        link.setAttribute('download', csvFileName);
        link.style.visibility = 'hidden';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    const handleXLSXDownload = () => {
        const ws = XLSX.utils.json_to_sheet(tasks);
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, 'Tasks');
        XLSX.writeFile(wb, 'tasks.xlsx');
    };

    const handlePDFDownload = () => {
        const doc = new jsPDF();
        doc.text('Tasks List', 10, 10);
        doc.autoTable({
            head: [['ID', 'Name', 'Email', 'AssignedBy', 'Department', 'Doer Email', 'Doer Name', 'Freq', 'Planned', 'Status', 'TaskCode', 'UpdatedAt', 'UpdatedBy']],
            body: tasks.map(task => [
                task.id,
                task.name,
                task.email,
                task.assignedBy,
                task.department,
                task.doerEmail,
                task.doerName,
                task.freq,
                task.planned,
                task.status,
                task.taskCode,
                task.updatedAt,
                task.updatedBy,
            ]),
        });
        doc.save('tasks.pdf');
    };

    const handleShow = () => {
        setIsShow(!isShow);
    };

    return (
        <div className="relative" ref={dropdownRef}>
            <button
                className="bg-green-500 hover:bg-green-600 text-white font-bold py-1 px-4 rounded mr-2 flex items-center"
                onClick={handleShow}
            >
                Export
                <i className="bx bx-down-arrow-alt text-2xl"></i>
            </button>
            <div className={`absolute right-0 mt-2 w-40 flex flex-col items-center bg-white border border-gray-300 rounded-lg shadow-lg z-10 px-4 py-2 space-y-3 ${isShow ? '' : 'hidden'} dark:bg-gray-700`}>
                <button onClick={handleCSVDownload} className="bg-indigo-500 hover:bg-indigo-600 flex items-center justify-center text-white font-bold py-2 px-4 w-28 rounded space-x-2">
                    <span>CSV</span>
                    <i className="bx bx-down-arrow-alt text-2xl"></i>
                </button>
                <button onClick={handleXLSXDownload} className="bg-indigo-500 hover:bg-indigo-600 flex items-center justify-center text-white font-bold py-2 px-4 w-28 rounded space-x-2">
                    <span>XLSX</span>
                    <i className="bx bx-down-arrow-alt text-2xl"></i>
                </button>
                <button onClick={handlePDFDownload} className="bg-indigo-500 hover:bg-indigo-600 flex items-center justify-center text-white font-bold py-2 px-4 w-28 rounded space-x-2">
                    <span>PDF</span>
                    <i className="bx bx-down-arrow-alt text-2xl"></i>
                </button>
            </div>
        </div>
    );
}

export default Export;