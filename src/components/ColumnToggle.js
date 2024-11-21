import React, { useState, useEffect, useRef } from 'react';

const ColumnToggle = ({ columns, handleColumnToggle }) => {
    const [isShow, setIsShow] = useState(false);

    const dropdownRef = useRef(null);

    const handleShow = () => {
        setIsShow(!isShow)
    }

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
    }, [])

    return (
        <div className="relative" ref={dropdownRef}>
            <button className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded" onClick={handleShow}>
                Columns
            </button>
            <div className={`absolute right-0 mt-2 w-40 bg-white border border-gray-300 rounded-lg shadow-lg z-10 ${isShow ? 'block' : 'hidden'}`}>
                <div className="px-4 py-2">
                    {Object.keys(columns).map(columnName => (
                        <div key={columnName} className="flex items-center">
                            <input
                                type="checkbox"
                                className="mr-2"
                                checked={columns[columnName]}
                                onChange={() => handleColumnToggle(columnName)}
                            />
                            <label>{columnName}</label>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ColumnToggle;