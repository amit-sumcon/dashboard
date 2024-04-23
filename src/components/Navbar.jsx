import React, { useState, useEffect } from 'react'

function Navbar({ setIsDarkMode, setIsMenu }) {
    const [darkMode, setDarkMode] = useState(false);

    useEffect(() => {
        setIsDarkMode(darkMode)
    }, [darkMode, setIsDarkMode])

    const handleDarkMode = () => {
        setDarkMode(prev => !prev)
    }

    return (
        <nav className='w-full h-16 shadow-md border rounded-md px-5 md:px-10'>
            <div className='w-full h-full flex justify-between items-center'>
                <div className='w-fit h-full flex items-center gap-3'>
                    <div className='dark:text-white lg:hidden' onClick={() => { setIsMenu(true) }}>
                        <i className='bx bx-menu text-3xl cursor-pointer' ></i>
                    </div>
                </div>
                <div className='flex items-center gap-10 md:gap-5'>
                    <div className='cursor-pointer'>
                        <i className='bx bx-category dark:text-gray-300'></i>
                    </div>
                    <div className='cursor-pointer' onClick={handleDarkMode}>
                        {
                            darkMode
                                ? <i className='bx bx-moon text-gray-300' ></i>
                                : <i className='bx bx-sun text-xl'></i>
                        }
                    </div>
                    <div className='cursor-pointer'>
                        <i className='bx bxs-user-circle text-lg dark:text-gray-300'></i>
                    </div>
                </div>
            </div>
        </nav>
    )
}

export default Navbar