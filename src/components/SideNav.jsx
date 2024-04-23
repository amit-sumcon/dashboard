import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useMediaQuery } from 'react-responsive';

function SideNav({ isMenu, setIsMenu }) {
    const [isCollapsed, setIsCollapsed] = useState(false);
    const [isLocked, setIsLocked] = useState(true);

    const isLargeView = useMediaQuery({ query: '(min-width: 1024px)' })

    const handleMenuOpen = () => {
        setIsMenu(false)
    }

    const handleCollapsed = () => {
        setIsLocked(prev => !prev);
    };

    useEffect(() => {
        const handleMouseOver = () => {
            setIsCollapsed(false);
        };

        const handleMouseOut = () => {
            setIsCollapsed(true);
        };

        const sidebar = document.getElementById('sidebar');

        if (!isLocked && sidebar) {
            sidebar.addEventListener('mouseover', handleMouseOver);
            sidebar.addEventListener('mouseout', handleMouseOut);

            return () => {
                sidebar.removeEventListener('mouseover', handleMouseOver);
                sidebar.removeEventListener('mouseout', handleMouseOut);
            };
        }
    }, [isLocked, isCollapsed]);

    // setIsMenu(isMenuOpen)

    return (
        <div
            className={`${isCollapsed ? 'w-20 duration-200 transition-all ease-in' : 'w-64 transition-all duration-200 ease-out'} h-screen bg-white border-r dark:bg-slate-900 dark:text-white ${!isMenu && !isLargeView && 'hidden'} absolute z-50 lg:static lg:z-0 overflow-y-auto`}
            id='sidebar'
        >
            <div className='flex justify-between items-center gap-16 pt-6 pb-3 px-4 fixed bg-white dark:bg-slate-900'>
                <div className='flex items-center gap-2'>
                    <img src={`https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D`} alt="" className='w-10 h-10 rounded-full' />
                    <span className={`${isCollapsed && 'hidden'} text-xl font-bold`}>Velocity</span>
                </div>
                {
                    isLargeView
                        ? <div className={`${isCollapsed && 'hidden transition-all duration-200'} cursor-pointer`} onClick={handleCollapsed}>
                            {
                                isLocked
                                    ? <i className='bx bx-radio-circle-marked text-3xl'></i>
                                    : <i className='bx bx-radio-circle text-3xl'></i>
                            }
                        </div>
                        : <div className='lg:hidden cursor-pointer' onClick={handleMenuOpen}>
                            {
                                isMenu && <i className='bx bx-x text-2xl dark:text-white'></i>
                            }
                        </div>
                }
            </div>
            <div className='flex flex-col gap-4 mt-20 px-6 w-full'>
                <div className='flex items-center gap-3'>
                    <i className='bx bx-home-smile text-2xl'></i>
                    <Link to="/" className={`${isCollapsed && 'hidden'}`}>Dashboard</Link>
                </div>
                <div className='flex flex-col gap-3 w-full'>
                    <span className={`${isCollapsed && 'hidden'} text-sm text-gray-500`}>Pages</span>
                    <div className='flex items-center gap-3'>
                        <i className='bx bx-list-ol text-2xl' ></i>
                        <Link to="/pages/hero" className={`${isCollapsed && 'hidden'}`}>Hero</Link>
                    </div>
                    <div className='flex items-center gap-3'>
                        <i className='bx bx-list-ol text-2xl' ></i>
                        <Link to="/pages/about-us" className={`${isCollapsed && 'hidden'}`}>About Us</Link>
                    </div>
                    <div className='flex items-center gap-3'>
                        <i className='bx bx-list-ol text-2xl' ></i>
                        <Link to="/pages/services" className={`${isCollapsed && 'hidden'}`}>Service</Link>
                    </div>
                    <div className='flex items-center gap-3'>
                        <i className='bx bx-list-ol text-2xl' ></i>
                        <Link to="/pages/why-choose-us" className={`${isCollapsed && 'hidden'}`}>Why Choose Us</Link>
                    </div>
                    <div className='flex items-center gap-3'>
                        <i className='bx bx-list-ol text-2xl' ></i>
                        <Link to="/pages/testimonials" className={`${isCollapsed && 'hidden'}`}>Testimonials</Link>
                    </div>
                    <div className='flex items-center gap-3'>
                        <i className='bx bx-list-ol text-2xl' ></i>
                        <Link to="/pages/contact-us" className={`${isCollapsed && 'hidden'}`}>Contact Us</Link>
                    </div>
                </div>
                <div className='flex flex-col gap-3 w-full'>
                    <span className={`${isCollapsed && 'hidden'} text-sm text-gray-500`}>User</span>
                    <div className='flex items-center gap-3'>
                        <i className='bx bx-list-ol text-2xl' ></i>
                        <Link to="/user/list" className={`${isCollapsed && 'hidden'}`}>List</Link>
                    </div>
                    <div className='flex items-center gap-3'>
                        <i className='bx bx-street-view text-2xl'></i>
                        <Link to="/user/view" className={`${isCollapsed && 'hidden'}`}>View</Link>
                    </div>
                </div>
                <div className='flex flex-col gap-3 w-full'>
                    <span className={`${isCollapsed && 'hidden'} text-sm text-gray-500`}>Roles & Permissions</span>
                    <div className='flex items-center gap-3'>
                        <i className='bx bx-check-shield text-2xl'></i>
                        <Link to="/roles-permissions/roles" className={`${isCollapsed && 'hidden'}`}>Roles</Link>
                    </div>
                    <div className='flex items-center gap-3'>
                        <i className='bx bx-lock-alt text-2xl' ></i>
                        <Link to="/roles-permissions/permissions" className={`${isCollapsed && 'hidden'}`}>Permissions</Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SideNav